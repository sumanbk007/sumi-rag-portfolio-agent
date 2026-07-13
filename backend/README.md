# Portfolio Chatbot — Backend (FastAPI + FAISS + Gemini)

A RAG (Retrieval-Augmented Generation) API that answers questions about
Suman B.K.'s skills, experience, and projects using a FAISS vector index
built from a markdown knowledge base.

## Stack
- **FastAPI** — API server
- **FAISS** — vector similarity search (in-memory, persisted to disk)
- **Google Gemini** — embeddings (`text-embedding-004`) + chat (`gemini-2.5-flash`)

## Project structure
```
backend/
├── app/
│   ├── main.py              # FastAPI app entrypoint
│   ├── config.py             # env-driven settings
│   ├── schemas.py             # request/response models
│   ├── routes/
│   │   ├── chat.py            # POST /chat, POST /chat/stream
│   │   └── health.py          # GET /health
│   ├── services/
│   │   ├── chunker.py          # markdown chunking
│   │   ├── gemini_client.py     # embeddings + chat completion (Gemini)
│   │   └── vector_store.py      # FAISS wrapper
│   └── data/
│       ├── knowledge_base/       # EDIT THESE — your resume/projects/etc as .md
│       └── index/                 # generated FAISS index (gitignored)
├── scripts/
│   ├── ingest.py                  # builds the FAISS index from knowledge_base/
│   └── fetch_github_readmes.py     # pulls READMEs from your GitHub repos
├── requirements.txt
├── render.yaml                       # Render deploy config
└── .env.example
```

## 1. Get a Gemini API key

Go to [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
and generate a free API key. Gemini 2.5 Flash and `text-embedding-004` both
have generous free tiers, good enough for a portfolio chatbot.

## 2. Local setup

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# then edit .env and paste your real GEMINI_API_KEY
```

## 3. Add your knowledge base

Files already included (edit freely):
- `app/data/knowledge_base/profile.md`
- `app/data/knowledge_base/skills.md`
- `app/data/knowledge_base/experience.md`
- `app/data/knowledge_base/projects.md`
- `app/data/knowledge_base/github_readmes.md` (placeholder)

To pull your real GitHub README files automatically:
```bash
python scripts/fetch_github_readmes.py YOUR_GITHUB_USERNAME
```
This saves one `.md` file per repo into the same folder.

## 4. Build the FAISS index

Every time you change the knowledge base, rebuild the index:
```bash
python scripts/ingest.py
```
This embeds all chunks via Gemini and saves `app/data/index/faiss.index` +
`metadata.json` to disk.

## 5. Run the server locally

```bash
uvicorn app.main:app --reload --port 8000
```

Visit `http://localhost:8000/docs` for interactive Swagger docs.

Test it:
```bash
curl -X POST http://localhost:8000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What frontend frameworks does Suman know?"}'
```

## 6. Deploy to Render

1. Push this `backend/` folder to a GitHub repo.
2. On [render.com](https://render.com), create a **New Web Service** from that repo.
3. Render will detect `render.yaml` automatically. Or set manually:
   - **Build command:** `pip install -r requirements.txt && python scripts/ingest.py`
   - **Start command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Add environment variables in the Render dashboard:
   - `GEMINI_API_KEY` — your real key
   - `ALLOWED_ORIGINS` — your Vercel frontend URL, e.g. `https://your-portfolio.vercel.app`
5. Deploy. The build step runs `ingest.py`, so the FAISS index is rebuilt
   fresh on every deploy (no persistent disk needed on the free plan).

   > Note: Render's free tier filesystem is ephemeral between deploys, which
   > is why the index is rebuilt at *build time* rather than relying on a
   > previously-saved index file. If you upgrade to a paid plan with a
   > persistent disk, you can skip rebuilding on every deploy and just run
   > `ingest.py` manually when the knowledge base changes.

## Why Gemini's `task_type` matters

Gemini's embedding API takes a `task_type` parameter that tunes the vector
for its role in the search:
- Knowledge-base chunks are embedded with `task_type="retrieval_document"` at ingest time.
- User questions are embedded with `task_type="retrieval_query"` at query time.

This is handled automatically in `gemini_client.py` — `get_embeddings_batch()`
defaults to `retrieval_document`, `get_embedding()` defaults to `retrieval_query`.
You don't need to touch this unless you're customizing the pipeline.

## API Reference

### `GET /health`
Returns index status.

### `POST /chat`
```json
{ "message": "What's Suman's experience with Next.js?" }
```
Response:
```json
{
  "answer": "Suman has used Next.js as part of his core frontend stack...",
  "sources": [{ "source": "skills.md", "score": 0.83 }]
}
```

### `POST /chat/stream`
Same input, streams the answer as plain text chunks (for a typing effect on the frontend).
