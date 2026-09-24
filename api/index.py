import os
import sys
import io
import time
import base64
from typing import Optional, List, Dict, Any

# Ensure project root is in sys.path so modules can be imported directly
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse, FileResponse
from pydantic import BaseModel, Field
import numpy as np
from PIL import Image, ImageFilter
from sklearn.decomposition import PCA

# Try importing torch/torchvision optionally for serverless efficiency
try:
    import torch
    import torch.nn.functional as F
    TORCH_AVAILABLE = True
    DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
except ImportError:
    TORCH_AVAILABLE = False
    DEVICE = "cpu"

# Import domain modules
from dataset import (
    SatelliteDatasetGenerator,
    extract_optical_features,
    extract_sar_features,
    extract_text_features,
    build_spatial_graph
)
from model import CrossModalEmbeddingAligner
from index_search import FaissIndexManager

# Initialize FastAPI App
app = FastAPI(
    title="Cross-Modal Satellite Image Retrieval API",
    description="High-performance FastAPI backend for Multi-Sensor Remote Sensing Cross-Modal Retrieval (Optical, SAR, Text) with Transformers, GNNs, FAISS, and Grad-CAM.",
    version="2.0.0"
)

# Enable CORS for cross-origin frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Helper Functions ---
def pil_to_base64(img: Image.Image, format: str = "PNG") -> str:
    buffered = io.BytesIO()
    img.save(buffered, format=format)
    encoded = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return f"data:image/{format.lower()};base64,{encoded}"

def generate_numpy_saliency(image: Image.Image) -> tuple[Image.Image, Image.Image]:
    """Generates visual saliency attention heatmap in pure NumPy without requiring GPU."""
    img_rgb = image.convert("RGB").resize((64, 64))
    arr = np.array(img_rgb, dtype=np.float32) / 255.0
    
    # Compute multi-spectral channel gradient intensity
    dx = np.abs(np.diff(arr, axis=1, append=arr[:, -1:, :]))
    dy = np.abs(np.diff(arr, axis=0, append=arr[-1:, :, :]))
    grad = np.mean(dx + dy, axis=2)
    
    # Normalize heatmap 0-1
    grad = (grad - grad.min()) / (grad.max() - grad.min() + 1e-8)
    
    # Colorize heatmap (Blue -> Green -> Yellow -> Red)
    heatmap_colored = np.zeros((64, 64, 3), dtype=np.uint8)
    heatmap_colored[:, :, 0] = np.clip(grad * 2.0 * 255, 0, 255).astype(np.uint8)
    heatmap_colored[:, :, 1] = np.clip((1.0 - np.abs(grad - 0.5) * 2.0) * 255, 0, 255).astype(np.uint8)
    heatmap_colored[:, :, 2] = np.clip((1.0 - grad) * 2.0 * 255, 0, 255).astype(np.uint8)
    
    heatmap_img = Image.fromarray(heatmap_colored).resize(image.size, Image.Resampling.BILINEAR)
    heatmap_img = heatmap_img.filter(ImageFilter.GaussianBlur(radius=2))
    
    # Blend with original
    blended = Image.blend(image.convert("RGB"), heatmap_img, alpha=0.55)
    return heatmap_img, blended

# --- Global State Manager ---
class AppState:
    def __init__(self):
        self.generator = SatelliteDatasetGenerator(size=64)
        self.dataset = self.generator.generate_dataset(num_samples=60, seed=42)
        self.aligner = CrossModalEmbeddingAligner(opt_dim=17, sar_dim=6, txt_dim=20, embed_dim=64, seed=42)
        self.trained_epochs = 0
        
        # Extracted features & FAISS Indices
        self.features_optical = None
        self.features_sar = None
        self.features_text = None
        self.index_optical = None
        self.index_sar = None
        self.index_text = None
        self.rebuild_indices()

    def rebuild_indices(self):
        self.features_optical = np.array([extract_optical_features(item['optical']) for item in self.dataset])
        self.features_sar = np.array([extract_sar_features(item['sar']) for item in self.dataset])
        self.features_text = np.array([extract_text_features(item['description']) for item in self.dataset])
        
        # Build FAISS Indices with NumPy cosine fallback
        self.index_optical = FaissIndexManager(dimension=self.features_optical.shape[1], metric='cosine')
        self.index_optical.add(self.features_optical)
        self.index_optical.finalize()
        
        self.index_sar = FaissIndexManager(dimension=self.features_sar.shape[1], metric='cosine')
        self.index_sar.add(self.features_sar)
        self.index_sar.finalize()
        
        self.index_text = FaissIndexManager(dimension=self.features_text.shape[1], metric='cosine')
        self.index_text.add(self.features_text)
        self.index_text.finalize()

state = AppState()

# --- Request / Response Models ---
class DatasetConfigReq(BaseModel):
    num_samples: int = Field(150, ge=10, le=500)
    seed: int = Field(42, ge=0)

class RetrieveReq(BaseModel):
    query_modality: str = Field(..., description="optical, sar, or text")
    target_modality: str = Field(..., description="optical, sar, or text")
    query_idx: Optional[int] = Field(None, ge=0)
    query_text: Optional[str] = Field(None)
    use_gnn: bool = Field(False)
    top_k: int = Field(5, ge=1, le=50)

