"""Simple word-based chunker with overlap. Good enough for a small,
well-structured knowledge base like a resume/projects corpus."""

from typing import List, Dict
import os
import glob
from app.config import CHUNK_SIZE, CHUNK_OVERLAP, KB_DIR


def chunk_text(text: str, source: str, chunk_size: int = CHUNK_SIZE, overlap: int = CHUNK_OVERLAP) -> List[Dict]:
    words = text.split()
    if not words:
        return []

    chunks = []
    start = 0
    while start < len(words):
        end = min(start + chunk_size, len(words))
        chunk_words = words[start:end]
        chunk_str = " ".join(chunk_words)
        chunks.append({"text": chunk_str, "source": source})
        if end == len(words):
            break
        start = end - overlap  # overlap for context continuity
    return chunks


def load_knowledge_base(kb_dir: str = KB_DIR) -> List[Dict]:
    """Reads every .md file in the knowledge base dir and chunks it."""
    all_chunks = []
    md_files = sorted(glob.glob(os.path.join(kb_dir, "*.md")))

    for filepath in md_files:
        filename = os.path.basename(filepath)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()

        # Split on markdown ## headings to keep related content together
        # before chunking further if a section is too long.
        sections = content.split("\n## ")
        for i, section in enumerate(sections):
            if i > 0:
                section = "## " + section  # restore heading marker
            section = section.strip()
            if not section:
                continue
            section_chunks = chunk_text(section, source=filename)
            all_chunks.extend(section_chunks)

    return all_chunks
