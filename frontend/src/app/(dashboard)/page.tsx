'use client';

import { useState, useEffect } from 'react';

const activities = [
  { id: 1, type: 'fraud', text: 'Suspicious overseas transfer detected — ₹12,50,000 to unknown beneficiary', time: '2 min ago', severity: 'high' },
  { id: 2, type: 'kyc', text: 'KYC mismatch identified — Aadhaar name does not match PAN', time: '8 min ago', severity: 'medium' },
  { id: 3, type: 'loan', text: 'Loan approved after verification — ₹15,00,000 at 9.5%', time: '15 min ago', severity: 'low' },
  { id: 4, type: 'aml', text: 'Potential structuring pattern detected — 4 deposits under ₹10L', time: '27 min ago', severity: 'high' },
  { id: 5, type: 'risk', text: 'Risk escalation — Customer flagged for manual review', time: '42 min ago', severity: 'medium' },
  { id: 6, type: 'fraud', text: 'Transaction blocked — Amount exceeds normal pattern (₹18L vs ₹2L avg)', time: '1 hr ago', severity: 'high' },
];

const typeColors: Record<string, string> = {
  fraud: '#fef2f2',
  kyc: '#fffbeb',
  loan: '#ecfdf5',
  aml: '#eef2f6',
  risk: '#fef2f2',
};

const typeLabels: Record<string, string> = {
  fraud: 'Fraud Alert',
  kyc: 'KYC Flag',
  loan: 'Loan Event',
  aml: 'AML Alert',
  risk: 'Risk Escalation',
};

export default function OverviewPage() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Active Risk Alerts', value: 7, change: '+2', positive: false },
    { label: 'Pending KYC Reviews', value: 23, change: '+5', positive: true },
    { label: 'Fraud Flags Today', value: 14, change: '-3', positive: true },
    { label: 'AML Investigations', value: 4, change: '+1', positive: false },
  ];

  return (
    <div className="fade-in">
      {/* Hero */}
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
          VERA
        </h1>
        <p style={{ fontSize: 16, color: 'var(--text-secondary)', fontWeight: 400, maxWidth: 600 }}>
          Explainable fintech intelligence for fraud detection, KYC verification,
          AML monitoring, and loan risk analysis.
        </p>
      </div>

      {/* Stats Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16,
        marginBottom: 32,
      }}>
        {stats.map((s) => (
          <div key={s.label} className="card" style={{ padding: '20px 24px' }}>
            <p className="stat-label" style={{ marginBottom: 8 }}>{s.label}</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span className="stat-value">{s.value}</span>
              <span style={{
                fontSize: 13,
                fontWeight: 500,
                color: s.positive ? '#065f46' : '#991b1b',
              }}>
                {s.change} today
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Feed */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 24, marginBottom: 32 }}>
        <div className="card">
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, fontFamily: "'Source Serif 4', Georgia, serif" }}>
            Live Activity Feed
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {activities.map((a) => (
              <div
                key={a.id}
                style={{
                  display: 'flex',
                  gap: 14,
                  padding: '12px 16px',
                  background: typeColors[a.type] || '#f9fafb',
                  borderRadius: 'var(--radius-sm)',
                  borderLeft: `3px solid ${a.severity === 'high' ? '#ef4444' : a.severity === 'medium' ? '#f59e0b' : '#10b981'}`,
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      color: 'var(--text-muted)',
                    }}>
                      {typeLabels[a.type]}
                    </span>
                    {a.severity === 'high' && (
                      <span className="tag tag-danger" style={{ fontSize: 10, padding: '2px 6px' }}>CRITICAL</span>
                    )}
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.5 }}>{a.text}</p>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Reasoning Panel */}
        <div className="card">
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 20, fontFamily: "'Source Serif 4', Georgia, serif" }}>
            AI Intelligence
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{
              padding: 16,
              background: 'var(--accent-subtle)',
              borderRadius: 'var(--radius-sm)',
            }}>
              <p className="section-title" style={{ marginBottom: 8 }}>Risk Summary</p>
              <p style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.6 }}>
                Transaction activity shows elevated risk in cross-border payments.
                Three transfers exceeding ₹10L detected in the last 24 hours —
                a 340% increase over normal patterns.
              </p>
            </div>
            <div>
              <p className="section-title">AI Reasoning</p>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Repeated sub-threshold deposits suggest potential structuring activity.
                Customer&apos;s historical behavior shows no prior high-value cross-border
                transactions. Pattern consistent with PMLA typology CAS-2023-04.
              </p>
            </div>
            <div>
              <p className="section-title">Recommended Action</p>
              <div style={{ display: 'flex', gap: 8 }}>
                <span className="tag tag-warning">Manual Review</span>
                <span className="tag tag-info">Escalate to Analyst</span>
                <span className="tag tag-success">Monitor Activity</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Status */}
      <div className="card" style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        <div>
          <p className="section-title">RBI Compliance</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <span className="tag tag-success">Compliant</span>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>FREE-AI Framework</span>
          </div>
        </div>
        <div>
          <p className="section-title">DPDP Act 2023</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <span className="tag tag-success">Compliant</span>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Data Localisation</span>
          </div>
        </div>
        <div>
          <p className="section-title">PMLA</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <span className="tag tag-success">Compliant</span>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>FIU-IND Reporting</span>
          </div>
        </div>
      </div>
    </div>
  );
}
