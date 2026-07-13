# GitHub README Files

This file is a placeholder. To make your chatbot aware of your actual GitHub
repos, do ONE of the following:

## Option A — Paste manually (simplest)
Replace this file's content with the README content from your key repos.
Separate each repo with a `## Repo: <name>` heading, e.g.:

## Repo: krispcall-dialer
(paste README content here)

## Repo: rental-solutions
(paste README content here)

## Option B — Auto-fetch at ingest time (recommended)
Use the `scripts/fetch_github_readmes.py` script included in this project.
It uses the GitHub API to pull README.md files from your public repos and
saves them into this folder automatically, one file per repo. Run:

    python scripts/fetch_github_readmes.py YOUR_GITHUB_USERNAME

This will create files like `github_krispcall-dialer.md` etc. in this
knowledge_base folder, which get picked up automatically by the ingest
pipeline (any .md file in this folder is indexed).
