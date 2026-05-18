import os
import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from models import (
    LoanDecisionRequest, LoanDecisionResponse,
    KYCRequest, KYCResponse,
    FraudCheckRequest, FraudCheckResponse,
    SARRequest, SARResponse,
    LoanStructuringRequest, LoanStructuringResponse,
)
from vera_engine import VERAEngine
from gemma_client import (
    explain_loan,
    explain_kyc,
    explain_fraud,
    explain_sar,
    advise_loan_structure,
    generate_audit_entry,
)

app = FastAPI(title="VERA Fintech Platform", version="3.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

HF_TOKEN = os.getenv("HF_TOKEN", "")


@app.get("/health")
async def health():
    return {
        "status": "ok",
        "version": "3.0.0",
        "pipeline": "Rules Engine → Gemma Intelligence Layer",
        "gemma_online": bool(HF_TOKEN),
        "gemma_model": os.getenv("GEMMA_MODEL", "google/gemma-4-E2B-it"),
    }


@app.post("/api/loan-decision", response_model=LoanDecisionResponse)
async def loan_decision(req: LoanDecisionRequest):
    passed, rules, emi = VERAEngine.check_loan(
        req.loan_amount, req.monthly_income, req.cibil_score, req.has_defaults
    )
    decision = "APPROVED" if passed else "REJECTED"

    gemma = explain_loan(
        req.name, req.loan_amount, req.monthly_income,
        req.cibil_score, req.has_defaults, decision
    ) if HF_TOKEN else ""

    return LoanDecisionResponse(
        decision=decision,
        reason=gemma or (
            "Underwriting checks completed successfully. All risk thresholds met."
            if passed else
            "Underwriting checks identified risk factors requiring rejection."
        ),
        rules=rules,
    )


@app.post("/api/kyc-verify", response_model=KYCResponse)
async def kyc_verify(req: KYCRequest):
    verified, issues, reason = VERAEngine.check_kyc(
        req.name, req.aadhaar, req.pan, req.dob
    )

    gemma = explain_kyc(req.name, verified, issues) if HF_TOKEN else ""

    return KYCResponse(
        verified=verified,
        failed_checks=issues,
        reason=gemma or reason,
    )


@app.post("/api/fraud-check", response_model=FraudCheckResponse)
async def fraud_check(req: FraudCheckRequest):
    action, risk_score, flags = VERAEngine.check_fraud(
        req.amount, req.merchant, req.location, req.customer_history
    )

    gemma = explain_fraud(
        req.amount, req.merchant, req.location, action, risk_score
    ) if HF_TOKEN else ""

    if gemma:
        flags.insert(0, gemma)

    return FraudCheckResponse(
        action=action,
        risk_score=risk_score,
        reasons=flags,
    )


@app.post("/api/sar-analysis", response_model=SARResponse)
async def sar_analysis(req: SARRequest):
    report, pattern, details = VERAEngine.check_sar(req.transactions)

    gemma = explain_sar(req.customer_id, report, pattern) if HF_TOKEN else ""

    return SARResponse(
        report_generated=report,
        pattern_type=pattern,
        details=gemma or details,
    )


@app.post("/api/loan-structuring", response_model=LoanStructuringResponse)
async def loan_structuring(req: LoanStructuringRequest):
    result = VERAEngine.structure_loan(
        req.monthly_income, req.monthly_expenses, req.risk_appetite
    )

    gemma = advise_loan_structure(
        req.monthly_income, req.monthly_expenses, req.risk_appetite,
        result["recommended_loan"], result["recommended_emi"]
    ) if HF_TOKEN else ""

    if gemma:
        result["gemma_advice"] = gemma

    return LoanStructuringResponse(**result)


@app.post("/api/audit-trail")
async def audit_trail(feature: str, inputs: dict, decision: str):
    gemma = generate_audit_entry(feature, inputs, decision) if HF_TOKEN else ""

    return {
        "feature": feature,
        "decision": decision,
        "summary": gemma or f"{feature}: {decision} via standard compliance checks.",
    }


STATIC_DIR = (
    os.path.join(os.path.dirname(__file__), "..", "frontend-dist")
    if os.path.isdir(os.path.join(os.path.dirname(__file__), "..", "frontend-dist"))
    else os.path.dirname(__file__)
)
if os.path.isdir(STATIC_DIR) and os.path.isfile(os.path.join(STATIC_DIR, "index.html")):
    app.mount("/", StaticFiles(directory=STATIC_DIR, html=True), name="static")
