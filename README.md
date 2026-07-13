# Suman B.K. — Portfolio + AI Chatbot

A portfolio website with an embedded RAG (Retrieval-Augmented Generation)
chatbot that can answer visitor questions about Suman's skills, experience,
and projects.

## Architecture

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────┐
│   Next.js        │  HTTP   │   FastAPI          │  API    │  Gemini       │
│   (Vercel)        │ ──────▶ │   (Render)          │ ──────▶ │  embeddings   │
│                    │         │                      │         │  + chat       │
│  - Portfolio UI    │         │  - /chat             │         └─────────────┘
│  - ChatWidget       │         │  - FAISS retrieval     │
└─────────────────┘         │  - knowledge base       │
                              └──────────────────┘
                                       │
                                       ▼
                              ┌──────────────────┐
                              │  FAISS index        │
                              │  (built from         │
                              │  resume/projects/      │
                              │  skills/GitHub          │
                              │  READMEs)               │
                              └──────────────────┘
```

## Folder structure

```
portfolio-rag/
├── frontend/          # Next.js portfolio + chat widget → deploy to Vercel
└── backend/           # FastAPI + FAISS + Gemini RAG API → deploy to Render
```

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

Visit `http://localhost:3000` — the chat bubble in the bottom-right corner
talks to your local FastAPI backend.

## Deploying

### Backend → Render
1. Push `backend/` to its own GitHub repo (or a subfolder of a monorepo with
   Render's root directory setting pointed at `backend/`).
2. Create a new Web Service on Render, connect the repo.
3. Render reads `render.yaml` automatically, or set manually:
   - Build: `pip install -r requirements.txt && python scripts/ingest.py`
   - Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Set environment variables on Render: `GEMINI_API_KEY`, `ALLOWED_ORIGINS`
   (your Vercel URL).
5. Deploy — note your backend URL, e.g. `https://suman-portfolio-backend.onrender.com`.

### Frontend → Vercel
1. Push `frontend/` to a GitHub repo.
2. Import it on [vercel.com](https://vercel.com).
3. Add environment variable: `NEXT_PUBLIC_API_URL` = your Render backend URL.
4. Deploy.

### Final step — update CORS
Go back to Render and set `ALLOWED_ORIGINS` to your live Vercel URL, then
redeploy the backend so it accepts requests from your live frontend.

## Updating the knowledge base later

Edit any `.md` file in `backend/app/data/knowledge_base/`, then either:
- Re-run `python scripts/ingest.py` locally and redeploy, or
- Just push to GitHub — Render's build command re-runs `ingest.py` on every deploy automatically.

To pull in your GitHub project READMEs automatically:
```bash
cd backend
python scripts/fetch_github_readmes.py YOUR_GITHUB_USERNAME
python scripts/ingest.py
```

See `backend/README.md` for full API documentation and more detail.
