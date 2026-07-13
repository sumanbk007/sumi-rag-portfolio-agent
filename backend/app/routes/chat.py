from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from app.schemas import ChatRequest, ChatResponse, Source
from app.services.vector_store import vector_store
from app.services.gemini_client import get_embedding, generate_answer, generate_answer_stream
from app.config import TOP_K

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    if vector_store.index is None:
        loaded = vector_store.load()
        if not loaded:
            raise HTTPException(
                status_code=503,
                detail="Knowledge base index not built yet. Run scripts/ingest.py first.",
            )

    query_embedding = get_embedding(request.message)
    results = vector_store.search(query_embedding, top_k=TOP_K)

    if not results:
        return ChatResponse(
            answer="I don't have information about that yet. Try asking about Suman's skills, experience, or projects.",
            sources=[],
        )

    context_chunks = [r[0]["text"] for r in results]
    answer = generate_answer(request.message, context_chunks)

    sources = [Source(source=r[0]["source"], score=round(r[1], 3)) for r in results]
    return ChatResponse(answer=answer, sources=sources)


@router.post("/chat/stream")
def chat_stream(request: ChatRequest):
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    if vector_store.index is None:
        loaded = vector_store.load()
        if not loaded:
            raise HTTPException(
                status_code=503,
                detail="Knowledge base index not built yet. Run scripts/ingest.py first.",
            )

    query_embedding = get_embedding(request.message)
    results = vector_store.search(query_embedding, top_k=TOP_K)
    context_chunks = [r[0]["text"] for r in results] if results else []

    def event_generator():
        for token in generate_answer_stream(request.message, context_chunks):
            yield token

    return StreamingResponse(event_generator(), media_type="text/plain")
