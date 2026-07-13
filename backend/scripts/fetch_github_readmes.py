"""
Fetches README.md files from a GitHub user's public repos and saves them
into the knowledge base folder for indexing.

Usage:
    cd backend
    python scripts/fetch_github_readmes.py YOUR_GITHUB_USERNAME

No GitHub token required for public repos (rate-limited to 60 req/hr).
For higher limits, set GITHUB_TOKEN in your .env file.
"""

import sys
import os
import base64
import requests

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from app.config import KB_DIR

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN", "")


def get_headers():
    headers = {"Accept": "application/vnd.github.v3+json"}
    if GITHUB_TOKEN:
        headers["Authorization"] = f"token {GITHUB_TOKEN}"
    return headers


def fetch_repos(username: str):
    url = f"https://api.github.com/users/{username}/repos?per_page=100"
    resp = requests.get(url, headers=get_headers())
    resp.raise_for_status()
    return resp.json()


def fetch_readme(username: str, repo: str):
    url = f"https://api.github.com/repos/{username}/{repo}/readme"
    resp = requests.get(url, headers=get_headers())
    if resp.status_code != 200:
        return None
    data = resp.json()
    content = base64.b64decode(data["content"]).decode("utf-8", errors="ignore")
    return content


def main():
    if len(sys.argv) < 2:
        print("Usage: python scripts/fetch_github_readmes.py YOUR_GITHUB_USERNAME")
        return

    username = sys.argv[1]
    print(f"Fetching repos for {username}...")
    repos = fetch_repos(username)

    if not repos:
        print("No public repos found (or rate limited).")
        return

    saved = 0
    for repo in repos:
        if repo.get("fork"):
            continue  # skip forks
        name = repo["name"]
        print(f"  Fetching README for {name}...")
        readme = fetch_readme(username, name)
        if not readme:
            print(f"    No README found, skipping.")
            continue

        out_path = os.path.join(KB_DIR, f"github_{name}.md")
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(f"# GitHub Repo: {name}\n\n{readme}")
        saved += 1

    print(f"Saved {saved} README files to {KB_DIR}.")
    print("Now run scripts/ingest.py to rebuild the FAISS index.")


if __name__ == "__main__":
    main()
