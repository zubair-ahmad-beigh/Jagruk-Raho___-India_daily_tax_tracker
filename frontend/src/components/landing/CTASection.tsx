'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section
      style={{ padding: '80px 0', background: '#FAF7F2' }}
      id="contact"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div
          className="rounded-3xl px-8 py-14 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #008F68 0%, #006B4F 50%, #004F38 100%)',
            boxShadow: '0 24px 80px rgba(0,143,104,0.35)',
          }}
        >
          {/* Decorative elements */}
          <div
            style={{
              position: 'absolute', top: -40, right: -40,
              width: 200, height: 200, borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
            }}
          />
          <div
            style={{
              position: 'absolute', bottom: -60, left: -60,
              width: 250, height: 250, borderRadius: '50%',
              background: 'rgba(255,255,255,0.04)',
            }}
          />

          {/* Large ₹ watermark */}
          <div
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: 300, fontWeight: 900, color: 'rgba(255,255,255,0.04)',
              lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
            }}
          >
            ₹
          </div>

          <div className="relative z-10">
            <div
              style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.25)',
                color: 'rgba(255,255,255,0.9)',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderRadius: 100,
                padding: '6px 16px',
                marginBottom: 20,
              }}
            >
              🇮🇳 Jagruk Raho
            </div>

            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(30px, 5vw, 50px)',
                fontWeight: 900,
                color: 'white',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: 16,
              }}
            >
              Start Understanding Your{' '}
              <span style={{ color: '#90EDD4' }}>Everyday Tax</span>
            </h2>
            <p
              style={{
                color: 'rgba(255,255,255,0.75)',
                fontSize: 16,
                lineHeight: 1.7,
                maxWidth: 480,
                margin: '0 auto 32px',
              }}
            >
              Jagruk Raho helps you understand the estimated indirect tax hidden in your everyday consumer spending.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 font-bold text-[15px] px-7 py-3.5 rounded-xl transition-all"
                style={{
                  background: 'white',
                  color: '#008F68',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                  width: 'auto',
                }}
              >
                Start Tracking <ArrowRight size={16} />
              </Link>
              <Link
                href="/trust"
                className="flex items-center gap-2 font-semibold text-[15px] px-6 py-3.5 rounded-xl transition-all"
                style={{
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.85)',
                  border: '1.5px solid rgba(255,255,255,0.3)',
                }}
              >
                Learn About Our Sources
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
