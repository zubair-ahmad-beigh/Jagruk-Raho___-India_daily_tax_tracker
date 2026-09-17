import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jagruk Raho 🇮🇳 — Har Kharch Ka Tax Jaano',
  description: 'Understand the estimated tax hidden in your everyday consumer spending. India\'s premier tax-awareness platform backed by official CBIC & PPAC sources.',
  keywords: 'India tax awareness, GST calculator, consumer tax, indirect tax, CBIC GST, petrol tax India',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=Kalam:wght@300;400;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ backgroundColor: '#FAF7F2', color: '#1A2340' }}>
        {children}
      </body>
    </html>
  );
}
