# VERA — Trustworthy AI for Financial Decisions

VERA is a fintech AI platform built to help financial institutions make safer, more transparent decisions using AI.

Today, many AI systems used in finance behave like black boxes. They generate answers, but they cannot clearly explain:
- why a loan was approved,
- why a transaction was flagged,
- or why a customer was marked as risky.

That creates a serious problem for regulated financial systems.

VERA was built to solve that problem.

Instead of acting like a generic chatbot, VERA combines structured financial rules with AI reasoning to create decisions that are easier to understand, review, and trust.

Built for the Gemma Hackathon.

---

# The Problem

Financial institutions are under pressure to modernize with AI, but most existing AI tools are not designed for regulated environments.

Common problems with traditional generative AI systems include:

- inconsistent outputs,
- hallucinated information,
- lack of audit trails,
- poor explainability,
- and dependence on external cloud processing.

In regulated industries like banking and fintech, that becomes dangerous.

A bank cannot simply tell an auditor:
> “The AI said so.”

Every important decision needs context, reasoning, and accountability.

---

# What VERA Does

VERA helps simulate how AI could be responsibly used in financial workflows.

The platform focuses on:
- explainability,
- compliance-oriented workflows,
- fraud awareness,
- audit visibility,
- and human review support.

Gemma is used as the reasoning layer to:
- interpret financial situations,
- explain risk patterns,
- summarize decisions,
- and provide contextual analysis.

The final output is not just a prediction — it is a decision with reasoning.

---

# Core Features

## 1. Loan Approval

Analyzes:
- loan amount,
- monthly income,
- repayment ability,
- credit score,
- and default history.

The system returns:
- approval or rejection,
- risk explanation,
- and reasoning behind the decision.

---

## 2. KYC Verification

Simulates identity verification workflows using:
- Aadhaar format validation,
- PAN validation,
- date of birth checks,
- phone verification,
- email verification,
- and webcam/selfie capture UI.

The goal is to demonstrate a modern onboarding experience for financial institutions.

---

## 3. Fraud Detection

Monitors transaction behavior to identify suspicious activity patterns.

Examples include:
- unusually large transactions,
- abnormal spending behavior,
- unexpected merchant activity,
- or rapid location changes.

Instead of automatically blocking users, the system generates risk alerts and recommendations for human review.

---

## 4. AML / Suspicious Activity Monitoring

Simulates anti-money laundering workflows by analyzing transaction history for patterns such as:
- structuring,
- repeated near-threshold deposits,
- layered transfers,
- and suspicious transaction behavior.

The system can generate simplified Suspicious Activity Reports (SARs) for review.

---

## 5. Loan Structuring

Helps estimate safer borrowing ranges based on:
- income,
- expenses,
- repayment capacity,
- and risk profile.

The system suggests:
- safer loan amounts,
- estimated EMI ranges,
- and affordability analysis.

---

# Why This Project Matters

VERA explores a simple idea:

AI systems used in finance should not behave like mystery machines.

They should be:
- understandable,
- reviewable,
- transparent,
- and easier to trust.

This project is an attempt to demonstrate how AI workflows in regulated industries could become more explainable and accountable.

---

# Tech Stack

Frontend:
- HTML
- CSS
- JavaScript

Backend:
- FastAPI

AI Reasoning:
- Google Gemma

Deployment:
- Hugging Face Spaces
- Docker

---

# Demo Flow

1. User enters financial or identity information
2. Backend validates structured rules
3. Gemma analyzes context and reasoning
4. System returns decision with explanation
5. Results are displayed with audit-style visibility

---

# Deployment

VERA is deployed using Hugging Face Spaces with a Docker-based FastAPI setup.

---

# Future Improvements

Possible future additions include:
- stronger audit systems,
- advanced fraud graph analysis,
- institution-specific policy engines,
- RBI-oriented reporting workflows,
- and deeper explainability tooling.

---

# Team

Built for the Gemma 4 good  Hackathon.