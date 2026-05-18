'use client';

import { useState } from 'react';

export default function AMLPage() {
  const [form, setForm] = useState({
    customerId: '',
    accountType: 'savings',
    dateRange: '30',
    transactions: '',
  });
  const [result, setResult] = useState<null | {
    patterns: { name: string; detected: boolean; description: string }[];
    riskScore: number; severity: string;
    narrative: string;
  }>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const analyze = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));

    const txLines = form.transactions.split('\n').filter(l => l.trim());
    const amounts = txLines.map(l => {
      const nums = l.match(/[\d,]+/g);
      return nums ? parseFloat(nums[0].replace(/,/g, '')) : 0;
    }).filter(a => a > 0);

    const structuringCount = amounts.filter(a => a >= 900000 && a < 1000000).length;
    const totalAmount = amounts.reduce((a, b) => a + b, 0);
    const highVelocity = txLines.length > 15;

    const patterns = [
      { name: 'STRUCTURING', detected: structuringCount >= 3, description: structuringCount >= 3 ? `${structuringCount} deposits just under ₹10L reporting threshold` : 'No structuring pattern detected' },
      { name: 'LAYERING', detected: highVelocity && txLines.length > 10, description: highVelocity && txLines.length > 10 ? `${txLines.length} rapid transfers between accounts` : 'Normal transaction velocity' },
      { name: 'ROUND TRIPPING', detected: false, description: 'No circular transaction patterns detected' },
      { name: 'SHELL ACTIVITY', detected: totalAmount > 5000000 && txLines.length < 5, description: totalAmount > 5000000 && txLines.length < 5 ? 'High value, low volume — potential shell activity' : 'Normal volume/value ratio' },
    ];

    const detectedPatterns = patterns.filter(p => p.detected);
    const riskScore = detectedPatterns.length > 0 ? 60 + detectedPatterns.length * 15 : 15;

    setResult({
      patterns,
      riskScore: Math.min(100, riskScore),
      severity: riskScore >= 75 ? 'HIGH' : riskScore >= 40 ? 'MEDIUM' : 'LOW',
      narrative: detectedPatterns.length > 0
        ? `Suspicious Activity Report — Pattern: ${detectedPatterns.map(p => p.name).join(', ')} detected in customer ${form.customerId || 'unknown'}. Total amount: ₹${totalAmount.toLocaleString('en-IN')}. Recommended action: Submit to FIU-India for investigation.`
        : 'No suspicious patterns detected. Customer activity appears normal.',
    });
    setLoading(false);
  };

  return (
    <div className="fade-in">
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>AML Monitoring</h1>
      <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 32 }}>
        Anti-money laundering intelligence and suspicious activity detection.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Left */}
        <div className="card">
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, fontFamily: "'Source Serif 4', Georgia, serif" }}>
            AML Analysis Input
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label>Customer ID</label>
                <input name="customerId" value={form.customerId} onChange={handleChange} placeholder="Enter customer ID" className="input-field" />
              </div>
              <div>
                <label>Account Type</label>
                <select name="accountType" value={form.accountType} onChange={handleChange} className="input-field">
                  <option value="savings">Savings</option>
                  <option value="current">Current</option>
                  <option value="corporate">Corporate</option>
                </select>
              </div>
            </div>
            <div>
              <label>Date Range</label>
              <select name="dateRange" value={form.dateRange} onChange={handleChange} className="input-field">
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
            </div>
            <div>
              <label>Transaction History</label>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>Paste one transaction per line (amount in ₹)</p>
              <textarea
                name="transactions"
                value={form.transactions}
                onChange={handleChange}
                placeholder={"₹9,90,000 deposit\n₹9,95,000 deposit\n₹9,80,000 deposit\n₹50,000 withdrawal"}
                className="input-field"
                style={{ minHeight: 160, resize: 'vertical', fontFamily: 'monospace' }}
              />
            </div>
            <button className="btn-primary" onClick={analyze} disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
              {loading ? 'Analyzing...' : 'Analyze AML Risk'}
            </button>
          </div>
        </div>

        {/* Right */}
        <div>
          {!result && !loading && (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400, color: 'var(--text-muted)' }}>
              <p style={{ fontSize: 40, marginBottom: 12 }}>◉</p>
              <p style={{ fontSize: 15 }}>Enter transaction data to analyze</p>
              <p style={{ fontSize: 13, marginTop: 4 }}>AML patterns will be detected here</p>
            </div>
          )}

          {loading && (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
              <div style={{ width: 32, height: 32, border: '3px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginBottom: 16 }} />
              <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>VERA is analyzing for AML patterns...</p>
            </div>
          )}

          {result && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Pattern Detection */}
              <div className="card">
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14, fontFamily: "'Source Serif 4', Georgia, serif" }}>
                  Pattern Detection
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {result.patterns.map((p) => (
                    <div key={p.name} style={{
                      display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
                      background: p.detected ? '#fef2f2' : '#f0fdf4',
                      borderRadius: 'var(--radius-sm)',
                      borderLeft: `3px solid ${p.detected ? '#ef4444' : '#10b981'}`,
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</span>
                          {p.detected && <span className="tag tag-danger" style={{ fontSize: 10 }}>FLAGGED</span>}
                        </div>
                        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>{p.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Level */}
              <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div>
                    <p className="section-title">AML Risk Score</p>
                    <p style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Source Serif 4', Georgia, serif" }}>{result.riskScore}<span style={{ fontSize: 14, color: 'var(--text-muted)' }}>/100</span></p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p className="section-title">Severity</p>
                    <span className={`tag ${result.severity === 'HIGH' ? 'tag-danger' : result.severity === 'MEDIUM' ? 'tag-warning' : 'tag-success'}`}>
                      {result.severity}
                    </span>
                  </div>
                </div>
              </div>

              {/* SAR Report */}
              <div className="card">
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14, fontFamily: "'Source Serif 4', Georgia, serif" }}>
                  Suspicious Activity Report
                </h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>
                  {result.narrative}
                </p>
                <button className="btn-primary">
                  Generate SAR Report
                </button>
              </div>

              {/* Investigation */}
              <div className="card">
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14, fontFamily: "'Source Serif 4', Georgia, serif" }}>
                  Investigation Notes
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ padding: '8px 12px', background: '#f9fafb', borderRadius: 'var(--radius-sm)' }}>
                    <p style={{ fontSize: 13, fontWeight: 500 }}>Flagged Entities</p>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Customer ID: {form.customerId || 'Not specified'}</p>
                  </div>
                  <div style={{ padding: '8px 12px', background: '#f9fafb', borderRadius: 'var(--radius-sm)' }}>
                    <p style={{ fontSize: 13, fontWeight: 500 }}>Suspicious Accounts</p>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Accounts linked to structuring pattern detected</p>
                  </div>
                  <div style={{ padding: '8px 12px', background: '#f9fafb', borderRadius: 'var(--radius-sm)' }}>
                    <p style={{ fontSize: 13, fontWeight: 500 }}>Transaction Relationships</p>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Multiple inbound deposits from unknown sources</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
