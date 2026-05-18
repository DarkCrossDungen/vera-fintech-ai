from pydantic import BaseModel, Field
from typing import Optional


class LoanDecisionRequest(BaseModel):
    name: str
    loan_amount: float
    monthly_income: float
    cibil_score: int
    has_defaults: bool


class LoanDecisionResponse(BaseModel):
    decision: str
    reason: str
    rules: list


class KYCRequest(BaseModel):
    name: str
    aadhaar: str
    pan: str
    dob: str


class KYCResponse(BaseModel):
    verified: bool
    failed_checks: list
    reason: str


class FraudCheckRequest(BaseModel):
    amount: float
    merchant: str
    location: str
    customer_history: Optional[str] = ""


class FraudCheckResponse(BaseModel):
    action: str
    risk_score: float
    reasons: list


class SARRequest(BaseModel):
    customer_id: str
    transactions: str


class SARResponse(BaseModel):
    report_generated: bool
    pattern_type: str
    details: str


class LoanStructuringRequest(BaseModel):
    monthly_income: float
    monthly_expenses: float
    risk_appetite: str = "moderate"


class LoanStructuringResponse(BaseModel):
    recommended_loan: float
    max_safe_loan: float
    recommended_emi: float
    recommended_tenure: str
    income_available: float
    max_emi_allowed: float
    breakdown: dict
