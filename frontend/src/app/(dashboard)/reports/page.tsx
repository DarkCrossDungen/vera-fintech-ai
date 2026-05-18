'use client';

const reports = [
  { id: 'SAR-2026-001', type: 'SAR Report', module: 'AML Monitoring', date: '18 May 2026', status: 'Generated', description: 'Structuring pattern detected — 4 deposits under ₹10L threshold' },
  { id: 'KYC-2026-042', type: 'KYC Report', module: 'KYC Verification', date: '18 May 2026', status: 'Generated', description: 'Identity verification for customer CUST-1024' },
  { id: 'FRD-2026-018', type: 'Fraud Report', module: 'Fraud Intelligence', date: '17 May 2026', status: 'Reviewed', description: 'Suspicious overseas transaction flagged for manual review' },
  { id: 'LOAN-2026-089', type: 'Loan Report', module: 'Loan Intelligence', date: '17 May 2026', status: 'Generated', description: 'Loan approval analysis — ₹15,00,000 at 9.5% interest' },
  { id: 'CMP-2026-005', type: 'Compliance Report', module: 'System', date: '16 May 2026', status: 'Finalized', description: 'Monthly compliance audit — all regulations satisfied' },
  { id: 'SAR-2026-002', type: 'SAR Report', module: 'AML Monitoring', date: '16 May 2026', status: 'Submitted', description: 'Round tripping pattern — funds routed through 3 jurisdictions' },
  { id: 'KYC-2026-041', type: 'KYC Report', module: 'KYC Verification', date: '15 May 2026', status: 'Failed', description: 'PAN verification mismatch — name does not match database' },
  { id: 'LOAN-2026-088', type: 'Loan Report', module: 'Loan Intelligence', date: '15 May 2026', status: 'Generated', description: 'Loan structuring analysis — recommended ₹50L at conservative risk' },
];

const statusColors: Record<string, string> = {
  Generated: 'tag-info',
  Reviewed: 'tag-warning',
  Finalized: 'tag-success',
  Submitted: 'tag-info',
  Failed: 'tag-danger',
};

export default function ReportsPage() {
  return (
    <div className="fade-in">
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>Reports</h1>
      <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 32 }}>
        Centralized report management for compliance and audit documentation.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {reports.map((r) => (
          <div key={r.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)' }}>{r.id}</span>
                <span className={`tag ${statusColors[r.status] || 'tag-info'}`} style={{ fontSize: 10 }}>{r.status}</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{r.module}</span>
              </div>
              <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-primary)' }}>{r.type}</p>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>{r.description}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{r.date}</span>
              <button className="btn-secondary" style={{ padding: '6px 14px', fontSize: 13 }}>Preview</button>
              <button className="btn-primary" style={{ padding: '6px 14px', fontSize: 13 }}>Download</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
