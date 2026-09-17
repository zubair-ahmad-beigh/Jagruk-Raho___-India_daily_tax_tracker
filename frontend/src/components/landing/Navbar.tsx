'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sun, Moon, Menu, X } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(16px)',
        borderBottom: scrolled ? '1px solid rgba(0,143,104,0.12)' : '1px solid transparent',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">
          
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-white shrink-0 group-hover:scale-105 transition-transform"
              style={{ background: 'linear-gradient(135deg, #008F68, #006B4F)' }}
            >
              JR
            </div>
            <div>
              <div className="font-bold text-[15px] leading-tight" style={{ color: '#1A2340' }}>
                Jagruk Raho
              </div>
              <div className="text-[10px] font-medium leading-tight" style={{ color: '#008F68' }}>
                Har Kharch Ka Tax Jaano
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link"
                style={{ color: '#2D3748', fontSize: '14px', fontWeight: 500 }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-gray-100"
              style={{ color: '#2D3748' }}
            >
              {darkMode ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <Link
              href="/dashboard"
              className="text-sm font-semibold px-5 py-2.5 rounded-lg transition-all"
              style={{ color: '#1A2340', border: '1.5px solid rgba(26,35,64,0.2)' }}
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-bold px-5 py-2.5 rounded-lg text-white transition-all hover:shadow-green-lg"
              style={{ background: '#008F68', boxShadow: '0 4px 16px rgba(0,143,104,0.3)' }}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: '#1A2340' }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-5 bg-white border-t" style={{ borderColor: 'rgba(0,143,104,0.1)' }}>
          <div className="flex flex-col gap-1 pt-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 px-3 rounded-lg text-sm font-medium transition-colors hover:bg-green-50"
                style={{ color: '#1A2340' }}
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-2 mt-3 pt-3 border-t" style={{ borderColor: 'rgba(0,0,0,0.08)' }}>
              <Link href="/dashboard" className="flex-1 text-center text-sm font-semibold py-2.5 rounded-lg border" style={{ borderColor: 'rgba(26,35,64,0.2)', color: '#1A2340' }}>
                Sign In
              </Link>
              <Link href="/dashboard" className="flex-1 text-center text-sm font-bold py-2.5 rounded-lg text-white" style={{ background: '#008F68' }}>
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
