'use client';

import { useState } from 'react';

export default function LoanPage() {
  const [form, setForm] = useState({
    name: '', dob: '', phone: '', email: '',
    employmentType: 'salaried', company: '', yearsEmployed: '',
    monthlyIncome: '', monthlyExpenses: '', existingLoans: '', loanAmount: '',
    creditScore: '', previousDefaults: false,
  });

  const [result, setResult] = useState<null | {
    decision: string; riskLevel: string; confidence: number;
    emiAnalysis: string; debtRatio: string; creditWorthiness: string;
    recommendedLoan: string; recommendedEmi: string; duration: string;
    checks: { label: string; passed: boolean }[];
  }>(null);

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const analyze = async () => {
    setLoading(true);
    // Simulate AI analysis
    await new Promise(r => setTimeout(r, 1500));
    const income = parseFloat(form.monthlyIncome) || 0;
    const loanAmt = parseFloat(form.loanAmount) || 0;
    const expenses = parseFloat(form.monthlyExpenses) || 0;
    const creditScore = parseInt(form.creditScore) || 0;
    const approved = loanAmt <= 10000000 && income >= expenses * 2 && creditScore >= 600 && !form.previousDefaults;

    setResult({
      decision: approved ? 'APPROVED' : 'REVIEW',
      riskLevel: approved ? 'Low' : 'Medium-High',
      confidence: approved ? 92 : 58,
      emiAnalysis: `Monthly EMI estimated at ₹${(loanAmt * 0.0095).toLocaleString('en-IN')} — ${income > loanAmt * 0.0095 * 3 ? 'within safe limits' : 'exceeds recommended threshold'}`,
      debtRatio: `Debt-to-income ratio: ${((expenses / (income || 1)) * 100).toFixed(1)}% — ${(expenses / (income || 1)) <= 0.4 ? 'within 40% threshold' : 'exceeds 40% threshold'}`,
      creditWorthiness: `Credit score ${creditScore} — ${creditScore >= 700 ? 'strong' : creditScore >= 600 ? 'acceptable' : 'below minimum'} (minimum 600 required)`,
      recommendedLoan: `₹${Math.min(loanAmt, income * 12 * 3).toLocaleString('en-IN')}`,
      recommendedEmi: `₹${(Math.min(loanAmt, income * 12 * 3) * 0.0095).toLocaleString('en-IN')}`,
      duration: '5 years (standard tenure)',
      checks: [
        { label: 'Income Verified', passed: income >= 25000 },
        { label: 'Debt Ratio Within Threshold', passed: (expenses / (income || 1)) <= 0.4 },
        { label: 'Credit Score Acceptable', passed: creditScore >= 600 },
        { label: 'No Major Defaults', passed: !form.previousDefaults },
        { label: 'Loan Amount Within Limits', passed: loanAmt <= 10000000 },
      ],
    });
    setLoading(false);
  };

  return (
    <div className="fade-in">
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>Loan Intelligence</h1>
      <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 32 }}>
        AI-assisted underwriting and loan structuring analysis.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Left — Application Form */}
        <div className="card">
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, fontFamily: "'Source Serif 4', Georgia, serif" }}>
            Loan Application
          </h2>

          <div style={{ marginBottom: 20 }}>
            <p className="section-title">Personal Information</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label>Full Name</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Enter full name" className="input-field" />
              </div>
              <div>
                <label>Date of Birth</label>
                <input name="dob" type="date" value={form.dob} onChange={handleChange} className="input-field" />
              </div>
              <div>
                <label>Phone Number</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 9XXX XXX XXX" className="input-field" />
              </div>
              <div>
                <label>Email Address</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="name@email.com" className="input-field" />
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <p className="section-title">Employment Information</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              <div>
                <label>Type</label>
                <select name="employmentType" value={form.employmentType} onChange={handleChange} className="input-field">
                  <option value="salaried">Salaried</option>
                  <option value="self-employed">Self-Employed</option>
                  <option value="business">Business Owner</option>
                </select>
              </div>
              <div>
                <label>Company</label>
                <input name="company" value={form.company} onChange={handleChange} placeholder="Company name" className="input-field" />
              </div>
              <div>
                <label>Years</label>
                <input name="yearsEmployed" value={form.yearsEmployed} onChange={handleChange} placeholder="Years" className="input-field" />
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <p className="section-title">Financial Information</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label>Monthly Income (₹)</label>
                <input name="monthlyIncome" value={form.monthlyIncome} onChange={handleChange} placeholder="e.g. 80000" className="input-field" />
              </div>
              <div>
                <label>Monthly Expenses (₹)</label>
                <input name="monthlyExpenses" value={form.monthlyExpenses} onChange={handleChange} placeholder="e.g. 30000" className="input-field" />
              </div>
              <div>
                <label>Existing Loans (₹)</label>
                <input name="existingLoans" value={form.existingLoans} onChange={handleChange} placeholder="e.g. 500000" className="input-field" />
              </div>
              <div>
                <label>Requested Loan (₹)</label>
                <input name="loanAmount" value={form.loanAmount} onChange={handleChange} placeholder="e.g. 1000000" className="input-field" />
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <p className="section-title">Credit Information</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'end' }}>
              <div>
                <label>Credit Score (CIBIL)</label>
                <input name="creditScore" value={form.creditScore} onChange={handleChange} placeholder="300-900" className="input-field" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 4 }}>
                <input type="checkbox" name="previousDefaults" checked={form.previousDefaults} onChange={handleChange} id="defaults" style={{ width: 16, height: 16 }} />
                <label htmlFor="defaults" style={{ margin: 0, fontSize: 13 }}>Previous Defaults</label>
              </div>
            </div>
          </div>

          <button className="btn-primary" onClick={analyze} disabled={loading} style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Analyzing...' : 'Analyze Loan Eligibility'}
          </button>
        </div>

        {/* Right — AI Analysis Panel */}
        <div>
          {!result && !loading && (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400, color: 'var(--text-muted)' }}>
              <p style={{ fontSize: 40, marginBottom: 12 }}>▤</p>
              <p style={{ fontSize: 15 }}>Submit a loan application to see AI analysis</p>
            </div>
          )}

          {loading && (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
              <div style={{ width: 32, height: 32, border: '3px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginBottom: 16 }} />
              <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>VERA is analyzing the application...</p>
              <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
            </div>
          )}

          {result && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Decision Card */}
              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <div>
                    <p className="section-title" style={{ marginBottom: 4 }}>Decision</p>
                    <h2 style={{
                      fontSize: 28,
                      fontWeight: 700,
                      fontFamily: "'Source Serif 4', Georgia, serif",
                      color: result.decision === 'APPROVED' ? '#065f46' : '#92400e',
                    }}>
                      {result.decision}
                    </h2>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p className="section-title" style={{ marginBottom: 4 }}>Risk Level</p>
                    <span className={`tag ${result.riskLevel === 'Low' ? 'tag-success' : 'tag-warning'}`}>
                      {result.riskLevel}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="section-title" style={{ marginBottom: 4 }}>Confidence</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ flex: 1, height: 6, background: 'var(--border)', borderRadius: 3 }}>
                      <div style={{
                        width: `${result.confidence}%`,
                        height: '100%',
                        background: result.confidence >= 80 ? '#10b981' : result.confidence >= 60 ? '#f59e0b' : '#ef4444',
                        borderRadius: 3,
                        transition: 'width 0.5s ease',
                      }} />
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{result.confidence}%</span>
                  </div>
                </div>
              </div>

              {/* AI Reasoning */}
              <div className="card">
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14, fontFamily: "'Source Serif 4', Georgia, serif" }}>
                  AI Reasoning
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div>
                    <p className="section-title">EMI Analysis</p>
                    <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{result.emiAnalysis}</p>
                  </div>
                  <div>
                    <p className="section-title">Debt Ratio Analysis</p>
                    <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{result.debtRatio}</p>
                  </div>
                  <div>
                    <p className="section-title">Creditworthiness</p>
                    <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{result.creditWorthiness}</p>
                  </div>
                </div>
              </div>

              {/* Loan Structuring */}
              <div className="card">
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14, fontFamily: "'Source Serif 4', Georgia, serif" }}>
                  Loan Structuring
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <p className="section-title">Recommended Loan</p>
                    <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent)' }}>{result.recommendedLoan}</p>
                  </div>
                  <div>
                    <p className="section-title">Estimated EMI</p>
                    <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>{result.recommendedEmi}<span style={{ fontSize: 14, fontWeight: 400, color: 'var(--text-muted)' }}>/mo</span></p>
                  </div>
                  <div>
                    <p className="section-title">Duration</p>
                    <p style={{ fontSize: 15, color: 'var(--text-secondary)' }}>{result.duration}</p>
                  </div>
                  <div>
                    <p className="section-title">Risk Category</p>
                    <span className={`tag ${result.riskLevel === 'Low' ? 'tag-success' : result.riskLevel === 'Medium-High' ? 'tag-warning' : 'tag-danger'}`}>
                      {result.riskLevel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Verification Checks */}
              <div className="card">
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14, fontFamily: "'Source Serif 4', Georgia, serif" }}>
                  Verification Checks
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {result.checks.map((c) => (
                    <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: c.passed ? '#f0fdf4' : '#fef2f2', borderRadius: 'var(--radius-sm)' }}>
                      <span style={{ fontSize: 16, color: c.passed ? '#16a34a' : '#dc2626' }}>{c.passed ? '✓' : '✗'}</span>
                      <span style={{ fontSize: 14, color: 'var(--text-primary)', fontWeight: 500 }}>{c.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
