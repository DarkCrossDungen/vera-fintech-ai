# VERA Fintech Demo (Gemma 4 Hackathon)

An innovative, demonstrably intelligent, and confidence-aware Fintech backend powered by a **Formal Rule-Based Verification Engine** and **Google Gemma 4**.

## 🚀 The Architecture
This project solves the "black box" problem of AI in finance. Instead of letting an LLM make critical financial decisions (which can lead to hallucinations or regulatory fines), we use a **two-layered architecture**:

1. **VERA Formal Rule Engine (The Decider):** A mathematically rigorous, deterministic Python engine that evaluates financial requests against strict compliance rules (RBI guidelines, KYC checks, etc.). It outputs a hard decision (`APPROVED`, `REJECTED`, `FLAGGED`) and a confidence score.
2. **Gemma 4 via Ollama (The Explainer):** We offload the natural language tasks to Google's open-weights Gemma 4 model running locally. Gemma takes the deterministic output from VERA and translates it into a human-readable, professional explanation for bank officers or customers.

**Key Benefit:** 100% mathematically auditable decisions + 100% data sovereignty (no API keys, runs locally at the edge).

## 🛠️ Features Implemented
The backend exposes 5 core compliance-driven REST APIs:
1. `/loan-decision`: Loan Approval Verification
2. `/kyc-verify`: KYC & Identity Verification
3. `/fraud-check`: Real-time Fraud Detection
4. `/sar-analysis`: Suspicious Activity Reporting (AML)
5. `/loan-structuring`: Dynamic Loan Structuring

## ⚙️ Setup & Installation

### 1. Start the AI Model (Gemma 4)
Install [Ollama](https://ollama.com/) and download the model:
```bash
ollama pull gemma4
ollama run gemma4
```

### 2. Setup the Backend
Navigate to the backend directory and install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

### 3. Run the Server
```bash
python main.py
```
The server will start on `http://127.0.0.1:8000`. You can view the interactive API documentation at `http://127.0.0.1:8000/docs`.
