'use client';

import { useState } from 'react';

export default function KYCPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: '', dob: '', gender: 'male', nationality: 'Indian',
    phone: '', otp: '', otpSent: false, otpVerified: false,
    email: '', emailVerified: false,
    aadhaar: '', pan: '',
    faceCaptured: false,
  });
  const [result, setResult] = useState<null | { decision: string; checks: { label: string; passed: boolean }[] }>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const sendOtp = () => {
    if (form.phone.length >= 10) {
      setForm(prev => ({ ...prev, otpSent: true }));
      alert('OTP sent to ' + form.phone);
    }
  };

  const verifyOtp = () => {
    if (form.otp === '1234') {
      setForm(prev => ({ ...prev, otpVerified: true }));
    } else {
      alert('Invalid OTP. Try 1234');
    }
  };

  const verifyEmail = () => {
    if (form.email.includes('@')) {
      setForm(prev => ({ ...prev, emailVerified: true }));
    }
  };

  const captureFace = () => {
    setForm(prev => ({ ...prev, faceCaptured: true }));
  };

  const runVerification = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));

    const aadhaarClean = form.aadhaar.replace(/\D/g, '');
    const panValid = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.pan.toUpperCase());
    const aadhaarValid = aadhaarClean.length === 12;
    const ageValid = form.dob ? (new Date().getFullYear() - new Date(form.dob).getFullYear()) >= 18 : false;

    const checks = [
      { label: 'Aadhaar Format Valid', passed: aadhaarValid },
      { label: 'PAN Format Valid', passed: panValid },
      { label: 'OTP Verified', passed: form.otpVerified },
      { label: 'Face Capture Completed', passed: form.faceCaptured },
      { label: 'Age Verification (18+)', passed: ageValid },
    ];

    const allPassed = checks.every(c => c.passed);
    setResult({
      decision: allPassed ? 'VERIFIED' : checks.filter(c => c.passed).length >= 3 ? 'MANUAL REVIEW' : 'FAILED',
      checks,
    });
    setLoading(false);
  };

  return (
    <div className="fade-in">
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>KYC Verification</h1>
      <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 32 }}>
        Multi-step identity verification workflow.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Left */}
        <div className="card">
          {/* Steps indicator */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} style={{
                flex: 1, height: 4, borderRadius: 2,
                background: step >= s ? 'var(--accent)' : 'var(--border)',
                transition: 'background 0.3s ease',
              }} />
            ))}
          </div>

          {step === 1 && (
            <div>
              <p className="section-title" style={{ fontSize: 15, marginBottom: 16 }}>Personal Details</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label>Full Name</label>
                  <input name="fullName" value={form.fullName} onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label>Date of Birth</label>
                  <input name="dob" type="date" value={form.dob} onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label>Gender</label>
                  <select name="gender" value={form.gender} onChange={handleChange} className="input-field">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label>Nationality</label>
                  <input name="nationality" value={form.nationality} onChange={handleChange} className="input-field" />
                </div>
              </div>
              <button className="btn-primary" onClick={() => setStep(2)} style={{ marginTop: 20 }}>Continue</button>
            </div>
          )}

          {step === 2 && (
            <div>
              <p className="section-title" style={{ fontSize: 15, marginBottom: 16 }}>Contact Verification</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label>Phone Number</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 9XXX XXX XXX" className="input-field" style={{ flex: 1 }} />
                    <button className="btn-secondary" onClick={sendOtp} disabled={form.otpSent} style={{ whiteSpace: 'nowrap' }}>
                      {form.otpSent ? 'OTP Sent' : 'Send OTP'}
                    </button>
                  </div>
                  {form.otpSent && !form.otpVerified && (
                    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                      <input name="otp" value={form.otp} onChange={handleChange} placeholder="Enter OTP" className="input-field" style={{ flex: 1 }} />
                      <button className="btn-primary" onClick={verifyOtp}>Verify</button>
                    </div>
                  )}
                  {form.otpVerified && <p style={{ fontSize: 13, color: '#065f46', marginTop: 6 }}>✓ Phone verified</p>}
                </div>
                <div>
                  <label>Email Address</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="name@email.com" className="input-field" style={{ flex: 1 }} />
                    <button className="btn-secondary" onClick={verifyEmail} disabled={form.emailVerified} style={{ whiteSpace: 'nowrap' }}>
                      {form.emailVerified ? 'Verified' : 'Verify Email'}
                    </button>
                  </div>
                  {form.emailVerified && <p style={{ fontSize: 13, color: '#065f46', marginTop: 6 }}>✓ Email verified</p>}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
                <button className="btn-secondary" onClick={() => setStep(1)}>Back</button>
                <button className="btn-primary" onClick={() => setStep(3)}>Continue</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="section-title" style={{ fontSize: 15, marginBottom: 16 }}>Identity Documents</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <label>Aadhaar Number</label>
                  <input name="aadhaar" value={form.aadhaar} onChange={handleChange} placeholder="12-digit Aadhaar number" className="input-field" />
                </div>
                <div>
                  <label>PAN Number</label>
                  <input name="pan" value={form.pan} onChange={handleChange} placeholder="e.g. ABCDE1234F" className="input-field" style={{ textTransform: 'uppercase' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={{ padding: 24, border: '2px dashed var(--border)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Upload Aadhaar Card</p>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Click to upload</p>
                  </div>
                  <div style={{ padding: 24, border: '2px dashed var(--border)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                    <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Upload PAN Card</p>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Click to upload</p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
                <button className="btn-secondary" onClick={() => setStep(2)}>Back</button>
                <button className="btn-primary" onClick={() => setStep(4)}>Continue</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <p className="section-title" style={{ fontSize: 15, marginBottom: 16 }}>Face Verification</p>
              <div style={{
                aspectRatio: '4/3',
                background: '#f3f4f6',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed var(--border)',
                marginBottom: 16,
              }}>
                {!form.faceCaptured ? (
                  <>
                    <p style={{ fontSize: 32, color: 'var(--text-muted)', marginBottom: 8 }}>◉</p>
                    <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>Camera preview will appear here</p>
                  </>
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: 40, marginBottom: 8 }}>✓</p>
                    <p style={{ fontSize: 14, color: '#065f46', fontWeight: 500 }}>Face Capture Successful</p>
                  </div>
                )}
              </div>
              {!form.faceCaptured && (
                <button className="btn-primary" onClick={captureFace} style={{ width: '100%', justifyContent: 'center' }}>
                  Start Face Verification
                </button>
              )}
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button className="btn-secondary" onClick={() => setStep(3)}>Back</button>
                <button className="btn-primary" onClick={() => setStep(5)}>Continue</button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <p className="section-title" style={{ fontSize: 15, marginBottom: 16 }}>Review & Submit</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Name</span>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{form.fullName || 'Not provided'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Phone</span>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{form.otpVerified ? '✓ Verified' : 'Not verified'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Email</span>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{form.emailVerified ? '✓ Verified' : 'Not verified'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Aadhaar</span>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{form.aadhaar ? form.aadhaar.replace(/\d(?=\d{4})/g, '•') : 'Not provided'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Face Capture</span>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{form.faceCaptured ? '✓ Completed' : 'Not done'}</span>
                </div>
              </div>
              <button className="btn-primary" onClick={runVerification} disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
                {loading ? 'Verifying...' : 'Submit for Verification'}
              </button>
            </div>
          )}
        </div>

        {/* Right — Result Panel */}
        <div>
          {!result && !loading && (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400, color: 'var(--text-muted)' }}>
              <p style={{ fontSize: 40, marginBottom: 12 }}>◈</p>
              <p style={{ fontSize: 15 }}>Complete the verification steps</p>
              <p style={{ fontSize: 13, marginTop: 4 }}>Results will appear here</p>
            </div>
          )}

          {loading && (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
              <div style={{ width: 32, height: 32, border: '3px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginBottom: 16 }} />
              <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>VERA is verifying identity...</p>
            </div>
          )}

          {result && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="card" style={{ textAlign: 'center', padding: 32 }}>
                <h2 style={{
                  fontSize: 32,
                  fontWeight: 700,
                  fontFamily: "'Source Serif 4', Georgia, serif",
                  color: result.decision === 'VERIFIED' ? '#065f46' : result.decision === 'MANUAL REVIEW' ? '#92400e' : '#991b1b',
                  marginBottom: 8,
                }}>
                  {result.decision}
                </h2>
                <span className={`tag ${result.decision === 'VERIFIED' ? 'tag-success' : result.decision === 'MANUAL REVIEW' ? 'tag-warning' : 'tag-danger'}`}>
                  {result.decision === 'VERIFIED' ? 'Identity Confirmed' : result.decision === 'MANUAL REVIEW' ? 'Needs Manual Review' : 'Verification Failed'}
                </span>
              </div>

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

              <div className="card">
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 14, fontFamily: "'Source Serif 4', Georgia, serif" }}>
                  Compliance Status
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#f0fdf4', borderRadius: 'var(--radius-sm)' }}>
                    <span style={{ fontSize: 14 }}>RBI Compliance</span>
                    <span className="tag tag-success">Compliant</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#f0fdf4', borderRadius: 'var(--radius-sm)' }}>
                    <span style={{ fontSize: 14 }}>DPDP Act 2023</span>
                    <span className="tag tag-success">Compliant</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#fef2f2', borderRadius: 'var(--radius-sm)' }}>
                    <span style={{ fontSize: 14 }}>FREE-AI Framework</span>
                    <span className={`tag ${result.decision === 'VERIFIED' ? 'tag-success' : 'tag-warning'}`}>
                      {result.decision === 'VERIFIED' ? 'Compliant' : 'Review Required'}
                    </span>
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
