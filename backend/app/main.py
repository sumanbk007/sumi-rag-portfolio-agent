from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import chat, health
from app.services.vector_store import vector_store
from app.config import ALLOWED_ORIGINS

app = FastAPI(
    title="Suman B.K. Portfolio Chatbot API",
    description="RAG-powered chatbot answering questions about Suman's skills, experience, and projects.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, tags=["health"])
app.include_router(chat.router, tags=["chat"])


@app.on_event("startup")
def startup_event():
    # Try to load the FAISS index at startup so the first request isn't slow.
    # If it doesn't exist yet, /health and /chat will report that clearly.
    vector_store.load()


@app.get("/")
def root():
    return {
        "message": "Suman B.K. Portfolio Chatbot API is running.",
        "docs": "/docs",
        "health": "/health",
    }
