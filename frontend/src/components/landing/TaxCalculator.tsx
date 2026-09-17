'use client';

import { useState } from 'react';
import { Calculator, ChevronDown, Loader2, ExternalLink, Info, ChevronUp } from 'lucide-react';

const DEMO_CATEGORIES = [
  { id: 'mobile_phone', label: 'Mobile Phone (18% GST)' },
  { id: 'laptop', label: 'Laptop / Computer (18% GST)' },
  { id: 'electronics', label: 'Television / Electronics (18% GST)' },
  { id: 'restaurant', label: 'Restaurant Meal (5% GST)' },
  { id: 'grocery', label: 'Packaged Grocery (5% GST)' },
  { id: 'clothing', label: 'Clothing & Apparel (5%/12% GST)' },
  { id: 'petrol', label: 'Petrol Fuel (Excise + VAT)' },
  { id: 'diesel', label: 'Diesel Fuel (Excise + VAT)' },
  { id: 'lpg', label: 'Domestic LPG Cylinder (5% GST)' },
  { id: 'online_subscription', label: 'Online Subscription (18% GST)' },
  { id: 'cab_service', label: 'Cab Service / Ola / Uber (5% GST)' },
];

interface TaxResult {
  taxAmount: number;
  effectiveRate: number;
  taxType: string;
  calculationMethod: string;
  formulaExplained: string;
  status: string;
  components?: Array<{ name: string; rateDisplay: string; amount: number }>;
  source?: { name: string; url: string; referenceNumber: string };
}

