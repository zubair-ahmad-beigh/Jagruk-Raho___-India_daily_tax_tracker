'use client';

import React, { useState } from 'react';
import { X, Sparkles, ShoppingBag, ArrowRight, Loader2, Calendar, MapPin, Tag } from 'lucide-react';

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  userState: string;
  onExpenseAdded: (newExpense: any) => void;
}

export const AddExpenseModal: React.FC<AddExpenseModalProps> = ({
  isOpen,
  onClose,
  userState,
  onExpenseAdded
}) => {
  const [activeTab, setActiveTab] = useState<'ai' | 'form'>('ai');
  const [naturalText, setNaturalText] = useState('');
  const [isParsing, setIsParsing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields
  const [categoryId, setCategoryId] = useState('mobile_phone');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedState, setSelectedState] = useState(userState);

  if (!isOpen) return null;

  const categories = [
    { id: 'mobile_phone', name: 'Mobile Phone', icon: '📱' },
    { id: 'laptop', name: 'Laptops & PCs', icon: '💻' },
    { id: 'electronics', name: 'Televisions & Audio', icon: '📺' },
    { id: 'clothing', name: 'Clothing & Apparel', icon: '👕' },
    { id: 'restaurant', name: 'Restaurant Dining', icon: '🍽️' },
    { id: 'grocery', name: 'Grocery & Food Grains', icon: '🛒' },
    { id: 'packaged_food', name: 'Packaged Food & Snacks', icon: '🍪' },
    { id: 'petrol', name: 'Petrol Fuel', icon: '⛽' },
    { id: 'diesel', name: 'Diesel Fuel', icon: '🚛' },
    { id: 'cng', name: 'CNG Fuel', icon: '⚡' },
    { id: 'lpg', name: 'Domestic LPG', icon: '🔥' },
    { id: 'online_subscription', name: 'Online Subscriptions', icon: '🌐' },
    { id: 'cab_service', name: 'Cab Services (Uber/Ola)', icon: '🚗' },
  ];

  const handleParseAi = async () => {
    if (!naturalText.trim()) return;
    setIsParsing(true);
    try {
      const res = await fetch('/api/expenses/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawText: naturalText, defaultState: userState })
      });
      if (res.ok) {
        const parsed = await res.json();
        setDescription(parsed.product || naturalText);
        setCategoryId(parsed.categoryId || 'grocery');
        setAmount(parsed.amount ? parsed.amount.toString() : '0');
        if (parsed.expenseDate) setExpenseDate(parsed.expenseDate);
        if (parsed.state) setSelectedState(parsed.state);
        setActiveTab('form'); // Switch to form preview for user review
      }
    } catch (err) {
      console.error('Failed to parse AI prompt:', err);
    } finally {
      setIsParsing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    setIsSubmitting(true);
    try {
      const payload = {
        userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        categoryId,
        description: description || categories.find(c => c.id === categoryId)?.name || 'Consumer Purchase',
        amount: parseFloat(amount),
        quantity: 1.0,
        unit: 'unit',
        expenseDate,
        state: selectedState || userState
      };

      const res = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const responseData = await res.json();
        onExpenseAdded(responseData);
        // Reset
        setNaturalText('');
        setAmount('');
        setDescription('');
        onClose();
      }
    } catch (err) {
      console.error('Failed to save expense:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg glass-card rounded-2xl border border-slate-700/70 shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              +
            </div>
            <h3 className="text-base font-bold text-slate-100">Add Consumer Expense</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-2 bg-slate-900/40 border-b border-slate-800/60">
          <button
            onClick={() => setActiveTab('ai')}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
              activeTab === 'ai'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Natural Input</span>
          </button>
          <button
            onClick={() => setActiveTab('form')}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all ${
              activeTab === 'form'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Structured Form</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {activeTab === 'ai' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Describe what you bought in plain Hindi, English, or Hinglish:
                </label>
                <textarea
                  value={naturalText}
                  onChange={(e) => setNaturalText(e.target.value)}
                  placeholder="e.g. 'Bhai 50000 ka Samsung mobile phone kiya' or 'Aaj 1200 ka petrol bharwaya dinner kiya 850 ka'"
                  className="w-full h-28 p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                />
              </div>

              {/* Sample Prompts */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-medium text-slate-400">Try these examples:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setNaturalText('Samsung Mobile Phone 50000 Karnataka')}
                    className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-[11px] text-emerald-400 border border-slate-700 hover:border-emerald-500/50 transition-colors"
                  >
                    📱 Mobile Phone ₹50,000
                  </button>
                  <button
                    onClick={() => setNaturalText('Aaj 1200 ka petrol bharwaya Karnataka me')}
                    className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-[11px] text-amber-400 border border-slate-700 hover:border-amber-500/50 transition-colors"
                  >
                    ⛽ Petrol ₹1,200
                  </button>
                  <button
                    onClick={() => setNaturalText('Restaurant dinner 850')}
                    className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-[11px] text-teal-400 border border-slate-700 hover:border-teal-500/50 transition-colors"
                  >
                    🍽️ Dinner ₹850
                  </button>
                </div>
              </div>

              <button
                onClick={handleParseAi}
                disabled={isParsing || !naturalText.trim()}
                className="w-full py-3 rounded-xl btn-emerald-glow text-sm font-semibold text-white flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isParsing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Parsing with Gemini...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Parse & Preview Tax Rule →</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1">
                  <Tag className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Product Category</span>
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm text-slate-100 outline-none focus:border-emerald-500"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id} className="bg-slate-900 text-white">
                      {c.icon} {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Item Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Samsung Galaxy S24, Petrol, Nike Shoes"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm text-slate-100 outline-none focus:border-emerald-500"
                />
              </div>

              {/* Amount & State Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Amount Paid (₹)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g. 50000"
                    required
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm font-mono text-emerald-400 font-bold outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Purchase State</span>
                  </label>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm text-slate-100 outline-none focus:border-emerald-500"
                  >
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Purchase Date</span>
                </label>
                <input
                  type="date"
                  value={expenseDate}
                  onChange={(e) => setExpenseDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm text-slate-100 outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !amount}
                className="w-full py-3 rounded-xl btn-emerald-glow text-sm font-semibold text-white flex items-center justify-center space-x-2 disabled:opacity-50 mt-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Calculating Tax Rule...</span>
                  </>
                ) : (
                  <>
                    <span>Calculate & Save Expense</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
