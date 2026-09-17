'use client';

import { BarChart2, ShieldCheck, MapPin, FileText, Clock, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <BarChart2 size={22} />,
    title: 'Daily Tax Tracking',
    desc: 'See the estimated indirect tax included in today\'s spending — GST, Excise, VAT — broken down by category.',
    color: '#008F68',
  },
  {
    icon: <ShieldCheck size={22} />,
    title: 'Transparent Calculations',
    desc: 'Understand exactly how the estimate was calculated with step-by-step formula and official source links.',
    color: '#008F68',
  },
  {
    icon: <MapPin size={22} />,
    title: 'State-Aware Rules',
    desc: 'Certain taxes like petrol & diesel depend on your state. Jagruk Raho applies the right state-specific rule.',
    color: '#E8721A',
  },
  {
    icon: <FileText size={22} />,
    title: 'Official Sources',
    desc: 'Every tax rule is backed by CBIC GST Notifications, PPAC Bulletins, or authoritative government sources.',
    color: '#008F68',
  },
  {
    icon: <Clock size={22} />,
    title: 'Expense History',
    desc: 'Track your estimated tax footprint over time — daily, weekly, monthly, and yearly aggregates.',
    color: '#008F68',
  },
  {
    icon: <Sparkles size={22} />,
    title: 'Smart Expense Entry',
    desc: 'Enter expenses naturally using AI-assisted classification. Say it in Hindi, English, or Hinglish.',
    color: '#E8721A',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" style={{ background: '#FAF7F2', padding: '80px 0' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="section-badge mb-4" style={{ margin: '0 auto 16px' }}>
            <ShieldCheck size={13} />
            Features
          </div>
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 800,
              color: '#1A2340',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              marginBottom: 12,
            }}
          >
            Know Where Your Money Goes
          </h2>
          <p style={{ color: '#718096', fontSize: 16, maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            Jagruk Raho gives you complete visibility into the indirect taxes embedded in your everyday purchases.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="feature-card"
              style={{ borderRadius: 16, padding: '28px', background: 'white', border: '1px solid rgba(0,143,104,0.1)', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', transition: 'all 0.25s ease', cursor: 'default' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 40px rgba(0,143,104,0.12)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.06)';
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: f.color === '#008F68' ? 'rgba(0,143,104,0.1)' : 'rgba(232,114,26,0.1)', color: f.color }}
              >
                {f.icon}
              </div>
              <h3 style={{ fontWeight: 700, fontSize: 16, color: '#1A2340', marginBottom: 8, lineHeight: 1.3 }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 14, color: '#718096', lineHeight: 1.7 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
