import os
import json
import re
import requests

HF_TOKEN = os.getenv("HF_TOKEN", "")
MODEL_ID = os.getenv("GEMMA_MODEL", "google/gemma-4-E2B-it")
API_URL = f"https://api-inference.huggingface.co/models/{MODEL_ID}"

HEADERS = {}
if HF_TOKEN:
    HEADERS["Authorization"] = f"Bearer {HF_TOKEN}"
    HEADERS["Content-Type"] = "application/json"

CHAT_TMPL = "<bos><start_of_turn>user\n{prompt}<end_of_turn>\n<start_of_turn>model\n"


def _call(prompt: str, max_tokens: int = 256) -> str:
    if not HF_TOKEN:
        return ""
    try:
        resp = requests.post(
            API_URL,
            headers=HEADERS,
            json={
                "inputs": CHAT_TMPL.format(prompt=prompt),
                "parameters": {
                    "max_new_tokens": max_tokens,
                    "temperature": 0.3,
                    "do_sample": True,
                    "return_full_text": False,
                },
            },
            timeout=60,
        )
        if resp.status_code == 200:
            data = resp.json()
            if isinstance(data, list) and len(data) > 0:
                return data[0].get("generated_text", "").strip()
        return ""
    except Exception:
        return ""


def explain_loan(name: str, amount: float, income: float, cibil: int, defaults: bool, decision: str) -> str:
    prompt = (
        f"You are VERA, a senior loan underwriter at an Indian bank. "
        f"Review this loan application and explain the decision in natural banking language.\n\n"
        f"Applicant: {name}\n"
        f"Loan Amount: Rs.{amount:,.0f}\n"
        f"Monthly Income: Rs.{income:,.0f}\n"
        f"CIBIL Score: {cibil}\n"
        f"Defaults: {'Yes' if defaults else 'No'}\n"
        f"Decision: {decision}\n\n"
        f"Generate 2-3 sentences explaining the financial risk, repayment capacity, and why this decision was reached. "
        f"Do not list rules. Use professional underwriting language."
    )
    return _call(prompt, 200)


def explain_kyc(name: str, verified: bool, issues: list) -> str:
    status = "passed" if verified else "failed with issues: " + "; ".join(issues)
    prompt = (
        f"You are VERA, a compliance verification officer. Summarize this KYC check result.\n\n"
        f"Applicant: {name}\n"
        f"Result: Verification {status}\n\n"
        f"Generate 1-2 sentences describing the verification outcome. Use professional compliance language."
    )
    return _call(prompt, 150)


def explain_fraud(amount: float, merchant: str, location: str, action: str, risk_score: float) -> str:
    prompt = (
        f"You are VERA, a fraud intelligence analyst at an Indian bank. "
        f"Explain this transaction risk assessment.\n\n"
        f"Amount: Rs.{amount:,.0f}\n"
        f"Merchant: {merchant}\n"
        f"Location: {location}\n"
        f"Risk Score: {risk_score}/100\n"
        f"Action: {action}\n\n"
        f"Generate 2-3 sentences explaining the transaction behavior, why it appears "
        f"{'suspicious' if action != 'ALLOW' else 'normal'}, and recommended next steps."
    )
    return _call(prompt, 200)


def explain_sar(customer_id: str, report: bool, pattern: str) -> str:
    if report:
        prompt = (
            f"You are VERA, an AML compliance officer filing a Suspicious Activity Report to FIU-India. "
            f"Generate a professional SAR narrative.\n\n"
            f"Customer ID: {customer_id}\n"
            f"Pattern Detected: {pattern}\n\n"
            f"Write 3-4 sentences describing the suspicious pattern, why it matches money laundering typologies, "
            f"and the recommended regulatory action. Use formal compliance language."
        )
    else:
        prompt = (
            f"You are VERA, an AML compliance officer. Summarize why no suspicious activity was detected.\n\n"
            f"Customer ID: {customer_id}\n\n"
            f"Write 1-2 sentences confirming the transaction history appears normal per AML guidelines."
        )
    return _call(prompt, 250)


def advise_loan_structure(income: float, expenses: float, risk: str, recommended: float, emi: float) -> str:
    prompt = (
        f"You are VERA, a loan advisory AI. Explain this loan structuring recommendation.\n\n"
        f"Monthly Income: Rs.{income:,.0f}\n"
        f"Monthly Expenses: Rs.{expenses:,.0f}\n"
        f"Risk Appetite: {risk}\n"
        f"Recommended Loan: Rs.{recommended:,}\n"
        f"Monthly EMI: Rs.{emi:,}\n\n"
        f"Generate 2-3 sentences explaining how this loan fits the customer's repayment capacity, "
        f"why this amount was chosen given their {risk} risk profile, and key considerations."
    )
    return _call(prompt, 200)


def generate_audit_entry(feature: str, inputs: dict, decision: str) -> str:
    prompt = (
        f"You are VERA, generating audit trail entries for RBI compliance.\n\n"
        f"Feature: {feature}\n"
        f"Inputs: {json.dumps(inputs)}\n"
        f"Decision: {decision}\n\n"
        f"Write 1-2 sentences for the audit log describing what was decided and why. "
        f"Use formal compliance language suitable for regulatory review."
    )
    return _call(prompt, 150)
