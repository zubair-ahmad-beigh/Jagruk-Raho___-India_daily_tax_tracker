'use client';

import Link from 'next/link';

const footerLinks = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'History', href: '/history' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Use', href: '#' },
    { label: 'Disclaimer', href: '#' },
    { label: 'Contact', href: '#contact' },
  ],
  Sources: [
    { label: 'CBIC GST Portal', href: 'https://cbic-gst.gov.in', external: true },
    { label: 'PPAC Petroleum', href: 'https://ppac.gov.in', external: true },
    { label: 'Tax Sources', href: '/trust' },
  ],
};

export function Footer() {
  return (
    <footer style={{ background: '#1A2340', color: 'rgba(255,255,255,0.7)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-white shrink-0"
                style={{ background: 'linear-gradient(135deg, #008F68, #006B4F)' }}
              >
                JR
              </div>
              <div>
                <div className="font-bold text-[15px] text-white">Jagruk Raho</div>
                <div style={{ fontSize: 11, color: '#00B87A' }}>Har Kharch Ka Tax Jaano</div>
              </div>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 220 }}>
              India&apos;s consumer tax-awareness platform. Understand the estimated tax in every purchase.
            </p>
            <div style={{ marginTop: 16, fontSize: 20 }}>🇮🇳</div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 style={{ fontWeight: 700, fontSize: 13, color: 'white', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 14 }}>
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {(link as any).external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', transition: 'color 0.2s' }}
                        onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#00B87A'; }}
                        onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.55)'; }}
                      >
                        {link.label} ↗
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', transition: 'color 0.2s' }}
                        onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#00B87A'; }}
                        onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.55)'; }}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, maxWidth: 600 }}>
            Jagruk Raho is an informational tax-awareness application and is <strong style={{ color: 'rgba(255,255,255,0.6)' }}>not a Government of India application</strong>. Tax estimates are based on official sources but may not reflect actual tax remitted.
          </p>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', shrink: 0 }} className="shrink-0">
            © 2026 Jagruk Raho 🇮🇳
          </div>
        </div>
      </div>
    </footer>
  );
}
