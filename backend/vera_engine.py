import re
from datetime import datetime


class VERAEngine:

    @staticmethod
    def check_loan(loan_amount, monthly_income, cibil_score, has_defaults):
        rules = []
        all_pass = True

        r = 8.5 / 12 / 100
        n = 60
        emi = loan_amount * r * (1 + r)**n / ((1 + r)**n - 1) if r > 0 else loan_amount / n
        required_income = emi * 3

        if loan_amount <= 10_000_000:
            rules.append({"rule": "Loan amount ≤ ₹1 Crore", "status": "PASS", "detail": f"₹{loan_amount:,.0f} within limit"})
        else:
            rules.append({"rule": "Loan amount ≤ ₹1 Crore", "status": "FAIL", "detail": f"₹{loan_amount:,.0f} exceeds ₹1Cr limit"})
            all_pass = False

        if monthly_income >= required_income:
            rules.append({"rule": "Monthly income ≥ 3× EMI", "status": "PASS", "detail": f"EMI ₹{emi:,.0f}, need ₹{required_income:,.0f}/mo"})
        else:
            rules.append({"rule": "Monthly income ≥ 3× EMI", "status": "FAIL", "detail": f"EMI ₹{emi:,.0f}, income only ₹{monthly_income:,.0f}/mo"})
            all_pass = False

        if cibil_score >= 600:
            rules.append({"rule": "Credit score ≥ 600", "status": "PASS", "detail": f"CIBIL {cibil_score}"})
        else:
            rules.append({"rule": "Credit score ≥ 600", "status": "FAIL", "detail": f"CIBIL {cibil_score} below 600"})
            all_pass = False

        if not has_defaults:
            rules.append({"rule": "No RBI defaults", "status": "PASS", "detail": "Clean default record"})
        else:
            rules.append({"rule": "No RBI defaults", "status": "FAIL", "detail": "Has prior defaults"})
            all_pass = False

        return all_pass, rules, round(emi)

    @staticmethod
    def check_kyc(name, aadhaar, pan, dob):
        issues = []

        if not re.match(r'^\d{12}$', aadhaar):
            issues.append("Aadhaar must be a 12-digit number")

        if not re.match(r'^[A-Z]{5}[0-9]{4}[A-Z]{1}$', pan.upper()):
            issues.append("PAN must be valid 10-char alphanumeric (e.g., ABCDE1234K)")

        try:
            dob_date = datetime.strptime(dob, "%d-%m-%Y")
            today = datetime.now()
            age = today.year - dob_date.year - (
                (today.month, today.day) < (dob_date.month, dob_date.day)
            )
            if age < 18:
                issues.append(f"Age {age} years – must be at least 18")
        except Exception:
            issues.append("Invalid date format – use DD-MM-YYYY")

        pep_list = ["Arun Kumar", "Ravi Singh", "Neha Gupta", "Vikram Mehta"]
        for pep in pep_list:
            if pep.lower() in name.lower():
                issues.append(f"Name matches PEP list entry: {pep}")
                break

        verified = len(issues) == 0
        reason = "All KYC checks passed" if verified else "; ".join(issues)
        return verified, issues, reason

    @staticmethod
    def check_fraud(amount, merchant, location, customer_history):
        flags = []
        risk_score = 0

        if amount > 1_000_000:
            flags.append(f"Amount ₹{amount:,.0f} exceeds ₹10 lakh single transaction limit")
            risk_score += 40

        low_risk_keywords = ["grocery", "supermarket", "pharmacy", "restaurant", "known", "regular"]
        if not any(w in merchant.lower() for w in low_risk_keywords):
            flags.append(f"Merchant '{merchant}' not in known low-risk merchant list")
            risk_score += 25

        indian_cities = ["india", "mumbai", "delhi", "bangalore", "chennai", "kolkata", "hyderabad", "pune", "ahmedabad"]
        if not any(w in location.lower() for w in indian_cities):
            flags.append(f"Transaction location '{location}' is international or unusual")
            risk_score += 20

        if customer_history:
            try:
                usual = float(customer_history)
                if amount > usual * 3:
                    flags.append(f"Amount ₹{amount:,.0f} exceeds 3× normal pattern (₹{usual:,.0f})")
                    risk_score += 15
            except ValueError:
                pass

        risk_score = min(risk_score, 100)

        if risk_score >= 60:
            action = "BLOCK"
        elif risk_score >= 30:
            action = "FLAG"
        else:
            action = "ALLOW"

        if not flags:
            flags.append("Transaction matches normal customer behavior pattern")

        return action, risk_score, flags

    @staticmethod
    def check_sar(transactions_text):
        amounts = []
        for line in transactions_text.strip().split("\n"):
            nums = re.findall(r'[\d,]+\.?\d*', line.replace(",", ""))
            for n in nums:
                try:
                    amounts.append(float(n))
                except ValueError:
                    pass

        near_limit = [a for a in amounts if 900_000 <= a <= 999_999]
        if len(near_limit) >= 3:
            return True, "STRUCTURING", (
                f"Multiple deposits just under ₹10L reporting threshold detected ({len(near_limit)} occurrences). "
                f"Total structured amount: ₹{sum(near_limit):,.0f}. "
                f"This matches classic structuring typology under PMLA guidelines."
            )

        if len(amounts) >= 10:
            return True, "HIGH_VELOCITY", (
                f"High transaction velocity detected: {len(amounts)} transactions in period. "
                f"Total volume: ₹{sum(amounts):,.0f}. "
                f"Pattern consistent with layering or shell company activity."
            )

        return False, "NONE", "Transaction history appears normal. No AML red flags detected."

    @staticmethod
    def structure_loan(monthly_income, monthly_expenses, risk_appetite):
        available = monthly_income - monthly_expenses
        max_emi = monthly_income * 0.4

        r = 0.085 / 12
        tenures = {"3 years": 36, "5 years": 60, "7 years": 84}
        breakdown = {}

        for label, months in tenures.items():
            if r > 0:
                loan = max_emi * ((1 + r)**months - 1) / (r * (1 + r)**months)
            else:
                loan = max_emi * months
            emi = loan * r * (1 + r)**months / ((1 + r)**months - 1) if r > 0 else loan / months
            breakdown[label] = {
                "max_loan": round(loan),
                "emi": round(emi),
                "income_ratio": round(emi / monthly_income * 100, 1),
            }

        multipliers = {"conservative": 0.7, "moderate": 0.85, "aggressive": 1.0}
        mult = multipliers.get(risk_appetite.lower(), 0.85)

        recommended = round(breakdown["5 years"]["max_loan"] * mult / 100000) * 100000
        max_safe = round(breakdown["5 years"]["max_loan"] * mult)
        rec_emi = round(breakdown["5 years"]["emi"] * mult)

        return {
            "recommended_loan": recommended,
            "max_safe_loan": max_safe,
            "recommended_emi": rec_emi,
            "recommended_tenure": "5 years",
            "income_available": round(available),
            "max_emi_allowed": round(max_emi),
            "breakdown": breakdown,
        }
