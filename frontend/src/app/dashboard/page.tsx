'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/navbar';
import { BottomNav } from '@/components/bottom-nav';
import { AddExpenseModal } from '@/components/add-expense-modal';
import { TaxExplainModal } from '@/components/tax-explain-modal';
import { Plus, Calculator, ChevronRight, TrendingUp, Sparkles, AlertCircle } from 'lucide-react';

export default function DashboardPage() {
  const [userState, setUserState] = useState('Karnataka');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<any>(null);

  const [todaySummary, setTodaySummary] = useState({
    totalSpending: 53300.00,
    totalEstimatedTax: 8117.12,
    expenseCount: 2,
    breakdown: [
      { taxType: 'GST', amount: 7857.12, percentage: 96.8 },
      { taxType: 'EXCISE_VAT', amount: 260.00, percentage: 3.2 }
    ]
  });

  const [expenses, setExpenses] = useState([
    {
      expenseId: 'e1',
      description: 'Samsung Mobile Phone',
      categoryId: 'mobile_phone',
      categoryName: 'Mobile Phone',
      amount: 50000.00,
      state: 'Karnataka',
      expenseDate: '2026-09-17',
      taxResult: {
        taxType: 'GST',
        effectiveRate: 18.00,
        taxAmount: 7627.12,
        formulaExplained: '₹50,000.00 × 18 / 118',
        status: 'ESTIMATED',
        components: [
          { name: 'CGST', rateDisplay: '9.00%', amount: 3813.56 },
          { name: 'SGST', rateDisplay: '9.00%', amount: 3813.56 }
        ],
        source: {
          name: 'CBIC Notification No. 03/2020-Central Tax (Rate)',
          url: 'https://cbic-gst.gov.in/pdf/central-tax-rate/notfn-03-2020-cgst-rate.pdf',
          referenceNumber: 'CBIC-190354/145/2020'
        }
      }
    },
    {
      expenseId: 'e2',
      description: 'Petrol Fill (Toyota Glanza)',
      categoryId: 'petrol',
      categoryName: 'Petrol (Motor Spirit)',
      amount: 1000.00,
      state: 'Karnataka',
      expenseDate: '2026-09-17',
      taxResult: {
        taxType: 'EXCISE_VAT',
        effectiveRate: 41.50,
        taxAmount: 415.00,
        formulaExplained: 'Central Excise (₹19.90/L) + Karnataka VAT (25.92%)',
        status: 'ESTIMATED',
        components: [
          { name: 'CENTRAL_EXCISE', rateDisplay: '₹19.90 / L', amount: 193.43 },
          { name: 'KARNATAKA_VAT', rateDisplay: '25.92%', amount: 221.57 }
        ],
        source: {
          name: 'PPAC & Karnataka Commercial Tax Department Bulletin',
          url: 'https://www.ppac.gov.in',
          referenceNumber: 'PPAC-KA-2026'
        }
      }
    }
  ]);

  const fetchDashboardData = async () => {
    try {
      const summaryRes = await fetch('/api/tax/today');
      if (summaryRes.ok) {
        const summaryData = await summaryRes.json();
        setTodaySummary(summaryData);
      }
      const expensesRes = await fetch('/api/expenses');
      if (expensesRes.ok) {
        const expensesData = await expensesRes.json();
        if (expensesData.length > 0) {
          setExpenses(expensesData);
        }
      }
    } catch (err) {
      console.warn('Backend API connection warning, presenting demo state:', err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [userState]);

  const handleExpenseAdded = (newExpenseResponse: any) => {
    setExpenses([newExpenseResponse, ...expenses]);
    fetchDashboardData();
  };

  return (
    <div className="min-h-screen dark-heritage-bg text-slate-100 flex flex-col pb-24 sm:pb-8 font-sans">
      
      <Navbar
        userState={userState}
        setUserState={setUserState}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 w-full pt-6 space-y-6">
        
        {/* Header Greeting */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
              Good morning 👋
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">Here is your estimated indirect tax breakdown for today</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="md:hidden flex items-center space-x-1.5 px-3 py-1.5 rounded-lg btn-emerald-glow text-xs font-semibold text-white shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>

        {/* Hero Tax Footprint Card */}
        <div className="relative overflow-hidden rounded-2xl glass-card border border-emerald-500/30 p-6 sm:p-8 shadow-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Today&apos;s Tax Footprint</span>
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-950/90 text-emerald-300 border border-emerald-500/30">
              State: {userState}
            </span>
          </div>

          {/* Large Estimated Tax Number */}
          <div className="my-4">
            <span className="text-4xl sm:text-5xl font-mono font-extrabold text-slate-100 tracking-tight">
              ₹{todaySummary.totalEstimatedTax?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
            <p className="text-xs text-slate-400 mt-1">Estimated indirect tax included in today&apos;s spending</p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
            <div>
              <span className="text-xs text-slate-400 block">Total Spending</span>
              <span className="text-lg font-mono font-bold text-slate-200">
                ₹{todaySummary.totalSpending?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block">Expenses Logged</span>
              <span className="text-lg font-mono font-bold text-slate-200">
                {todaySummary.expenseCount || expenses.length}
              </span>
            </div>
          </div>
        </div>

        {/* Category Tax Breakdown Progress Bars */}
        <div className="glass-card rounded-2xl border border-slate-800 p-5 space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Today&apos;s Tax Breakdown
          </h3>

          <div className="space-y-3">
            {todaySummary.breakdown.map((item: any, idx: number) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300">{item.taxType}</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    ₹{item.amount?.toLocaleString('en-IN', { minimumFractionDigits: 2 })} ({item.percentage?.toFixed(1)}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(item.percentage || 50, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Expense List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-200">Today&apos;s Expenses</h3>
            <span className="text-xs text-slate-400">{expenses.length} recorded</span>
          </div>

          {expenses.length === 0 ? (
            <div className="p-8 text-center glass-card rounded-2xl border border-slate-800">
              <Calculator className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-300">No expenses recorded today.</p>
              <p className="text-xs text-slate-500 mt-1">Your tax story starts with your first expense.</p>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="mt-4 px-4 py-2 rounded-xl btn-emerald-glow text-xs font-bold text-white inline-flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Add Expense</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {expenses.map((exp: any, idx: number) => {
                const taxRes = exp.taxResult || {};
                return (
                  <div
                    key={exp.expenseId || idx}
                    onClick={() => setSelectedExpense(exp)}
                    className="p-4 glass-card glass-card-hover rounded-xl border border-slate-800/80 flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-lg shrink-0">
                        {exp.categoryId === 'petrol' ? '⛽' : exp.categoryId === 'mobile_phone' ? '📱' : '🛒'}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-slate-100 truncate group-hover:text-emerald-400 transition-colors">
                          {exp.description}
                        </h4>
                        <div className="flex items-center space-x-2 mt-0.5">
                          <span className="text-[11px] text-slate-400">{exp.categoryName || exp.categoryId}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 font-semibold">
                            {taxRes.taxType || 'GST'} @ {taxRes.effectiveRate || 18}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-sm font-mono font-extrabold text-slate-100 block">
                        ₹{exp.amount?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </span>
                      <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center justify-end space-x-1">
                        <span>Est. Tax ₹{taxRes.taxAmount?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </main>

      {/* Navigation */}
      <BottomNav onOpenAddModal={() => setIsAddModalOpen(true)} />

      {/* Modals */}
      <AddExpenseModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        userState={userState}
        onExpenseAdded={handleExpenseAdded}
      />

      <TaxExplainModal
        isOpen={!!selectedExpense}
        onClose={() => setSelectedExpense(null)}
        expense={selectedExpense}
      />

    </div>
  );
}
