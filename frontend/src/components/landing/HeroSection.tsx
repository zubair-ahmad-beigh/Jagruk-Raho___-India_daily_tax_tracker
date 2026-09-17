'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, ShieldCheck, BarChart2, Users } from 'lucide-react';

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const trustBadges = [
    { icon: <ShieldCheck size={18} style={{ color: '#008F68' }} />, title: 'Official Source Based', subtitle: 'Government data' },
    { icon: <BarChart2 size={18} style={{ color: '#008F68' }} />, title: 'Transparent Calculations', subtitle: 'Know the details' },
    { icon: <Users size={18} style={{ color: '#008F68' }} />, title: 'For a More Aware India', subtitle: 'You spend. You contribute.' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden heritage-bg"
      style={{ paddingTop: '68px' }}
    >
      {/* Overlay to ensure text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(250,247,242,0.6) 0%, rgba(250,247,242,0.55) 40%, rgba(250,247,242,0.7) 80%, rgba(250,247,242,0.92) 100%)',
          zIndex: 1,
        }}
      />

      {/* Large ₹ watermark */}
      <div
        className="rupee-watermark absolute"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}
      >
        ₹
      </div>

      {/* Floating Quote decorations — left */}
      <div
        className="hidden lg:block absolute left-8 top-[30%] max-w-[160px] font-handwriting"
        style={{ fontFamily: "'Kalam', cursive", color: '#5A6A7E', opacity: 0.65, zIndex: 2, lineHeight: 1.5 }}
      >
        <div style={{ fontSize: 16, fontWeight: 400, fontStyle: 'italic' }}>
          &quot;Be the change<br />you wish to<br />see in the world.&quot;
        </div>
        <div style={{ fontSize: 12, marginTop: 6, color: '#008F68', fontWeight: 600 }}>– Mahatma Gandhi</div>
      </div>

      {/* Floating Quote decorations — right */}
      <div
        className="hidden lg:block absolute right-6 top-[28%] max-w-[180px] font-handwriting text-right"
        style={{ fontFamily: "'Kalam', cursive", color: '#5A6A7E', opacity: 0.65, zIndex: 2, lineHeight: 1.5 }}
      >
        <div style={{ fontSize: 16, fontWeight: 400, fontStyle: 'italic' }}>
          &quot;Give me blood,<br />and I will give<br />you freedom.&quot;
        </div>
        <div style={{ fontSize: 12, marginTop: 6, color: '#E8721A', fontWeight: 600 }}>– Netaji Subhas Chandra Bose</div>
      </div>

      {/* Bottom-left quote */}
      <div
        className="hidden lg:block absolute left-12 bottom-[22%] font-handwriting"
        style={{ fontFamily: "'Kalam', cursive", color: '#5A6A7E', opacity: 0.6, zIndex: 2, lineHeight: 1.5 }}
      >
        <div style={{ fontSize: 15, fontStyle: 'italic' }}>
          &quot;Inquilab<br />Zindabad&quot;
        </div>
        <div style={{ fontSize: 11, marginTop: 4, color: '#008F68', fontWeight: 600 }}>– Bhagat Singh</div>
      </div>

      {/* Bottom-right quote */}
      <div
        className="hidden lg:block absolute right-10 bottom-[24%] font-handwriting text-right"
        style={{ fontFamily: "'Kalam', cursive", color: '#5A6A7E', opacity: 0.6, zIndex: 2, lineHeight: 1.5 }}
      >
        <div style={{ fontSize: 15, fontStyle: 'italic' }}>
          &quot;Unity<br />is Strength.&quot;
        </div>
        <div style={{ fontSize: 11, marginTop: 4, color: '#E8721A', fontWeight: 600 }}>– Sardar Vallabhbhai Patel</div>
      </div>

      {/* Main Hero Content */}
      <div
        className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center"
        style={{ zIndex: 10, paddingTop: '48px', paddingBottom: '32px' }}
      >
        {/* Top Badge */}
        <div
          className={`inline-flex items-center gap-2 mb-6 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={{
            background: 'rgba(0,143,104,0.1)',
            border: '1px solid rgba(0,143,104,0.25)',
            color: '#008F68',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            borderRadius: '100px',
            padding: '7px 16px',
          }}
        >
          <BarChart2 size={13} />
          India&apos;s Tax Awareness Platform
        </div>

        {/* Main Heading */}
        <h1
          className={`font-black leading-none mb-4 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(48px, 8vw, 88px)',
            color: '#1A2340',
            letterSpacing: '-0.03em',
            lineHeight: 1.0,
          }}
        >
          Har Kharch Ka{' '}
          <br />
          <span style={{ color: '#008F68' }}>Tax Jaano</span>
        </h1>

        {/* Supporting Text */}
        <p
          className={`mb-8 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{
            color: '#4A5568',
            fontSize: 'clamp(15px, 2vw, 18px)',
            lineHeight: 1.7,
            maxWidth: '560px',
            margin: '0 auto 32px',
          }}
        >
          Understand the estimated tax hidden in your everyday spending —{' '}
          from mobile phones and laptops to dining and petrol.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-3 mb-12 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <Link
            href="/dashboard"
            className="btn-primary text-[15px] font-bold w-full sm:w-auto justify-center"
          >
            Start Tracking Today <ArrowRight size={16} />
          </Link>
          <a
            href="#how-it-works"
            className="btn-secondary text-[15px] w-full sm:w-auto justify-center"
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(26,35,64,0.08)' }}
            >
              <Play size={10} fill="currentColor" />
            </div>
            See How It Works
          </a>
        </div>

        {/* Trust Badges Row */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 transition-all duration-700 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          {trustBadges.map((badge, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'rgba(0,143,104,0.1)' }}
              >
                {badge.icon}
              </div>
              <div className="text-left">
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1A2340', lineHeight: 1.2 }}>{badge.title}</div>
                <div style={{ fontSize: 11, color: '#718096', lineHeight: 1.2 }}>{badge.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <div
          className="w-px h-8 animate-bounce"
          style={{ background: 'linear-gradient(to bottom, transparent, #008F68)' }}
        />
      </div>
    </section>
  );
}
