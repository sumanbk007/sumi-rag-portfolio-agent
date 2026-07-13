import os
import json
import faiss
import numpy as np
from typing import List, Dict, Tuple
from app.config import INDEX_DIR

INDEX_PATH = os.path.join(INDEX_DIR, "faiss.index")
META_PATH = os.path.join(INDEX_DIR, "metadata.json")


class VectorStore:
    def __init__(self):
        self.index = None
        self.metadata: List[Dict] = []  # parallel list: chunk text + source

    def build(self, embeddings: List[List[float]], metadata: List[Dict]):
        """Builds a fresh FAISS index from embeddings + matching metadata."""
        dim = len(embeddings[0])
        vectors = np.array(embeddings).astype("float32")
        faiss.normalize_L2(vectors)  # so inner product == cosine similarity

        index = faiss.IndexFlatIP(dim)
        index.add(vectors)

        self.index = index
        self.metadata = metadata

    def save(self):
        os.makedirs(INDEX_DIR, exist_ok=True)
        faiss.write_index(self.index, INDEX_PATH)
        with open(META_PATH, "w", encoding="utf-8") as f:
            json.dump(self.metadata, f, ensure_ascii=False, indent=2)

    def load(self) -> bool:
        if not (os.path.exists(INDEX_PATH) and os.path.exists(META_PATH)):
            return False
        self.index = faiss.read_index(INDEX_PATH)
        with open(META_PATH, "r", encoding="utf-8") as f:
            self.metadata = json.load(f)
        return True

    def search(self, query_embedding: List[float], top_k: int = 4) -> List[Tuple[Dict, float]]:
        if self.index is None:
            raise RuntimeError("Vector store index not loaded. Run ingest first.")

        vector = np.array([query_embedding]).astype("float32")
        faiss.normalize_L2(vector)

        scores, indices = self.index.search(vector, top_k)
        results = []
        for score, idx in zip(scores[0], indices[0]):
            if idx == -1:
                continue
            results.append((self.metadata[idx], float(score)))
        return results


# Singleton instance used across the app
vector_store = VectorStore()
