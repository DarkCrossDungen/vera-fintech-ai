'use client';

import { useState } from 'react';

const auditData = [
  { id: 'AUD-001', timestamp: '18 May 2026, 14:32', module: 'Loan Intelligence', decision: 'APPROVED', risk: 'Low', status: 'Completed' },
  { id: 'AUD-002', timestamp: '18 May 2026, 13:15', module: 'KYC Verification', decision: 'VERIFIED', risk: 'Low', status: 'Completed' },
  { id: 'AUD-003', timestamp: '18 May 2026, 11:48', module: 'Fraud Intelligence', decision: 'BLOCK', risk: 'High', status: 'Escalated' },
  { id: 'AUD-004', timestamp: '18 May 2026, 10:22', module: 'AML Monitoring', decision: 'REPORT', risk: 'High', status: 'FIU Submitted' },
  { id: 'AUD-005', timestamp: '17 May 2026, 16:05', module: 'Loan Intelligence', decision: 'REJECTED', risk: 'Medium', status: 'Reviewed' },
  { id: 'AUD-006', timestamp: '17 May 2026, 14:30', module: 'KYC Verification', decision: 'FAILED', risk: 'Medium', status: 'Manual Review' },
  { id: 'AUD-007', timestamp: '17 May 2026, 09:12', module: 'Fraud Intelligence', decision: 'ALLOW', risk: 'Low', status: 'Completed' },
  { id: 'AUD-008', timestamp: '16 May 2026, 15:45', module: 'Loan Intelligence', decision: 'APPROVED', risk: 'Low', status: 'Completed' },
];

const decisionTrace = {
  id: 'AUD-001',
  steps: [
    { step: 1, name: 'Income Verification', status: 'PASS', detail: 'Monthly income ₹85,000 verified against salary slip' },
    { step: 2, name: 'Debt Ratio Analysis', status: 'PASS', detail: 'Debt-to-income ratio: 28% (threshold: 40%)' },
    { step: 3, name: 'Credit Score Check', status: 'PASS', detail: 'CIBIL score: 750 (threshold: 600)' },
    { step: 4, name: 'RBI Defaulter Check', status: 'PASS', detail: 'No defaults found in RBI records' },
    { step: 5, name: 'Loan Amount Validation', status: 'PASS', detail: '₹15,00,000 within ₹1 Crore limit' },
    { step: 6, name: 'Final Decision', status: 'APPROVED', detail: 'All 6 rules passed. Confidence: 92%' },
  ],
};

