'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { BottomNav } from '@/components/bottom-nav';
import { AddExpenseModal } from '@/components/add-expense-modal';
import { TaxExplainModal } from '@/components/tax-explain-modal';
import { Calendar, ChevronRight, History } from 'lucide-react';

export default function HistoryPage() {
  const [userState, setUserState] = useState('Karnataka');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'today' | 'week' | 'month' | 'year'>('month');
  const [selectedExpense, setSelectedExpense] = useState<any>(null);

  const historyEntries = [
    {
      date: '17 Sep 2026',
      totalSpending: 53300.00,
      taxAmount: 8117.12,
      count: 2,
      items: [
        {
          description: 'Samsung Mobile Phone',
          amount: 50000.00,
          categoryName: 'Mobile Phone',
          categoryId: 'mobile_phone',
          state: 'Karnataka',
          taxResult: { taxType: 'GST', effectiveRate: 18.00, taxAmount: 7627.12 }
        },
        {
          description: 'Petrol Fill',
          amount: 1000.00,
          categoryName: 'Petrol (Motor Spirit)',
          categoryId: 'petrol',
          state: 'Karnataka',
          taxResult: { taxType: 'EXCISE_VAT', effectiveRate: 41.50, taxAmount: 415.00 }
        }
      ]
    },
    {
      date: '16 Sep 2026',
      totalSpending: 4200.00,
      taxAmount: 512.00,
      count: 3,
      items: [
        {
          description: 'Dinner at Rameshwaram Cafe',
          amount: 1200.00,
          categoryName: 'Restaurant',
          categoryId: 'restaurant',
          state: 'Karnataka',
          taxResult: { taxType: 'GST', effectiveRate: 5.00, taxAmount: 57.14 }
        },
        {
          description: 'Allen Solly Shirt',
          amount: 2500.00,
          categoryName: 'Clothing',
          categoryId: 'clothing',
          state: 'Karnataka',
          taxResult: { taxType: 'GST', effectiveRate: 12.00, taxAmount: 267.85 }
        }
      ]
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight flex items-center space-x-2">
              <History className="w-6 h-6 text-emerald-400" />
              <span>Tax History Log</span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">Historical spending and estimated tax footprint</p>
          </div>

          {/* Timeframe Filter Buttons */}
          <div className="flex p-1 bg-slate-900 rounded-xl border border-slate-800 self-start sm:self-auto">
            {(['today', 'week', 'month', 'year'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTimeframe(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                  selectedTimeframe === t
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* History Group Cards */}
        <div className="space-y-4">
          {historyEntries.map((group, gIdx) => (
            <div key={gIdx} className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
              
              {/* Group Header */}
              <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-bold text-slate-100">{group.date}</span>
                  <span className="text-xs text-slate-400">({group.count} expenses)</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Est. Tax</span>
                  <span className="text-sm font-mono font-extrabold text-emerald-400">
                    ₹{group.taxAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Group Items */}
              <div className="divide-y divide-slate-800/60">
                {group.items.map((item, iIdx) => (
                  <div
                    key={iIdx}
                    onClick={() => setSelectedExpense(item)}
                    className="p-3.5 px-4 flex items-center justify-between hover:bg-slate-800/40 transition-colors cursor-pointer group"
                  >
                    <div>
                      <h5 className="text-xs font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">
                        {item.description}
                      </h5>
                      <span className="text-[11px] text-slate-400">{item.categoryName}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-slate-200 block">
                        ₹{item.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center justify-end">
                        <span>Tax ₹{item.taxResult.taxAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                        <ChevronRight className="w-3 h-3 ml-0.5 opacity-60" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </main>

      <BottomNav onOpenAddModal={() => setIsAddModalOpen(true)} />

      <AddExpenseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        userState={userState}
        onExpenseAdded={() => {}}
      />

      <TaxExplainModal
        isOpen={!!selectedExpense}
        onClose={() => setSelectedExpense(null)}
        expense={selectedExpense}
      />

    </div>
  );
}