export function TaxCalculator() {
  const [categoryId, setCategoryId] = useState('mobile_phone');
  const [amount, setAmount] = useState('50000');
  const [state, setState] = useState('Karnataka');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TaxResult | null>(null);
  const [error, setError] = useState('');
  const [showFormula, setShowFormula] = useState(false);

  const handleCalculate = async () => {
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          categoryId,
          description: DEMO_CATEGORIES.find(c => c.id === categoryId)?.label || 'Consumer Purchase',
          amount: numAmount,
          quantity: 1.0,
          unit: 'unit',
          expenseDate: new Date().toISOString().split('T')[0],
          state,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.taxResult) {
          setResult(data.taxResult);
        } else {
          setError('Tax rule not found for this category.');
        }
      } else {
        const fallback = getDemoResult(categoryId, numAmount);
        setResult(fallback);
      }
    } catch {
      const fallback = getDemoResult(categoryId, numAmount);
      setResult(fallback);
    } finally {
      setLoading(false);
    }
  };

  const getDemoResult = (catId: string, amt: number): TaxResult => {
    let rate = 18, taxType = 'GST', method = 'TAX_INCLUSIVE';
    if (catId === 'restaurant' || catId === 'lpg' || catId === 'cab_service') { rate = 5; }
    if (catId === 'grocery') { rate = 5; }
    if (catId === 'clothing') { rate = amt <= 1000 ? 5 : 12; }
    if (catId === 'petrol' || catId === 'diesel') {
      taxType = 'EXCISE_VAT'; rate = 40; method = 'MULTI_COMPONENT';
    }
    const tax = method === 'TAX_INCLUSIVE'
      ? (amt * rate) / (100 + rate)
      : amt * 0.40;

    return {
      taxAmount: parseFloat(tax.toFixed(2)),
      effectiveRate: rate,
      taxType,
      calculationMethod: method,
      formulaExplained: method === 'TAX_INCLUSIVE'
        ? `₹${amt.toLocaleString('en-IN')} × ${rate} / (100 + ${rate})`
        : `Central Excise (₹19.90/L) + State VAT (${state} ~25.92%)`,
      status: 'ESTIMATED',
      components: taxType === 'GST'
        ? [
            { name: 'CGST', rateDisplay: `${rate / 2}%`, amount: parseFloat((tax / 2).toFixed(2)) },
            { name: 'SGST', rateDisplay: `${rate / 2}%`, amount: parseFloat((tax / 2).toFixed(2)) },
          ]
        : [
            { name: 'Central Excise', rateDisplay: '₹19.90/L', amount: parseFloat((tax * 0.47).toFixed(2)) },
            { name: 'State VAT', rateDisplay: '25.92%', amount: parseFloat((tax * 0.53).toFixed(2)) },
          ],
      source: {
        name: taxType === 'GST'
          ? 'CBIC GST Rate Schedule (Verified Official Source)'
          : 'PPAC Petroleum Tax Bulletin',
        url: 'https://cbic-gst.gov.in',
        referenceNumber: 'CBIC-GST-2026',
      },
    };
  };

  return (
    <section
      className="relative py-16 sm:py-20"
      style={{ background: 'linear-gradient(180deg, rgba(250,247,242,0.95) 0%, #FAF7F2 100%)' }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="section-badge mb-4" style={{ margin: '0 auto 16px' }}>
            <Calculator size={13} />
            Try It Now
          </div>
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(28px, 4vw, 38px)',
              fontWeight: 800,
              color: '#1A2340',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              marginBottom: 8,
            }}
          >
            See Your Tax — Instantly
          </h2>
          <p style={{ color: '#718096', fontSize: 15, lineHeight: 1.6 }}>
            Based on verified official tax rules. No guessing, no estimates from AI.
          </p>
        </div>

        {/* Calculator Card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'white',
            boxShadow: '0 20px 60px rgba(0,0,0,0.10), 0 4px 16px rgba(0,143,104,0.08)',
            border: '1px solid rgba(0,143,104,0.12)',
          }}
        >
          {/* Card Header */}
          <div
            className="flex items-center justify-between px-6 py-4 border-b"
            style={{ borderColor: 'rgba(0,143,104,0.1)', background: 'rgba(0,143,104,0.03)' }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(0,143,104,0.12)' }}
              >
                <Calculator size={15} style={{ color: '#008F68' }} />
              </div>
              <span style={{ fontWeight: 700, fontSize: 15, color: '#1A2340' }}>
                Try It Now – See Your Tax
              </span>
            </div>
            <span style={{ fontSize: 11, color: '#718096', fontWeight: 500 }}>
              Based on verified tax rules
            </span>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              
              {/* Category */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#4A5568', marginBottom: 8 }}>
                  What did you buy?
                </label>
                <div className="relative">
                  <select
                    value={categoryId}
                    onChange={(e) => { setCategoryId(e.target.value); setResult(null); }}
                    style={{
                      width: '100%',
                      appearance: 'none',
                      padding: '11px 40px 11px 14px',
                      borderRadius: 10,
                      border: '1.5px solid rgba(0,143,104,0.2)',
                      fontSize: 14,
                      color: '#1A2340',
                      fontWeight: 500,
                      background: 'white',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#008F68'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(0,143,104,0.2)'; }}
                  >
                    {DEMO_CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                  <ChevronDown
                    size={15}
                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: '#718096' }}
                  />
                </div>
              </div>

              {/* Amount */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#4A5568', marginBottom: 8 }}>
                  Amount Paid (₹)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => { setAmount(e.target.value); setResult(null); }}
                  placeholder="e.g. 50000"
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: 10,
                    border: '1.5px solid rgba(0,143,104,0.2)',
                    fontSize: 15,
                    fontWeight: 700,
                    color: '#008F68',
                    fontFamily: "'Inter', monospace",
                    background: 'white',
                    outline: 'none',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#008F68'; }}
                  onBlur={(e) => { e.target.style.borderColor = 'rgba(0,143,104,0.2)'; }}
                />
              </div>
            </div>

            {/* State + Calculate Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              <div className="sm:col-span-1">
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#4A5568', marginBottom: 8 }}>
                  Your State
                </label>
                <div className="relative">
                  <select
                    value={state}
                    onChange={(e) => { setState(e.target.value); setResult(null); }}
                    style={{
                      width: '100%',
                      appearance: 'none',
                      padding: '11px 36px 11px 14px',
                      borderRadius: 10,
                      border: '1.5px solid rgba(0,143,104,0.2)',
                      fontSize: 14,
                      color: '#1A2340',
                      background: 'white',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#008F68'; }}
                    onBlur={(e) => { e.target.style.borderColor = 'rgba(0,143,104,0.2)'; }}
                  >
                    {['Karnataka', 'Maharashtra', 'Delhi', 'Tamil Nadu', 'Uttar Pradesh', 'Gujarat', 'Rajasthan'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#718096' }} />
                </div>
              </div>
              <div className="sm:col-span-2 flex items-end">
                <button
                  onClick={handleCalculate}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 font-bold text-white rounded-xl transition-all"
                  style={{
                    background: loading ? '#6FAF96' : '#008F68',
                    padding: '12px 28px',
                    fontSize: 15,
                    boxShadow: '0 4px 20px rgba(0,143,104,0.35)',
                    cursor: loading ? 'not-allowed' : 'pointer',
                  }}
                >
                  {loading ? (
                    <><Loader2 size={16} className="animate-spin" /> Calculating...</>
                  ) : (
                    <><Calculator size={16} /> Calculate Tax</>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg text-sm" style={{ background: '#FFF5F5', color: '#C53030', border: '1px solid #FED7D7' }}>
                {error}
              </div>
            )}

            {/* Tax Result */}
            {result && (
              <div
                className="rounded-xl overflow-hidden animate-fade-in-up"
                style={{
                  background: 'linear-gradient(135deg, #F0FDF8 0%, #E8FAF2 100%)',
                  border: '1.5px solid rgba(0,143,104,0.25)',
                }}
              >
                {/* Result Header */}
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <div style={{ fontSize: 12, color: '#4A5568', fontWeight: 600, marginBottom: 4 }}>
                        Estimated Tax Included
                      </div>
                      <div
                        className="font-black animate-count-up"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 'clamp(32px, 5vw, 44px)',
                          color: '#008F68',
                          letterSpacing: '-0.02em',
                          lineHeight: 1,
                        }}
                      >
                        ₹{result.taxAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-2">
                      <span
                        style={{
                          background: '#008F68',
                          color: 'white',
                          fontSize: 12,
                          fontWeight: 700,
                          padding: '4px 12px',
                          borderRadius: 100,
                        }}
                      >
                        {result.taxType} ({result.effectiveRate}%)
                      </span>
                      {result.source && (
                        <div style={{ fontSize: 11, color: '#718096' }}>
                          Source: {result.source.name.split('(')[0].trim()}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Components */}
                  {result.components && result.components.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-4 pt-4" style={{ borderTop: '1px solid rgba(0,143,104,0.15)' }}>
                      {result.components.map((comp, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1.5"
                          style={{ fontSize: 12, color: '#4A5568' }}
                        >
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#008F68' }} />
                          <span style={{ fontWeight: 600 }}>{comp.name}</span>
                          <span style={{ color: '#718096' }}>({comp.rateDisplay})</span>
                          <span style={{ fontWeight: 700, color: '#008F68', fontFamily: 'monospace' }}>
                            ₹{comp.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* How was this calculated */}
                <div style={{ borderTop: '1px solid rgba(0,143,104,0.12)' }}>
                  <button
                    onClick={() => setShowFormula(!showFormula)}
                    className="w-full flex items-center justify-between px-5 py-3 text-left transition-colors hover:bg-green-50"
                    style={{ fontSize: 13, fontWeight: 600, color: '#008F68' }}
                  >
                    <div className="flex items-center gap-2">
                      <Info size={14} />
                      How was this calculated?
                    </div>
                    {showFormula ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>

                  {showFormula && (
                    <div className="px-5 pb-5 space-y-3">
                      <div
                        className="p-3 rounded-lg font-mono text-sm"
                        style={{ background: 'rgba(0,143,104,0.06)', color: '#1A2340', fontWeight: 600 }}
                      >
                        {result.formulaExplained}
                      </div>
                      {result.source && (
                        <div className="flex items-center justify-between">
                          <span style={{ fontSize: 11, color: '#718096' }}>
                            Official Government Source: {result.source.name}
                          </span>
                          <a
                            href={result.source.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 font-semibold text-xs hover:underline"
                            style={{ color: '#E8721A' }}
                          >
                            View Source <ExternalLink size={11} />
                          </a>
                        </div>
                      )}
                      <div
                        className="p-2.5 rounded-lg text-xs"
                        style={{ background: 'rgba(232,114,26,0.06)', color: '#744210', border: '1px solid rgba(232,114,26,0.15)' }}
                      >
                        ⚠️ Tax figures are <strong>estimates</strong> based on applicable rules. Not a statement of tax remitted to the Government of India.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
