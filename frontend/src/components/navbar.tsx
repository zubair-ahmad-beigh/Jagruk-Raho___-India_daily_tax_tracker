'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, MapPin, Sparkles } from 'lucide-react';

interface NavbarProps {
  userState: string;
  setUserState: (state: string) => void;
  onOpenAddModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ userState, setUserState, onOpenAddModal }) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-card border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Tagline */}
        <Link href="/dashboard" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-amber-500 p-0.5 shadow-lg shadow-emerald-950/40">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <span className="text-xl font-bold">🇮🇳</span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400 bg-clip-text text-transparent">
                Jagruk Raho
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 rounded">
                ESTIMATE
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-400 tracking-wide hidden sm:block">
              Har Kharch Ka Tax Jaano
            </p>
          </div>
        </Link>

        {/* State Picker & Action */}
        <div className="flex items-center space-x-3">
          {/* State Selector */}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <select
              value={userState}
              onChange={(e) => setUserState(e.target.value)}
              className="bg-transparent font-medium text-slate-200 outline-none cursor-pointer"
            >
              <option value="Karnataka" className="bg-slate-900 text-white">Karnataka</option>
              <option value="Maharashtra" className="bg-slate-900 text-white">Maharashtra</option>
              <option value="Delhi" className="bg-slate-900 text-white">Delhi</option>
              <option value="Tamil Nadu" className="bg-slate-900 text-white">Tamil Nadu</option>
              <option value="Uttar Pradesh" className="bg-slate-900 text-white">Uttar Pradesh</option>
            </select>
          </div>

          {/* + Add Expense CTA (Desktop) */}
          <button
            onClick={onOpenAddModal}
            className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-xl btn-emerald-glow text-xs font-semibold text-white"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>+ Add Expense</span>
          </button>
        </div>

      </div>
    </header>
  );
};
