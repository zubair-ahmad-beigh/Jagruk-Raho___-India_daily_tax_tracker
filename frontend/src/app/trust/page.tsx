'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { BottomNav } from '@/components/bottom-nav';
import { AddExpenseModal } from '@/components/add-expense-modal';
import { ShieldCheck, ExternalLink, CheckCircle2, FileText, AlertTriangle } from 'lucide-react';

export default function TrustPage() {
  const [userState, setUserState] = useState('Karnataka');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const sources = [
    {
      title: 'CBIC Notification No. 03/2020-Central Tax (Rate)',
      category: 'Mobile Phones & Accessories',
      ref: 'CBIC-190354/145/2020-TO(TRU-II)',
      rate: '18% GST',
      url: 'https://cbic-gst.gov.in/pdf/central-tax-rate/notfn-03-2020-cgst-rate.pdf',
      retrieved: '15 Jan 2026',
      notes: 'Standardized rate across all mobile handsets regardless of price.'
    },
    {
      title: 'CBIC GST Rate Schedule (Chapter 84)',
      category: 'Laptops, Computers & Peripherals',
      ref: 'CBIC-GOODS-2017',
      rate: '18% GST',
      url: 'https://cbic-gst.gov.in/gst-goods-service-rates.html',
      retrieved: '15 Jan 2026',
      notes: 'Computers, laptops, and IT hard drives.'
    },
    {
      title: 'CBIC Notification No. 14/2021-Central Tax (Rate)',
      category: 'Clothing & Apparel',
      ref: 'CBIC-190354/220/2021',
      rate: '5% (<= ₹1000) / 12% (> ₹1000)',
      url: 'https://cbic-gst.gov.in/pdf/central-tax-rate/notfn-14-2021-cgst-rate.pdf',
      retrieved: '15 Jan 2026',
      notes: 'Tiered amount threshold rule.'
    },
    {
      title: 'CBIC Notification No. 46/2017-Central Tax (Rate)',
      category: 'Restaurant Services',
      ref: 'CBIC-354/173/2017-TRU',
      rate: '5% GST (No ITC)',
      url: 'https://cbic-gst.gov.in/pdf/central-tax-rate/notfn-46-2017-cgst-rate.pdf',
      retrieved: '15 Jan 2026',
      notes: 'Applies to standalone restaurants & dining outlets.'
    },
    {
      title: 'PPAC & State Commercial Tax Notifications',
      category: 'Petrol & Diesel Fuel',
      ref: 'PPAC-KA-2026-01',
      rate: 'Central Excise ₹19.90/L + State VAT (~25.92%)',
      url: 'https://www.ppac.gov.in',
      retrieved: '15 Jan 2026',
      notes: 'Petroleum products remain under Excise + State Sales Tax (Non-GST Art. 279A).'
    }
  ];

  return (
    <div className="min-h-screen dark-heritage-bg text-slate-100 flex flex-col pb-24 sm:pb-8 font-sans">
      
      <Navbar
        userState={userState}
        setUserState={setUserState}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 w-full pt-6 space-y-6">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs font-bold text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Transparent by Design</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Official Source Registry
          </h1>
          <p className="text-xs text-slate-400">
            Every tax calculation in Jagruk Raho is strictly backed by verified CBIC GST Notifications or PPAC bulletins stored in PostgreSQL.
          </p>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-4 rounded-xl glass-card border border-amber-500/30 bg-amber-950/20 flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 space-y-1">
            <span className="font-bold text-amber-300 block">Important Notice</span>
            <p>
              Jagruk Raho is an independent consumer tax awareness and tracking platform. It is <strong>NOT</strong> an official Government of India application, nor an income tax filing portal. Calculations represent estimated indirect tax contributions included in retail prices.
            </p>
          </div>
        </div>

        {/* Source Cards */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Verified Tax Source Index ({sources.length})
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {sources.map((src, idx) => (
              <div key={idx} className="p-4 glass-card rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                      {src.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-100 mt-0.5">{src.title}</h4>
                    <span className="text-[11px] text-slate-400 font-mono block">Ref: {src.ref}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                    {src.rate}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                  {src.notes}
                </p>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[11px] text-slate-500">Retrieved: {src.retrieved}</span>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1 text-amber-400 hover:underline font-semibold"
                  >
                    <span>View Official Government Document</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      <BottomNav onOpenAddModal={() => setIsAddModalOpen(true)} />

      <AddExpenseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        userState={userState}
        onExpenseAdded={() => {}}
      />

    </div>
  );
}
