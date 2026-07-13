from fastapi import APIRouter
from app.services.vector_store import vector_store

router = APIRouter()


@router.get("/health")
def health():
    index_loaded = vector_store.index is not None
    if not index_loaded:
        index_loaded = vector_store.load()
    return {
        "status": "ok",
        "index_loaded": index_loaded,
        "chunks_indexed": len(vector_store.metadata) if index_loaded else 0,
    }
