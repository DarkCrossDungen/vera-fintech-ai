'use client';

import { useState } from 'react';

const transactionHistory = [
  { merchant: 'Big Bazaar', amount: '₹4,500', location: 'Mumbai', type: 'grocery' },
  { merchant: 'Indian Oil', amount: '₹3,200', location: 'Mumbai', type: 'fuel' },
  { merchant: 'Amazon.in', amount: '₹12,000', location: 'Mumbai', type: 'online' },
  { merchant: 'SWIGGY', amount: '₹450', location: 'Mumbai', type: 'food' },
  { merchant: 'Unknown Merchant', amount: '₹15,00,000', location: 'UAE', type: 'suspicious' },
];

export default function FraudPage() {
  const [form, setForm] = useState({
    customerId: 'CUST001',
    amount: '',
    merchant: '',
    location: '',
    deviceType: '',
    avgSpend: '',
    purpose: '',
  });
  const [result, setResult] = useState<null | {
    riskScore: number; riskLevel: string;
    anomalies: string[]; suspiciousPatterns: string[];
    action: string; actionLabel: string;
  }>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const analyze = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));

    const amount = parseFloat(form.amount) || 0;
    const avgSpend = parseFloat(form.avgSpend) || 100000;
    const isHighAmount = amount > 1000000;
    const isAbnormal = amount > avgSpend * 5;
    const isForeign = form.location.toLowerCase() !== 'india' && form.location !== '';
    const unknownMerchant = !['amazon', 'flipkart', 'big bazaar', 'swiggy', 'zomato', 'reliance'].some(m => form.merchant.toLowerCase().includes(m));

    const riskScore = Math.min(100, (isHighAmount ? 30 : 0) + (isAbnormal ? 25 : 0) + (isForeign ? 20 : 0) + (unknownMerchant ? 15 : 0) + 10);

    const anomalies: string[] = [];
    if (isHighAmount) anomalies.push('Transaction exceeds ₹10L threshold');
    if (isAbnormal) anomalies.push(`Amount ${amount}x above average spend of ₹${avgSpend}`);
    if (isForeign && form.location) anomalies.push(`Transaction originates from ${form.location}`);
    if (unknownMerchant) anomalies.push('No prior transaction history with this merchant');

    setResult({
      riskScore,
      riskLevel: riskScore >= 70 ? 'HIGH' : riskScore >= 40 ? 'MEDIUM' : 'LOW',
      anomalies,
      suspiciousPatterns: isForeign ? ['Cross-border transaction', 'New geographic location'] : isHighAmount ? ['Large value transaction'] : [],
      action: riskScore >= 70 ? 'ESCALATE' : riskScore >= 40 ? 'REVIEW' : 'ALLOW',
      actionLabel: riskScore >= 70 ? 'Escalate to Fraud Analyst' : riskScore >= 40 ? 'Manual Review Required' : 'Transaction Allowed',
    });
    setLoading(false);
  };

  return (
    <div className="fade-in">
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>Fraud Intelligence</h1>
      <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 32 }}>
        Suspicious transaction analysis and anomaly detection.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Left */}
        <div className="card">
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, fontFamily: "'Source Serif 4', Georgia, serif" }}>
            Transaction Details
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label>Customer ID</label>
              <input name="customerId" value={form.customerId} onChange={handleChange} className="input-field" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label>Transaction Amount (₹)</label>
                <input name="amount" value={form.amount} onChange={handleChange} placeholder="e.g. 1500000" className="input-field" />
              </div>
              <div>
                <label>Merchant Name</label>
                <input name="merchant" value={form.merchant} onChange={handleChange} placeholder="Merchant" className="input-field" />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label>Location / Country</label>
                <input name="location" value={form.location} onChange={handleChange} placeholder="e.g. India, UAE" className="input-field" />
              </div>
              <div>
                <label>Device Type</label>
                <select name="deviceType" value={form.deviceType} onChange={handleChange} className="input-field">
                  <option value="">Select device</option>
                  <option value="mobile">Mobile</option>
                  <option value="desktop">Desktop</option>
                  <option value="tablet">Tablet</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label>Previous Avg. Spend (₹)</label>
                <input name="avgSpend" value={form.avgSpend} onChange={handleChange} placeholder="e.g. 100000" className="input-field" />
              </div>
              <div>
                <label>Transaction Purpose</label>
                <input name="purpose" value={form.purpose} onChange={handleChange} placeholder="e.g. Payment" className="input-field" />
              </div>
            </div>
            <button className="btn-primary" onClick={analyze} disabled={loading} style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
              {loading ? 'Analyzing...' : 'Analyze Transaction Risk'}
            </button>
          </div>
        </div>

        {/* Right */}
        <div>
          {!result && !loading && (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400, color: 'var(--text-muted)' }}>
              <p style={{ fontSize: 40, marginBottom: 12 }}>⚠</p>
              <p style={{ fontSize: 15 }}>Enter transaction details to analyze</p>
            </div>
          )}

          {loading && (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
              <div style={{ width: 32, height: 32, border: '3px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginBottom: 16 }} />
              <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>VERA is analyzing transaction risk...</p>
            </div>
          )}

          {result && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Risk Meter */}
              <div className="card" style={{ textAlign: 'center' }}>
                <p className="section-title" style={{ marginBottom: 12 }}>Risk Assessment</p>
                <div style={{
                  width: 120, height: 120, borderRadius: '50%',
                  border: `6px solid ${result.riskLevel === 'HIGH' ? '#ef4444' : result.riskLevel === 'MEDIUM' ? '#f59e0b' : '#10b981'}`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 12px',
                }}>
                  <span style={{ fontSize: 32, fontWeight: 700, color: 'var(--text-primary)' }}>{result.riskScore}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>/ 100</span>
                </div>
                <span className={`tag ${result.riskLevel === 'HIGH' ? 'tag-danger' : result.riskLevel === 'MEDIUM' ? 'tag-warning' : 'tag-success'}`}>
                  {result.riskLevel} RISK
                </span>
              </div>

              {/* AI Analysis */}
              <div className="card">
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14, fontFamily: "'Source Serif 4', Georgia, serif" }}>
                  Anomaly Detection
                </h3>
                {result.anomalies.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {result.anomalies.map((a, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#fef2f2', borderRadius: 'var(--radius-sm)' }}>
                        <span style={{ color: '#dc2626' }}>⚠</span>
                        <span style={{ fontSize: 14, color: 'var(--text-primary)' }}>{a}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>No anomalies detected in this transaction.</p>
                )}
              </div>

              {/* Action */}
              <div className="card">
                <p className="section-title" style={{ marginBottom: 8 }}>Recommended Action</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span className={`tag ${result.action === 'ALLOW' ? 'tag-success' : result.action === 'REVIEW' ? 'tag-warning' : 'tag-danger'}`}>
                    {result.actionLabel}
                  </span>
                </div>
              </div>

              {/* Transaction Timeline */}
              <div className="card">
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14, fontFamily: "'Source Serif 4', Georgia, serif" }}>
                  Transaction Timeline
                </h3>
                <div style={{ position: 'relative', paddingLeft: 20 }}>
                  <div style={{ position: 'absolute', left: 7, top: 4, bottom: 4, width: 2, background: 'var(--border)' }} />
                  {transactionHistory.map((t, i) => (
                    <div key={i} style={{ position: 'relative', paddingBottom: 16, paddingLeft: 20 }}>
                      <div style={{
                        position: 'absolute', left: -16, top: 4, width: 10, height: 10, borderRadius: '50%',
                        background: t.type === 'suspicious' ? '#ef4444' : '#d1d5db',
                        border: '2px solid var(--bg-secondary)',
                      }} />
                      <p style={{ fontSize: 13, fontWeight: 500 }}>{t.merchant}</p>
                      <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.amount} · {t.location}</p>
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
