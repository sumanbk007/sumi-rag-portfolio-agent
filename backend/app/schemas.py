from pydantic import BaseModel
from typing import List, Optional


class ChatRequest(BaseModel):
    message: str
    history: Optional[List[dict]] = None  # [{"role": "user"|"assistant", "content": "..."}]


class Source(BaseModel):
    source: str
    score: float


class ChatResponse(BaseModel):
    answer: str
    sources: List[Source]
