# Suman B.K. — Portfolio + AI Chatbot

A portfolio website with an embedded RAG (Retrieval-Augmented Generation)
chatbot that can answer visitor questions about Suman's skills, experience,
and projects.

## Quick start (local development)

### 1. Backend
```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env          # add your real GEMINI_API_KEY
python scripts/ingest.py       # builds the FAISS index
uvicorn app.main:app --reload --port 8000
```

### 2. Frontend
```bash
cd frontend
npm install
cp .env.local.example .env.local   # defaults to localhost:8000, fine for dev
npm run dev
```