export default function AuditPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="fade-in">
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>Audit Trail</h1>
      <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 32 }}>
        Complete decision history with explainability traces and compliance logs.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: 24 }}>
        {/* Audit Table */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, fontFamily: "'Source Serif 4', Georgia, serif" }}>
                Decision History
              </h2>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn-secondary" style={{ padding: '6px 14px', fontSize: 13 }}>Export PDF</button>
                <button className="btn-secondary" style={{ padding: '6px 14px', fontSize: 13 }}>Export CSV</button>
              </div>
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: '#faf9f6' }}>
                  <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)' }}>ID</th>
                  <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)' }}>Timestamp</th>
                  <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)' }}>Module</th>
                  <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)' }}>Decision</th>
                  <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)' }}>Risk</th>
                  <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)' }}>Status</th>
                  <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, color: 'var(--text-secondary)' }}></th>
                </tr>
              </thead>
              <tbody>
                {auditData.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => setSelected(selected === row.id ? null : row.id)}
                    style={{
                      borderBottom: '1px solid var(--border-light)',
                      cursor: 'pointer',
                      background: selected === row.id ? '#eef2f6' : 'transparent',
                      transition: 'background 0.1s ease',
                    }}
                    onMouseEnter={(e) => { if (selected !== row.id) (e.currentTarget as HTMLElement).style.background = '#faf9f6'; }}
                    onMouseLeave={(e) => { if (selected !== row.id) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                  >
                    <td style={{ padding: '10px 16px', fontWeight: 500 }}>{row.id}</td>
                    <td style={{ padding: '10px 16px', color: 'var(--text-secondary)' }}>{row.timestamp}</td>
                    <td style={{ padding: '10px 16px' }}>{row.module}</td>
                    <td style={{ padding: '10px 16px' }}>
                      <span className={`tag ${row.decision === 'APPROVED' || row.decision === 'VERIFIED' || row.decision === 'ALLOW' ? 'tag-success' : row.decision === 'REJECTED' || row.decision === 'FAILED' || row.decision === 'BLOCK' ? 'tag-danger' : 'tag-warning'}`}>
                        {row.decision}
                      </span>
                    </td>
                    <td style={{ padding: '10px 16px' }}>
                      <span className={`tag ${row.risk === 'Low' ? 'tag-success' : row.risk === 'Medium' ? 'tag-warning' : 'tag-danger'}`}>
                        {row.risk}
                      </span>
                    </td>
                    <td style={{ padding: '10px 16px', color: 'var(--text-secondary)' }}>{row.status}</td>
                    <td style={{ padding: '10px 16px', color: 'var(--text-muted)', fontSize: 11 }}>View →</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Decision Trace */}
        {selected && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h2 style={{ fontSize: 16, fontWeight: 600, fontFamily: "'Source Serif 4', Georgia, serif" }}>
                  Decision Trace — {selected}
                </h2>
                <button className="btn-secondary" style={{ padding: '6px 14px', fontSize: 13 }}>Export Trace</button>
              </div>
              <div style={{ position: 'relative', paddingLeft: 24 }}>
                <div style={{ position: 'absolute', left: 9, top: 8, bottom: 8, width: 2, background: 'var(--border)' }} />
                {decisionTrace.steps.map((s, i) => (
                  <div key={i} style={{ position: 'relative', paddingBottom: 20, paddingLeft: 24 }}>
                    <div style={{
                      position: 'absolute', left: -16, top: 4, width: 12, height: 12, borderRadius: '50%',
                      background: s.status === 'PASS' || s.status === 'APPROVED' ? '#10b981' : s.status === 'FAIL' ? '#ef4444' : '#f59e0b',
                      border: '2px solid var(--bg-secondary)',
                    }} />
                    <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{s.name}</p>
                    <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{s.detail}</p>
                    <span className={`tag ${s.status === 'PASS' || s.status === 'APPROVED' ? 'tag-success' : s.status === 'FAIL' ? 'tag-danger' : 'tag-warning'}`}
                      style={{ fontSize: 10, marginTop: 4 }}>
                      {s.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14, fontFamily: "'Source Serif 4', Georgia, serif" }}>
                AI Explanation
              </h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                VERA analyzed the loan application against all formal compliance rules. The applicant&apos;s
                income of ₹85,000/month supports the requested EMI of ₹28,450 (33% of income — within the
                40% threshold). Credit score of 750 exceeds the minimum 600 requirement. No RBI defaults
                found. All 6 verification rules passed, resulting in APPROVED status with 92% confidence.
              </p>
            </div>

            <div className="card">
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14, fontFamily: "'Source Serif 4', Georgia, serif" }}>
                System Logs
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: 'monospace', fontSize: 12, color: 'var(--text-secondary)' }}>
                <p>[14:32:01] VERA Engine initialized for loan-decision request AUD-001</p>
                <p>[14:32:02] TPSE: Execution plan generated (6 steps)</p>
                <p>[14:32:03] WIRE: CIBIL API call — score 750 retrieved</p>
                <p>[14:32:04] Z3: Constraint verification — all 6 rules PASS</p>
                <p>[14:32:05] Gemma: Explanation generated (92% confidence)</p>
                <p>[14:32:05] RVL: Output verified — delivering response</p>
                <p>[14:32:05] Audit: Trace written to SQLite store</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
