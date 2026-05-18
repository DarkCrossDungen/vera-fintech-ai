'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Overview', icon: '◇' },
  { href: '/loan', label: 'Loan Intelligence', icon: '▤' },
  { href: '/kyc', label: 'KYC Verification', icon: '◈' },
  { href: '/fraud', label: 'Fraud Intelligence', icon: '⚠' },
  { href: '/aml', label: 'AML Monitoring', icon: '◉' },
  { href: '/audit', label: 'Audit Trail', icon: '⊞' },
  { href: '/reports', label: 'Reports', icon: '▣' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.2)',
            zIndex: 40, display: 'block',
          }}
        />
      )}

      {/* Sidebar */}
      <aside style={{
        width: 260,
        minHeight: '100vh',
        background: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed' as const,
        top: 0,
        left: 0,
        zIndex: 50,
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.2s ease',
      }}>
        {/* Logo */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--border)' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <h1 style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: 22,
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
            }}>
              VERA
            </h1>
            <p style={{
              fontSize: 11,
              color: 'var(--text-muted)',
              fontWeight: 500,
              letterSpacing: '0.02em',
              marginTop: 2,
            }}>
              AI Compliance Intelligence
            </p>
          </Link>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <span style={{ fontSize: 16, opacity: 0.7 }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid var(--border)',
          fontSize: 12,
          color: 'var(--text-muted)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span className="status-dot active" />
            <span style={{ fontWeight: 500 }}>All Systems Normal</span>
          </div>
          <p>VERA v1.0 · Gemma 4</p>
        </div>
      </aside>

      {/* Main area */}
      <div style={{
        flex: 1,
        marginLeft: 260,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Top bar */}
        <header style={{
          height: 60,
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          position: 'sticky' as const,
          top: 0,
          zIndex: 30,
        }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: 20,
              padding: 4,
            }}
          >
            ☰
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>
              Self-Hosted AI Risk & Compliance Platform
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '4px 12px', background: '#ecfdf5',
              borderRadius: 9999, fontSize: 12, fontWeight: 500, color: '#065f46',
            }}>
              <span className="status-dot active" style={{ width: 6, height: 6 }} />
              Gemma Connected
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: '32px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
