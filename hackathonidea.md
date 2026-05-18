VERA PHASE 1 - 5 FEATURES (Instead of just loan approval)
===========================================================

We're building a complete VERA demo with 5 features:

FEATURE 1: LOAN APPROVAL ✓ (Core)
FEATURE 2: COMPLIANCE CHECK / KYC VERIFICATION ✓
FEATURE 3: FRAUD DETECTION ✓ (Simplified)
FEATURE 4: SUSPICIOUS ACTIVITY REPORTING (SAR) ✓
FEATURE 5: LOAN STRUCTURING ✓ (Bonus - find optimal loan amount)

Total time: 10-14 hours (tight but doable)


═══════════════════════════════════════════════════════════════════

FEATURE 1: LOAN APPROVAL (3-4 hours)
====================================

WHAT IT DOES
────────────
User enters: Name, loan amount, monthly income, credit score, defaults
System checks: 4 rules
Output: APPROVED/REJECTED with reason

RULES
─────
Rule 1: Loan amount ≤ ₹1 Crore
Rule 2: Monthly income ≥ 3 × EMI
Rule 3: Credit score ≥ 600
Rule 4: No RBI defaults

EXAMPLE
───────
Input: Raj, ₹10L loan, ₹50K income, CIBIL 750, no defaults
Output: APPROVED (all 4 rules pass)

GEMMA USAGE
───────────
Gemma understands: "User is asking for loan approval"
Then system extracts numbers and checks rules.


═══════════════════════════════════════════════════════════════════

FEATURE 2: COMPLIANCE CHECK / KYC VERIFICATION (2-3 hours)
===========================================================

WHAT IT DOES
────────────
User enters: Customer name, Aadhaar number, PAN, date of birth
System checks: Is this person's identity verified?
Output: VERIFIED/FAILED with reason

RULES
─────
Rule 1: Aadhaar must be valid (12-digit number, format check)
Rule 2: PAN must be valid (10-character alphanumeric format)
Rule 3: Date of birth must be older than 18 years (adult)
Rule 4: No PEP list (Politically Exposed Person) - mock data

EXAMPLE
───────
Input: Priya, Aadhaar 123456789012, PAN ABCDE1234K, DOB 15-01-1990
Output: VERIFIED (all checks pass)
Reason: Identity successfully verified

Input: Arun, Aadhaar 12345, invalid format, PAN ABC
Output: FAILED
Reason: Aadhaar format incorrect, PAN format incorrect

GEMMA USAGE
───────────
Gemma extracts: "This person is asking for KYC verification"
Then system validates the documents.


═══════════════════════════════════════════════════════════════════

FEATURE 3: FRAUD DETECTION (SIMPLIFIED) (3-4 hours)
===================================================

WHAT IT DOES
────────────
User enters: Transaction details (amount, merchant, frequency, location)
System checks: Does this transaction pattern look suspicious?
Output: BLOCK / ALLOW with reason

RULES
─────
Rule 1: Amount limit - Single transaction > ₹10 lakhs = suspicious
Rule 2: Frequency - More than 5 transactions in 1 hour = suspicious
Rule 3: Location - Transaction in 2+ different countries in 1 hour = suspicious
Rule 4: Pattern - Never bought from this merchant before = watch

EXAMPLE (BLOCK)
───────────────
Input: Transaction ₹15 lakhs to unknown merchant, customer's usual limit ₹1L
Output: BLOCK
Reason: Transaction amount (₹15L) exceeds normal pattern (₹1L)
Action: Contact customer for verification

EXAMPLE (ALLOW)
────────────────
Input: Transaction ₹50K for groceries at regular supermarket
Output: ALLOW
Reason: Normal transaction, matches customer history

GEMMA USAGE
───────────
Gemma analyzes: "Is this transaction pattern consistent with customer behavior?"
"Customer usually buys groceries, now trying to send money abroad = suspicious"


═══════════════════════════════════════════════════════════════════

FEATURE 4: SUSPICIOUS ACTIVITY REPORTING (SAR) (2-3 hours)
==========================================================

