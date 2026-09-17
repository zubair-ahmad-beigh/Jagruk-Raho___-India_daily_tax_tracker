'use client';

const steps = [
  { num: '01', title: 'Add Your Expense', desc: 'Enter what you bought — manually or using natural language in Hindi, English, or Hinglish.', accent: '#10b981' },
  { num: '02', title: 'AI Identifies Product', desc: 'Gemini AI classifies the product, extracts category, amount, and state for lookup.', accent: '#f59e0b' },
  { num: '03', title: 'Apply Verified Tax Rule', desc: 'Backend queries the verified tax-rule database (CBIC/PPAC) for the applicable rule.', accent: '#10b981' },
  { num: '04', title: 'See Your Estimated Tax', desc: 'View a transparent breakdown with formula, source link, and CGST/SGST/VAT split.', accent: '#f59e0b' },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" style={{ background: '#0a1a0f', padding: '72px 0', borderTop: '1px solid rgba(16,185,129,0.1)', borderBottom: '1px solid rgba(16,185,129,0.1)' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-12">
          <div className="section-badge mb-4" style={{ margin: '0 auto 14px' }}>
            How It Works
          </div>
          <h2
            style={{
              fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: '#f1f5f9',
              letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 10,
            }}
          >
            From Expense to Tax — 4 Steps
          </h2>
          <p style={{ color: '#64748b', fontSize: 13, maxWidth: 400, margin: '0 auto', lineHeight: 1.7 }}>
            Jagruk Raho connects your purchase to the official tax rule in seconds.
          </p>
        </div>

        {/* Connector line (desktop) */}
        <div className="relative">
          <div
            className="hidden md:block absolute top-[36px] left-0 right-0"
            style={{
              height: 1,
              background: 'linear-gradient(90deg, rgba(16,185,129,0.4), rgba(245,158,11,0.4), rgba(16,185,129,0.4), rgba(245,158,11,0.4))',
              maxWidth: '75%',
              left: '12.5%',
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center relative">
                <div
                  className="w-[68px] h-[68px] rounded-full flex items-center justify-center mb-5 relative z-10"
                  style={{
                    background: '#020c07',
                    border: `2px solid ${step.accent}`,
                    boxShadow: `0 0 20px ${step.accent}30`,
                  }}
                >
                  <span style={{ fontWeight: 900, fontSize: 18, color: step.accent, fontFamily: 'ui-monospace, monospace' }}>
                    {step.num}
                  </span>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 13, color: '#f1f5f9', marginBottom: 8, lineHeight: 1.3 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.65 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture banner */}
        <div
          className="mt-12 rounded-xl px-5 py-4 text-center"
          style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)' }}
        >
          <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 2 }}>
            <span style={{ fontWeight: 700, color: '#10b981' }}>Gemini AI</span>
            <span style={{ margin: '0 8px', color: '#475569' }}>→</span>
            <span style={{ fontWeight: 700, color: '#f59e0b' }}>Official Gov. Sources</span>
            <span style={{ margin: '0 8px', color: '#475569' }}>→</span>
            <span style={{ fontWeight: 700, color: '#10b981' }}>Spring Boot Engine</span>
            <span style={{ margin: '0 8px', color: '#475569' }}>→</span>
            <span style={{ fontWeight: 700, color: '#f1f5f9' }}>Jagruk Raho UI</span>
          </div>
        </div>
      </div>
    </section>
  );
}
