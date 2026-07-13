"""
Run this script once (and whenever the knowledge base changes) to (re)build
the FAISS index from the markdown files in app/data/knowledge_base/.

Usage:
    cd backend
    python scripts/ingest.py
"""

import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.services.chunker import load_knowledge_base
from app.services.gemini_client import get_embeddings_batch
from app.services.vector_store import vector_store


def main():
    print("Loading and chunking knowledge base...")
    chunks = load_knowledge_base()

    if not chunks:
        print("No chunks found. Make sure app/data/knowledge_base/ has .md files.")
        return

    print(f"Loaded {len(chunks)} chunks. Generating embeddings...")
    texts = [c["text"] for c in chunks]

    # Gemini's embed_content batch limit is smaller than OpenAI's --
    # 100 texts per call is a safe ceiling, but for a resume-sized
    # knowledge base this loop usually only runs once anyway.
    batch_size = 100
    all_embeddings = []
    for i in range(0, len(texts), batch_size):
        batch = texts[i : i + batch_size]
        embeddings = get_embeddings_batch(batch)
        all_embeddings.extend(embeddings)
        print(f"  Embedded {min(i + batch_size, len(texts))}/{len(texts)}")

    print("Building FAISS index...")
    vector_store.build(all_embeddings, chunks)
    vector_store.save()

    print(f"Done. Index saved with {len(chunks)} chunks.")


if __name__ == "__main__":
    main()