WHAT IT DOES
────────────
User enters: Customer transaction history (last 30 days)
System checks: Does this match PMLA (money laundering) patterns?
Output: REPORT or NO REPORT, with details if suspicious

RULES (PMLA Typologies - Simplified)
─────────────────────────────────────
Rule 1: STRUCTURING - Multiple deposits ₹9.9L each to avoid ₹10L reporting
Rule 2: SHELL COMPANY - Rapid money in/out, no business activity
Rule 3: ROUND TRIPPING - Money sent abroad then returned
Rule 4: LAYERING - Repeated transfers between multiple accounts

EXAMPLE (REPORT GENERATED)
──────────────────────────
Input: Customer made 5 deposits of ₹9.9L each in one week
Output: SUSPICIOUS ACTIVITY REPORT GENERATED
Pattern: STRUCTURING detected
Action: Submit to FIU-India

SAR Content:
- Pattern type: Structuring
- Amount total: ₹49.5L
- Timeline: 7 days
- Customer behavior: Unusual for this account
- Recommendation: Freeze account pending investigation

EXAMPLE (NO REPORT)
───────────────────
Input: Customer deposits ₹20L for house down payment (from salary account)
Output: NO REPORT
Reason: Single large legitimate transaction, documented purpose


GEMMA USAGE
───────────
Gemma explains: "Why is this suspicious?"
"Multiple deposits just under ₹10L = classic structuring pattern"
"This is a red flag for money laundering"


═══════════════════════════════════════════════════════════════════

FEATURE 5: LOAN STRUCTURING / OPTIMIZATION (2-3 hours)
======================================================

WHAT IT DOES
────────────
User enters: Customer income, expense details, risk appetite
System calculates: What's the MAXIMUM safe loan amount?
Output: Recommended loan amount with breakdown

RULES
─────
Rule 1: Maximum loan amount where default risk stays < 15%
Rule 2: Monthly EMI should not exceed 40% of monthly income
Rule 3: Total debt (all loans) should not exceed 60% of annual income
Rule 4: Loan tenure should be 3-7 years (standard)

EXAMPLE
───────
Input: 
- Monthly income: ₹1,00,000
- Monthly expenses: ₹30,000
- Available for EMI: ₹40,000 (40% rule)
- Risk appetite: Conservative (< 10% default risk)

Calculation:
- With 5-year loan: Maximum EMI = ₹40,000
- At 8.5% interest: Maximum loan = ₹68 lakhs
- With 60% total debt rule: Maximum loan = ₹72 lakhs
- Conservative (10% risk): Recommend = ₹60 lakhs

Output: 
"Maximum safe loan amount: ₹60 lakhs
- EMI: ₹1,27,000/month (exceeds safe level)
- RECOMMENDED LOAN: ₹50 lakhs
- EMI: ₹1,05,000/month (32% of income - safe)"

GEMMA USAGE
───────────
Gemma analyzes: "What's this customer's true repayment capacity?"
"Income ₹1L - expenses ₹30K = ₹70K available"
"Can safely handle ₹50L loan"


═══════════════════════════════════════════════════════════════════

SUMMARY: 5 FEATURES FOR PHASE 1
================================

Feature          Time    Complexity   Gemma?   Output
────────────────────────────────────────────────────
1. Loan Approval      3-4h   LOW        Yes      APPROVED/REJECTED
2. KYC Compliance     2-3h   LOW        Yes      VERIFIED/FAILED
3. Fraud Detection    3-4h   MEDIUM     Yes      BLOCK/ALLOW
4. SAR Report         2-3h   MEDIUM     Yes      REPORT/NO REPORT
5. Loan Structuring   2-3h   MEDIUM     Yes      Recommended amount

Total:                12-17h hours (tight but doable)


═══════════════════════════════════════════════════════════════════

WEBSITE STRUCTURE (Single page with 5 tabs)
============================================

