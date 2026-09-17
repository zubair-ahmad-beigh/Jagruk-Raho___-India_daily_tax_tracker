'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, PlusCircle, PieChart, History, ShieldCheck } from 'lucide-react';

interface BottomNavProps {
  onOpenAddModal: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ onOpenAddModal }) => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/dashboard', icon: Home },
    { label: 'Insights', href: '/insights', icon: PieChart },
    { label: 'History', href: '/history', icon: History },
    { label: 'Trust', href: '/trust', icon: ShieldCheck },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/90 backdrop-blur-xl border-t border-slate-800/80 px-4 py-2 sm:hidden">
      <div className="flex items-center justify-around">
        
        {/* Home */}
        <Link
          href="/dashboard"
          className={`flex flex-col items-center space-y-1 text-[11px] font-medium transition-colors ${
            pathname === '/dashboard' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>

        {/* Insights */}
        <Link
          href="/insights"
          className={`flex flex-col items-center space-y-1 text-[11px] font-medium transition-colors ${
            pathname === '/insights' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <PieChart className="w-5 h-5" />
          <span>Insights</span>
        </Link>

        {/* Center Prominent Add Button */}
        <button
          onClick={onOpenAddModal}
          className="flex flex-col items-center -mt-6 group focus:outline-none"
        >
          <div className="w-12 h-12 rounded-full btn-emerald-glow flex items-center justify-center text-white shadow-xl shadow-emerald-950/80 border-2 border-slate-900 group-active:scale-95 transition-transform">
            <PlusCircle className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-bold text-emerald-400 mt-0.5">Add</span>
        </button>

        {/* History */}
        <Link
          href="/history"
          className={`flex flex-col items-center space-y-1 text-[11px] font-medium transition-colors ${
            pathname === '/history' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <History className="w-5 h-5" />
          <span>History</span>
        </Link>

        {/* Trust */}
        <Link
          href="/trust"
          className={`flex flex-col items-center space-y-1 text-[11px] font-medium transition-colors ${
            pathname === '/trust' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-5 h-5" />
          <span>Trust</span>
        </Link>

      </div>
    </nav>
  );
};