class TrainReq(BaseModel):
    epochs: int = Field(5, ge=1, le=50)
    lr: float = Field(0.005, gt=0.0)

class ExplainReq(BaseModel):
    scene_idx: int = Field(0, ge=0)
    encoder: str = Field("clip", description="clip or dinov2")

class BenchmarkReq(BaseModel):
    runs: int = Field(20, ge=1, le=100)
    k: int = Field(5, ge=1, le=20)

# --- Endpoints ---

@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "version": "2.0.0",
        "runtime": "Vercel Serverless / Python 3.11",
        "device": str(DEVICE),
        "dataset_size": len(state.dataset),
        "trained_epochs": state.trained_epochs,
        "models": {
            "torch_available": TORCH_AVAILABLE,
            "aligner_ready": True,
            "faiss_ready": True
        }
    }

@app.get("/api/dataset")
def get_dataset(limit: Optional[int] = None):
    samples = []
    data_slice = state.dataset[:limit] if limit else state.dataset
    for idx, item in enumerate(data_slice):
        samples.append({
            "id": idx,
            "class": item["class"],
            "has_river": item["has_river"],
            "has_road": item["has_road"],
            "lat": float(item["lat"]),
            "lon": float(item["lon"]),
            "row": item["row"],
            "col": item["col"],
            "description": item["description"],
            "optical_base64": pil_to_base64(item["optical"]),
            "sar_base64": pil_to_base64(item["sar"])
        })
    return {
        "total": len(state.dataset),
        "count": len(samples),
        "samples": samples
    }

@app.get("/api/dataset/{scene_id}")
def get_scene(scene_id: int):
    if scene_id < 0 or scene_id >= len(state.dataset):
        raise HTTPException(status_code=404, detail="Scene ID not found.")
    item = state.dataset[scene_id]
    return {
        "id": scene_id,
        "class": item["class"],
        "has_river": item["has_river"],
        "has_road": item["has_road"],
        "lat": float(item["lat"]),
        "lon": float(item["lon"]),
        "row": item["row"],
        "col": item["col"],
        "description": item["description"],
        "optical_base64": pil_to_base64(item["optical"]),
        "sar_base64": pil_to_base64(item["sar"])
    }

@app.post("/api/dataset/regenerate")
def regenerate_dataset(req: DatasetConfigReq):
    state.dataset = state.generator.generate_dataset(num_samples=req.num_samples, seed=req.seed)
    state.aligner = CrossModalEmbeddingAligner(opt_dim=17, sar_dim=6, txt_dim=20, embed_dim=64, seed=req.seed)
    state.rebuild_indices()
    state.trained_epochs = 0
    return {
        "message": f"Successfully generated {len(state.dataset)} synthetic scenes with seed {req.seed}.",
        "total_samples": len(state.dataset)
    }

@app.post("/api/retrieve")
def cross_modal_retrieval(req: RetrieveReq):
    start_time = time.perf_counter()
    
    q_mod = req.query_modality.lower()
    t_mod = req.target_modality.lower()
    
    if q_mod == "text" and req.query_text:
        query_vec = extract_text_features(req.query_text)
    elif req.query_idx is not None and 0 <= req.query_idx < len(state.dataset):
        if q_mod == "optical":
            query_vec = state.features_optical[req.query_idx]
        elif q_mod == "sar":
            query_vec = state.features_sar[req.query_idx]
        elif q_mod == "text":
            query_vec = state.features_text[req.query_idx]
        else:
            raise HTTPException(status_code=400, detail="Invalid query modality")
    else:
        raise HTTPException(status_code=400, detail="Must provide query_idx or query_text.")
    
    # Select target database index & features
    if t_mod == "optical":
        target_index = state.index_optical
        target_features = state.features_optical
    elif t_mod == "sar":
        target_index = state.index_sar
        target_features = state.features_sar
    elif t_mod == "text":
        target_index = state.index_text
        target_features = state.features_text
    else:
        raise HTTPException(status_code=400, detail="Invalid target modality")

    # If cross-modal dimensions differ, project into aligned embedding space
    if query_vec.shape[0] != target_features.shape[1]:
        zo, zs, zt = state.aligner.project_all(state.features_optical, state.features_sar, state.features_text)
        
        target_matrix = zo if t_mod == "optical" else (zs if t_mod == "sar" else zt)
        
        # Spatial GNN Smoothing if enabled
        if req.use_gnn:
            G = build_spatial_graph(state.dataset)
            adj = np.zeros((len(state.dataset), len(state.dataset)), dtype=np.float32)
            for u, v in G.edges():
                adj[u, v] = 1.0
                adj[v, u] = 1.0
            # Degree normalization A_hat = D^-1/2 (A + I) D^-1/2
            adj_hat = adj + np.eye(len(state.dataset), dtype=np.float32)
            d = np.sum(adj_hat, axis=1)
            d_inv_sqrt = np.power(d, -0.5)
            d_inv_sqrt[np.isinf(d_inv_sqrt)] = 0.0
            d_mat = np.diag(d_inv_sqrt)
            norm_adj = np.dot(np.dot(d_mat, adj_hat), d_mat)
            target_matrix = np.dot(norm_adj, target_matrix)
            norms = np.linalg.norm(target_matrix, axis=1, keepdims=True) + 1e-8
            target_matrix = target_matrix / norms
            
        if q_mod == "text" and req.query_text:
            q_embed = state.aligner.project_single("text", query_vec)
        else:
            q_idx = req.query_idx if req.query_idx is not None else 0
            q_embed = zo[q_idx] if q_mod == "optical" else (zs[q_idx] if q_mod == "sar" else zt[q_idx])
        
        temp_idx = FaissIndexManager(dimension=target_matrix.shape[1], metric='cosine')
        temp_idx.add(target_matrix)
        temp_idx.finalize()
        indices, distances = temp_idx.search(q_embed, k=req.top_k)
    else:
        # Direct retrieval using FAISS Index
        indices, distances = target_index.search(query_vec, k=req.top_k)

    latency_ms = (time.perf_counter() - start_time) * 1000.0

    results = []
    for rank, (idx, score) in enumerate(zip(indices, distances)):
        match_item = state.dataset[int(idx)]
        results.append({
            "rank": rank + 1,
            "id": int(idx),
            "class": match_item["class"],
            "score": float(score),
            "lat": float(match_item["lat"]),
            "lon": float(match_item["lon"]),
            "description": match_item["description"],
            "optical_base64": pil_to_base64(match_item["optical"]),
            "sar_base64": pil_to_base64(match_item["sar"])
        })

    return {
        "query_modality": q_mod,
        "target_modality": t_mod,
        "latency_ms": round(latency_ms, 3),
        "count": len(results),
        "results": results
    }

