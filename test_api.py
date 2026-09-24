import unittest
import os
import sys

# Ensure api directory is in path
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

from api.index import app, state, DatasetConfigReq, RetrieveReq, TrainReq, ExplainReq, BenchmarkReq

class TestFastAPIEndpoints(unittest.TestCase):
    def setUp(self):
        self.dataset_size = len(state.dataset)
        
    def test_health_endpoint(self):
        from api.index import health_check
        res = health_check()
        self.assertEqual(res["status"], "online")
        self.assertIn("device", res)
        self.assertGreaterEqual(res["dataset_size"], 10)
        
    def test_get_dataset(self):
        from api.index import get_dataset
        res = get_dataset(limit=5)
        self.assertEqual(res["count"], 5)
        self.assertIn("samples", res)
        self.assertIn("optical_base64", res["samples"][0])
        self.assertIn("sar_base64", res["samples"][0])
        
    def test_get_scene(self):
        from api.index import get_scene
        res = get_scene(0)
        self.assertEqual(res["id"], 0)
        self.assertIn("class", res)
        self.assertIn("lat", res)
        self.assertIn("lon", res)
        
    def test_retrieval_endpoint(self):
        from api.index import cross_modal_retrieval
        req = RetrieveReq(
            query_modality="optical",
            target_modality="optical",
            query_idx=0,
            use_gnn=False,
            top_k=3
        )
        res = cross_modal_retrieval(req)
        self.assertEqual(res["query_modality"], "optical")
        self.assertEqual(res["count"], 3)
        self.assertIn("latency_ms", res)
        self.assertEqual(len(res["results"]), 3)
        
    def test_pca_embeddings(self):
        from api.index import get_embeddings_pca
        res = get_embeddings_pca()
        self.assertIn("total_points", res)
        self.assertIn("points", res)
        self.assertEqual(len(res["points"]), len(state.dataset))
        self.assertIn("x", res["points"][0])
        self.assertIn("y", res["points"][0])
        self.assertIn("z", res["points"][0])
        
    def test_explain_endpoint(self):
        from api.index import explain_scene
        req = ExplainReq(scene_idx=0, encoder="clip")
        res = explain_scene(req)
        self.assertEqual(res["scene_id"], 0)
        self.assertIn("original_base64", res)
        self.assertIn("heatmap_base64", res)
        self.assertIn("blended_base64", res)

    def test_train_endpoint(self):
        from api.index import train_model
        req = TrainReq(epochs=2, lr=0.005)
        res = train_model(req)
        self.assertIn("loss_history", res)
        self.assertEqual(len(res["loss_history"]), 2)
        self.assertIn("total_trained_epochs", res)

    def test_cross_modal_text_to_sar_with_gnn(self):
        from api.index import cross_modal_retrieval
        req = RetrieveReq(
            query_modality="text",
            target_modality="sar",
            query_text="dense green forest with river",
            use_gnn=True,
            top_k=4
        )
        res = cross_modal_retrieval(req)
        self.assertEqual(res["count"], 4)
        self.assertEqual(len(res["results"]), 4)

    def test_dataset_regenerate(self):
        from api.index import regenerate_dataset
        req = DatasetConfigReq(num_samples=30, seed=123)
        res = regenerate_dataset(req)
        self.assertEqual(res["total_samples"], 30)

if __name__ == "__main__":
    unittest.main()
