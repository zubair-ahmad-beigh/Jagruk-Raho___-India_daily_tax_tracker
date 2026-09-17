'use client';

import { CheckCircle2, ShieldCheck } from 'lucide-react';

const trustPoints = [
  'Source-backed tax rules from CBIC GST Notifications & PPAC bulletins',
  'Explainable calculations with step-by-step formula breakdown',
  'State-aware taxation for petrol, diesel, and CNG fuel',
  'Historical tax-rule support — rules versioned by effective date',
  'Clear estimated vs actual tax distinction — no false claims',
];

export function TrustSection() {
  return (
    <section
      style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, #f0fdf8 0%, #fefcf7 50%, #fff8ef 100%)',
        borderTop: '1px solid rgba(0,143,104,0.1)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left */}
          <div>
            <div className="section-badge mb-5">
              <ShieldCheck size={13} />
              Transparent by Design
            </div>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(28px, 4vw, 42px)',
                fontWeight: 800,
                color: '#1A2340',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                marginBottom: 16,
              }}
            >
              Trust Built Into{' '}
              <span style={{ color: '#008F68' }}>Every Calculation</span>
            </h2>
            <p style={{ color: '#718096', fontSize: 16, lineHeight: 1.75, marginBottom: 28 }}>
              Unlike generic tax apps that guess rates, Jagruk Raho uses a verified database of official government tax rules. You can inspect the source behind every estimate.
            </p>
            <div className="space-y-3.5">
              {trustPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    style={{ color: '#008F68', marginTop: 2, shrink: 0 }}
                    className="shrink-0"
                  />
                  <span style={{ fontSize: 14, color: '#4A5568', lineHeight: 1.6 }}>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Disclaimer Card */}
          <div className="space-y-4">
            <div
              className="rounded-2xl p-6"
              style={{
                background: 'white',
                border: '1px solid rgba(0,143,104,0.15)',
                boxShadow: '0 4px 24px rgba(0,143,104,0.08)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck size={18} style={{ color: '#008F68' }} />
                <span style={{ fontWeight: 700, fontSize: 14, color: '#1A2340' }}>About Tax Estimates</span>
              </div>
              <p style={{ fontSize: 13, color: '#718096', lineHeight: 1.75 }}>
                Tax figures shown by Jagruk Raho are <strong style={{ color: '#1A2340' }}>estimates</strong> based on the information entered and applicable official tax rules. They are not a statement of tax actually remitted to the Government of India.
              </p>
            </div>

            <div
              className="rounded-2xl p-5"
              style={{
                background: 'rgba(232,114,26,0.06)',
                border: '1px solid rgba(232,114,26,0.2)',
              }}
            >
              <p style={{ fontSize: 13, color: '#744210', lineHeight: 1.75 }}>
                ⚠️ <strong>Important:</strong> Jagruk Raho is an independent consumer tax-awareness application. It is{' '}
                <strong>not affiliated with or operated by the Government of India</strong>, CBIC, Income Tax Department, or any official tax authority.
              </p>
            </div>

            {/* Source Examples */}
            <div
              className="rounded-2xl p-5"
              style={{ background: 'white', border: '1px solid rgba(0,143,104,0.1)' }}
            >
              <div style={{ fontWeight: 700, fontSize: 13, color: '#1A2340', marginBottom: 10 }}>
                Verified Official Sources Used
              </div>
              <div className="space-y-2">
                {[
                  { label: 'CBIC Notif 03/2020', desc: 'Mobile Phones — 18% GST', color: '#008F68' },
                  { label: 'CBIC Notif 46/2017', desc: 'Restaurant Services — 5% GST', color: '#008F68' },
                  { label: 'PPAC Bulletin 2026', desc: 'Petrol — Excise + State VAT', color: '#E8721A' },
                ].map((src, i) => (
                  <div key={i} className="flex items-center gap-2" style={{ fontSize: 12 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: src.color, shrink: 0 }} className="shrink-0" />
                    <span style={{ fontWeight: 600, color: src.color }}>{src.label}</span>
                    <span style={{ color: '#718096' }}>— {src.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
