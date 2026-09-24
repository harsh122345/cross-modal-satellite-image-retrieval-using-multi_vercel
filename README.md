# 🛰️ Cross-Modal Satellite Image Retrieval Using Multi-Sensor Remote Sensing Data

High-performance **FastAPI backend** and **Interactive Web Dashboard** for Cross-Modal Remote Sensing Satellite Image Retrieval, optimized for **Vercel Serverless Deployment** and local execution.

The system aligns three distinct sensor and description modalities:
1. **Optical Bands (Passive Reflected Solar Energy)**: RGB color imagery capturing visual boundaries, crop signatures, and building structures.
2. **Synthetic Aperture Radar (SAR) (Active Microwave Backscatter)**: Specular reflections off calm water, double-bounce reflections off vertical structures, and volume scattering from vegetation (with Gamma speckle noise modeling).
3. **Natural Language Text Descriptions**: Multi-lingual captions characterizing landscape cover, water bodies, and road networks.

---

## 🚀 Key Features

* **⚡ FastAPI Backend**: Asynchronous REST API exposing modular endpoints for dataset inspection, cross-modal retrieval, model fine-tuning, Grad-CAM attention maps, and FAISS indexing.
* **🌐 Modern Web Dashboard**: Single-page application with glassmorphism dark theme, interactive **Leaflet GIS maps**, **Plotly 3D PCA** latent projections, and real-time retrieval matching.
* **🌍 8-Language Localization**: Full UI support for English, Español, Français, 日本語 (Japanese), Русский (Russian), Deutsch (German), 中文 (Chinese), and हिन्दी (Hindi).
* **🧠 Advanced Deep Learning Models**:
  * **CLIP Visual & Text Transformer** (`openai/clip-vit-base-patch32`) with robust lightweight CNN fallbacks.
  * **DINOv2 Self-Supervised Vision Transformer** (`facebook/dinov2-small`).
  * **Multi-Modal Transformer Aligner** (cross-attention over Optical, SAR, and Text).
  * **Spatial Graph Convolutional Network (GCN)** for neighborhood context refinement.
* **🔍 Real-Time FAISS Retrieval**: Sub-millisecond vector indexing with cosine / L2 distance and dynamic latency benchmarking.
* **👁️ Grad-CAM Explainability**: Interactive saliency activation maps highlighting discriminative features.
* **☁️ Vercel & Docker Ready**: Complete `vercel.json` configuration for one-click serverless deployment, plus multi-stage `Dockerfile`.

---

## 🛠️ Local Quickstart

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Run with FastAPI & Modern Web UI (Recommended)
```bash
python main.py
```
Open **[http://localhost:8000](http://localhost:8000)** in your browser.
Open **[http://localhost:8000/docs](http://localhost:8000/docs)** for interactive OpenAPI / Swagger API documentation.

### 3. Run with Streamlit (Legacy Option)
```bash
streamlit run app.py
```

---

## ⚡ Deploying to Vercel

The project includes a ready-to-use `vercel.json` configuration for Vercel's Python Serverless Runtime:

### Option A: Using Vercel CLI
```bash
npm install -g vercel
vercel
vercel --prod
```

### Option B: Deploying via GitHub Git Integration
1. Push this repository to GitHub.
2. Import the repository into your [Vercel Dashboard](https://vercel.com).
3. Vercel will automatically detect `vercel.json` and deploy both the FastAPI serverless functions under `/api` and the static web UI under `/`.

---

### Option C:You Can view the project
The Deloyed Project Link in Vercel as **[Deployed Project](https://cross-modal-satellite-image-retriev.vercel.app/)**
## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Check backend health status and loaded model backbones |
| `GET` | `/api/dataset` | Retrieve generated scenes, coordinates, and base64 previews |
| `POST` | `/api/dataset/regenerate` | Regenerate synthetic dataset with custom seed/size |
| `GET` | `/api/dataset/{scene_id}` | Inspect a single scene patch with Optical & SAR imagery |
| `POST` | `/api/retrieve` | Execute cross-modal retrieval (Optical $\leftrightarrow$ SAR $\leftrightarrow$ Text) with FAISS & GNN |
| `POST` | `/api/train` | Train the MultiModalTransformer and GCNRefiner on active dataset |
| `POST` | `/api/explain` | Generate Grad-CAM attention heatmap for a target scene |
| `GET` | `/api/embeddings/pca` | Get 3D PCA coordinates for interactive scatter plots |
| `POST` | `/api/benchmark` | Compare FAISS index latency against brute-force NumPy |

---

## 🐋 Run with Docker

```bash
docker build -t satellite-retrieval:latest .
docker run -p 8000:8000 satellite-retrieval:latest
```
