import os
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "models/text-embedding-004")
CHAT_MODEL = os.getenv("CHAT_MODEL", "gemini-2.5-flash")
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS", "http://localhost:3000","https://sumi-rag-portfolio-agents.vercel.app","https://www.sumanbk.com.np"
).split(",")
INDEX_DIR = os.getenv("INDEX_DIR", "./app/data/index")
KB_DIR = os.getenv("KB_DIR", "./app/data/knowledge_base")

# Chunking
CHUNK_SIZE = 500       # tokens (approx, by words here for simplicity)
CHUNK_OVERLAP = 80
TOP_K = 4               # number of chunks retrieved per query