┌─────────────────────────────────────────────────────┐
│ VERA FINTECH DEMO - Phase 1                          │
├─────────────────────────────────────────────────────┤
│ [ Loan ] [ KYC ] [ Fraud ] [ SAR ] [ Structuring ]  │
├─────────────────────────────────────────────────────┤
│                                                     │
│ TAB 1: LOAN APPROVAL                               │
│ ─────────────────────                              │
│ Name: ________                                      │
│ Loan amount: ________                               │
│ Monthly income: ________                             │
│ CIBIL score: ________                               │
│ [Check Eligibility]                                 │
│ Result: APPROVED/REJECTED + reason                 │
│                                                     │
│ TAB 2: KYC COMPLIANCE                              │
│ ─────────────────────                              │
│ Full name: ________                                 │
│ Aadhaar: ________                                   │
│ PAN: ________                                       │
│ DOB: ________                                       │
│ [Verify Identity]                                   │
│ Result: VERIFIED/FAILED + reason                   │
│                                                     │
│ TAB 3: FRAUD DETECTION                             │
│ ─────────────────────                              │
│ Transaction amount: ________                         │
│ Merchant: ________                                  │
│ Location: ________                                  │
│ [Check Transaction]                                 │
│ Result: BLOCK/ALLOW + risk score                   │
│                                                     │
│ TAB 4: SUSPICIOUS ACTIVITY REPORT                  │
│ ───────────────────────────────                    │
│ Customer ID: ________                               │
│ Transaction history (paste): ________               │
│ [Analyze for SAR]                                   │
│ Result: REPORT/NO REPORT + pattern type            │
│                                                     │
│ TAB 5: LOAN STRUCTURING                            │
│ ──────────────────────────                         │
│ Monthly income: ________                             │
│ Monthly expenses: ________                           │
│ Risk appetite: [Conservative / Moderate / High]    │
│ [Calculate Max Loan]                                │
│ Result: Recommended loan amount + breakdown        │
│                                                     │
└─────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════

BACKEND ENDPOINTS (What needs to run on your computer)
======================================================

1. POST /loan-decision
   Input: name, loan_amount, monthly_income, cibil_score, has_defaults
   Output: decision, reason, all_rules_status

2. POST /kyc-verify
   Input: name, aadhaar, pan, dob
   Output: verified_status, failed_checks

3. POST /fraud-check
   Input: amount, merchant, location, customer_history
   Output: action (BLOCK/ALLOW), risk_score, reason

4. POST /sar-analysis
   Input: transactions_list, customer_id
   Output: report_generated, pattern_type, details

5. POST /loan-structuring
   Input: monthly_income, monthly_expenses, risk_appetite
   Output: max_loan_amount, recommended_loan, emi_breakdown


═══════════════════════════════════════════════════════════════════

WHY THESE 5 FEATURES?
=====================

They showcase:
✓ VERA can handle multiple fintech domains (not just loans)
✓ Gemma helps understand context (all 5 features use Gemma)
✓ Formal verification on all outputs (each has clear rules)
✓ Covers RBI's main concerns: Lending, Compliance, Fraud, Reporting
✓ Doable in 12-17 hours with tight schedule
✓ Impressive demo for judges (5 different use cases)

Other features like NPA Early Warning, Portfolio Monitoring need:
- Real-time data streaming (too complex)
- Historical data analysis (too much data)
- Machine learning models (too time-intensive)
- So we skip those for Phase 1


═══════════════════════════════════════════════════════════════════

TIME BREAKDOWN (12-17 hours)
============================

Hours 0-2: Setup Ollama, FastAPI, basic structure
Hours 2-4: Build Loan Approval feature
Hours 4-6: Build KYC Compliance feature
Hours 6-9: Build Fraud Detection feature
Hours 9-11: Build SAR Analysis feature
Hours 11-13: Build Loan Structuring feature
Hours 13-15: Create frontend (single HTML file with 5 tabs)
Hours 15-17: Testing + Demo video

Tight schedule but achievable.


═══════════════════════════════════════════════════════════════════

IMPRESSION FOR JUDGES
=====================

Most hackathon projects: "We made a chatbot with Gemma"

You will show: "We built VERA - a complete fintech system with:
- Loan approval with formal verification
- KYC compliance checking
- Real-time fraud detection
- SAR generation for money laundering reporting
- Intelligent loan structuring