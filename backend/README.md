---
title: VERA Backend
emoji: 🏦
colorFrom: indigo
colorTo: blue
sdk: docker
pinned: false
app_port: 7860
---

# VERA Fintech Backend

FastAPI backend with 5 endpoints + optional Gemma AI enhancement.

## For Hugging Face Spaces (One Space)

Copy these files AND `../frontend-dist/index.html` into your Space repo:

```
your-space/
├── Dockerfile
├── main.py
├── models.py
├── vera_engine.py
├── gemma_client.py
├── requirements.txt
├── index.html        <-- copy from frontend-dist/
└── README.md
```

Then set env var `HF_TOKEN` in Space Settings → Repository Secrets.

## For Hugging Face Spaces (Two Spaces - recommended)

1. **Static Space**: Upload `frontend-dist/index.html`
2. **Docker Space**: Upload everything in `backend/` + set `HF_TOKEN`

Frontend Space calls Backend Space URL via the `/api/*` endpoints.

## Local Dev

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Open http://localhost:8000

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `HF_TOKEN` | No | - | Hugging Face API token for Gemma |
| `GEMMA_MODEL` | No | `google/gemma-2-2b-it` | HF model ID for inference |

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| POST | `/api/loan-decision` | Loan approval rules |
| POST | `/api/kyc-verify` | KYC identity check |
| POST | `/api/fraud-check` | Fraud detection |
| POST | `/api/sar-analysis` | AML suspicious activity report |
| POST | `/api/loan-structuring` | Loan optimization |