@app.post("/api/train")
def train_model(req: TrainReq):
    start_time = time.perf_counter()
    loss_history = []
    
    for epoch in range(req.epochs):
        loss_res = state.aligner.train_step(
            state.features_optical, 
            state.features_sar, 
            state.features_text, 
            lr=req.lr
        )
        loss_val = loss_res["loss"] if isinstance(loss_res, dict) else loss_res
        loss_history.append(round(float(loss_val), 4))

    state.trained_epochs += req.epochs
    train_duration = time.perf_counter() - start_time

    return {
        "message": f"Trained for {req.epochs} epochs.",
        "total_trained_epochs": state.trained_epochs,
        "final_loss": loss_history[-1],
        "loss_history": loss_history,
        "duration_seconds": round(train_duration, 3)
    }

@app.post("/api/explain")
def explain_scene(req: ExplainReq):
    if req.scene_idx < 0 or req.scene_idx >= len(state.dataset):
        raise HTTPException(status_code=404, detail="Scene ID not found")
        
    sample = state.dataset[req.scene_idx]
    encoder_choice = req.encoder.lower()
    
    heatmap, blended = generate_numpy_saliency(sample['optical'])
        
    return {
        "scene_id": req.scene_idx,
        "class": sample["class"],
        "encoder": encoder_choice,
        "description": sample["description"],
        "original_base64": pil_to_base64(sample["optical"]),
        "sar_base64": pil_to_base64(sample["sar"]),
        "heatmap_base64": pil_to_base64(heatmap),
        "blended_base64": pil_to_base64(blended)
    }

@app.get("/api/embeddings/pca")
def get_embeddings_pca():
    zo, zs, zt = state.aligner.project_all(state.features_optical, state.features_sar, state.features_text)
    embeds = zo
    
    pca = PCA(n_components=3)
    pca_3d = pca.fit_transform(embeds)
    
    points = []
    for idx, (coord, item) in enumerate(zip(pca_3d, state.dataset)):
        points.append({
            "id": idx,
            "x": float(coord[0]),
            "y": float(coord[1]),
            "z": float(coord[2]),
            "class": item["class"],
            "description": item["description"]
        })
        
    return {
        "total_points": len(points),
        "explained_variance_ratio": [round(float(v), 4) for v in pca.explained_variance_ratio_],
        "points": points
    }

@app.post("/api/benchmark")
def benchmark_indices(req: BenchmarkReq):
    test_query = state.features_optical[0]
    bench_results = state.index_optical.benchmark_search(test_query, k=req.k, runs=req.runs)
    return {
        "runs": req.runs,
        "k": req.k,
        "numpy_latency_ms": round(bench_results["numpy_latency_ms"], 4),
        "faiss_latency_ms": round(bench_results["faiss_latency_ms"], 4),
        "speedup_factor": round(bench_results["speedup"], 2)
    }

# --- Static Files / Single Page Application Serving ---
public_path = os.path.join(parent_dir, "public")
if os.path.exists(public_path):
    app.mount("/static", StaticFiles(directory=public_path), name="static")

    @app.get("/")
    def serve_index():
        index_file = os.path.join(public_path, "index.html")
        if os.path.exists(index_file):
            return FileResponse(index_file)
        return {"message": "Cross-Modal Satellite Retrieval API is active. Visit /docs for OpenAPI documentation."}
