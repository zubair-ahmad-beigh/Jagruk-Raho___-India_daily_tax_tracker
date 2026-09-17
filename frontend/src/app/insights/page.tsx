'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { BottomNav } from '@/components/bottom-nav';
import { AddExpenseModal } from '@/components/add-expense-modal';
import { PieChart, TrendingUp, BarChart3, Tag, ArrowUpRight } from 'lucide-react';

export default function InsightsPage() {
  const [userState, setUserState] = useState('Karnataka');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const monthSummary = {
    month: 'September 2026',
    totalSpending: 57500.00,
    estimatedTax: 8629.12,
    totalExpenses: 5,
    taxPercentage: 15.01
  };

  const categoryDistribution = [
    { category: 'Electronics & Mobile', spending: 50000.00, tax: 7627.12, percentage: '88.4%' },
    { category: 'Fuel (Petrol/Diesel)', spending: 1000.00, tax: 415.00, percentage: '4.8%' },
    { category: 'Clothing & Apparel', spending: 2500.00, tax: 267.85, percentage: '3.1%' },
    { category: 'Restaurant & Dining', spending: 4000.00, tax: 319.15, percentage: '3.7%' },
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
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight flex items-center space-x-2">
            <PieChart className="w-6 h-6 text-emerald-400" />
            <span>Tax Insights & Analytics</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Where is your estimated tax coming from?</p>
        </div>

        {/* Monthly Summary Hero Card */}
        <div className="glass-card rounded-2xl border border-slate-800 p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <span className="text-xs text-slate-400 block">{monthSummary.month} Spending</span>
            <span className="text-2xl font-mono font-extrabold text-slate-100">
              ₹{monthSummary.totalSpending.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Total Est. Tax</span>
            <span className="text-2xl font-mono font-extrabold text-emerald-400">
              ₹{monthSummary.estimatedTax.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block">Avg. Effective Tax Rate</span>
            <span className="text-2xl font-mono font-extrabold text-amber-400">
              {monthSummary.taxPercentage}%
            </span>
          </div>
        </div>

        {/* Category Breakdown Table */}
        <div className="glass-card rounded-2xl border border-slate-800 p-5 space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
            <Tag className="w-4 h-4 text-emerald-400" />
            <span>Tax Contribution by Category</span>
          </h3>

          <div className="space-y-3">
            {categoryDistribution.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">{item.category}</span>
                  <span className="font-mono text-emerald-400 font-extrabold">
                    Est. Tax ₹{item.tax.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Spending: ₹{item.spending.toLocaleString('en-IN')}</span>
                  <span>{item.percentage} of total tax</span>
                </div>

                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: item.percentage }}
                  ></div>
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
