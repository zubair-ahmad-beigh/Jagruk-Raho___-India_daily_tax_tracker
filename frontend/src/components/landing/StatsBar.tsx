'use client';

import { Users, BarChart2, Shield, Heart } from 'lucide-react';

const stats = [
  {
    icon: <Users size={22} style={{ color: '#008F68' }} />,
    value: '1,00,000+',
    label: 'People Tracking',
  },
  {
    icon: <BarChart2 size={22} style={{ color: '#008F68' }} />,
    value: '₹12 Cr+',
    label: 'Estimated Tax Tracked',
  },
  {
    icon: <Shield size={22} style={{ color: '#008F68' }} />,
    value: '20+',
    label: 'Product Categories',
  },
  {
    icon: <Heart size={22} style={{ color: '#E8721A' }} />,
    value: 'A More Aware',
    label: 'India',
  },
];

export function StatsBar() {
  return (
    <section style={{ background: 'white', borderTop: '1px solid rgba(0,143,104,0.1)', borderBottom: '1px solid rgba(0,143,104,0.1)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: i === 3 ? 'rgba(232,114,26,0.1)' : 'rgba(0,143,104,0.1)' }}
              >
                {stat.icon}
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: '#1A2340', lineHeight: 1.2 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 12, color: '#718096', lineHeight: 1.3 }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4" style={{ fontSize: 12, color: '#A0AEC0', letterSpacing: '0.08em', fontStyle: 'italic' }}>
          — Our purchases build a stronger nation —
        </div>
      </div>
    </section>
  );
}
