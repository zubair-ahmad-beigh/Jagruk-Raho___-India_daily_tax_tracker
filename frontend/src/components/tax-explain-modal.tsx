'use client';

import React from 'react';
import { X, ExternalLink, ShieldCheck, Calculator, FileText, Info } from 'lucide-react';

interface TaxExplainModalProps {
  isOpen: boolean;
  onClose: () => void;
  expense: any;
}

export const TaxExplainModal: React.FC<TaxExplainModalProps> = ({
  isOpen,
  onClose,
  expense
}) => {
  if (!isOpen || !expense) return null;

  const taxResult = expense.taxResult || {};
  const components = taxResult.components || [];
  const source = taxResult.source || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg glass-card rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">Tax Breakdown & Explainability</h3>
              <p className="text-[11px] text-slate-400">Verified Tax Rule Resolver</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          
          {/* Hero Purchase Card */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">
                {expense.categoryName || expense.categoryId}
              </span>
              <h4 className="text-base font-bold text-slate-100 mt-0.5">{expense.description}</h4>
              <p className="text-xs text-slate-400 mt-1">State: <span className="text-slate-200 font-medium">{expense.state}</span></p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Purchase Amount</span>
              <span className="text-lg font-mono font-extrabold text-slate-100">
                ₹{expense.amount?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Tax Result Summary Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 to-teal-950/60 border border-emerald-500/30 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-emerald-400 block">Estimated Tax Included</span>
              <span className="text-2xl font-mono font-extrabold text-emerald-300">
                ₹{taxResult.taxAmount?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="text-right">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 inline-block">
                {taxResult.taxType} @ {taxResult.effectiveRate}%
              </span>
              <span className="text-[11px] text-slate-400 block mt-1">Status: {taxResult.status || 'ESTIMATED'}</span>
            </div>
          </div>

          {/* Component Breakdown Table */}
          {components.length > 0 && (
            <div>
              <h5 className="text-xs font-semibold text-slate-300 mb-2 flex items-center space-x-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tax Component Split</span>
              </h5>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden divide-y divide-slate-800">
                {components.map((comp: any, idx: number) => (
                  <div key={idx} className="p-3 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span className="font-semibold text-slate-200">{comp.name}</span>
                      <span className="text-[11px] text-slate-400">({comp.rateDisplay})</span>
                    </div>
                    <span className="font-mono font-bold text-slate-200">
                      ₹{comp.amount?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Formula Explanation */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block flex items-center space-x-1">
              <Info className="w-3 h-3 text-emerald-400" />
              <span>Calculation Formula</span>
            </span>
            <p className="text-xs font-mono text-slate-200 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              {taxResult.formulaExplained || `₹${expense.amount} × ${taxResult.effectiveRate} / (100 + ${taxResult.effectiveRate})`}
            </p>
          </div>

          {/* Official Source Reference */}
          {source && source.name && (
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/60 flex items-start space-x-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                  Official Verified Government Source
                </span>
                <p className="text-xs font-semibold text-slate-200 truncate mt-0.5">{source.name}</p>
                {source.referenceNumber && (
                  <span className="text-[10px] text-slate-400 block mt-0.5">Ref: {source.referenceNumber}</span>
                )}
                {source.url && (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1 text-xs text-amber-400 hover:underline mt-1 font-medium"
                  >
                    <span>Inspect official CBIC document</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
