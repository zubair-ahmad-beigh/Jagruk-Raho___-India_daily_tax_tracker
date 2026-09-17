'use client';

export function DashboardPreview() {
  const expenses = [
    { emoji: '📱', name: 'Samsung Mobile Phone', category: 'Mobile Phone', amount: '₹50,000', tax: '₹7,627', taxType: 'GST 18%', color: '#008F68' },
    { emoji: '⛽', name: 'Petrol Fill — Toyota Glanza', category: 'Fuel', amount: '₹1,000', tax: '₹415', taxType: 'Excise + VAT', color: '#E8721A' },
    { emoji: '🍽️', name: 'Dinner — Rameshwaram Cafe', category: 'Restaurant', amount: '₹1,200', tax: '₹57', taxType: 'GST 5%', color: '#008F68' },
    { emoji: '👕', name: 'Allen Solly Shirt', category: 'Clothing', amount: '₹2,500', tax: '₹268', taxType: 'GST 12%', color: '#E8721A' },
  ];

  const breakdown = [
    { label: 'GST', amount: '₹7,952', width: '73%', color: '#008F68' },
    { label: 'Fuel Taxes', amount: '₹415', width: '14%', color: '#E8721A' },
    { label: 'Other', amount: '₹0', width: '0%', color: '#A0AEC0' },
  ];

  return (
    <section
      id="about"
      style={{
        padding: '80px 0',
        background: 'linear-gradient(180deg, #FAF7F2 0%, white 100%)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="section-badge mb-4" style={{ margin: '0 auto 16px' }}>
            Dashboard Preview
          </div>
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 800,
              color: '#1A2340',
              letterSpacing: '-0.02em',
              marginBottom: 12,
            }}
          >
            Your Daily Tax Story
          </h2>
          <p style={{ color: '#718096', fontSize: 15, lineHeight: 1.7 }}>
            See exactly how much estimated tax was embedded in today&apos;s spending. (Illustrative demo data)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          
          {/* Left: Summary Cards */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Hero Tax Card */}
            <div
              className="rounded-2xl p-6 text-white relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #008F68 0%, #006B4F 100%)' }}
            >
              <div
                style={{
                  position: 'absolute', top: -20, right: -20, width: 100, height: 100,
                  borderRadius: '50%', background: 'rgba(255,255,255,0.1)',
                }}
              />
              <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.8, letterSpacing: '0.05em', marginBottom: 4 }}>
                TODAY'S TAX FOOTPRINT
              </div>
              <div
                style={{ fontWeight: 900, fontSize: 42, lineHeight: 1, letterSpacing: '-0.03em', color: 'white', marginBottom: 4 }}
              >
                ₹8,367
              </div>
              <div style={{ fontSize: 12, opacity: 0.75 }}>Estimated tax included in spending</div>
              <div
                className="flex items-center justify-between mt-4 pt-4"
                style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}
              >
                <div>
                  <div style={{ fontSize: 11, opacity: 0.7 }}>Total Spending</div>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>₹54,700</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, opacity: 0.7 }}>Expenses</div>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>4</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, opacity: 0.7 }}>Tax Rate</div>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>15.3%</div>
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div
              className="rounded-2xl p-5"
              style={{ background: 'white', border: '1px solid rgba(0,143,104,0.1)', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
            >
              <h4 style={{ fontWeight: 700, fontSize: 14, color: '#1A2340', marginBottom: 16 }}>
                Today&apos;s Breakdown
              </h4>
              <div className="space-y-3">
                {breakdown.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1" style={{ fontSize: 12 }}>
                      <span style={{ fontWeight: 600, color: '#4A5568' }}>{item.label}</span>
                      <span style={{ fontWeight: 700, color: item.color, fontFamily: 'monospace' }}>{item.amount}</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 9999, background: '#F0F4F8', overflow: 'hidden' }}>
                      <div
                        style={{ height: '100%', borderRadius: 9999, background: item.color, width: item.width, transition: 'width 1s ease' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Expense List */}
          <div
            className="lg:col-span-3 rounded-2xl overflow-hidden"
            style={{
              background: 'white',
              border: '1px solid rgba(0,143,104,0.1)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
            }}
          >
            <div
              className="px-5 py-4 border-b"
              style={{ borderColor: 'rgba(0,143,104,0.1)', background: 'rgba(0,143,104,0.03)' }}
            >
              <div className="flex items-center justify-between">
                <span style={{ fontWeight: 700, fontSize: 14, color: '#1A2340' }}>Today&apos;s Expenses</span>
                <span
                  style={{ fontSize: 11, padding: '3px 10px', borderRadius: 100, background: 'rgba(0,143,104,0.1)', color: '#008F68', fontWeight: 700 }}
                >
                  DEMO DATA
                </span>
              </div>
            </div>

            <div>
              {expenses.map((exp, i) => (
                <div
                  key={i}
                  className="px-5 py-4 flex items-center justify-between cursor-pointer transition-colors"
                  style={{
                    borderBottom: i < expenses.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,143,104,0.03)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                      style={{ background: '#F7F8FA', border: '1px solid rgba(0,0,0,0.06)' }}
                    >
                      {exp.emoji}
                    </div>
                    <div className="min-w-0">
                      <div style={{ fontWeight: 600, fontSize: 14, color: '#1A2340', lineHeight: 1.3 }} className="truncate">
                        {exp.name}
                      </div>
                      <div style={{ fontSize: 12, color: '#A0AEC0', lineHeight: 1.3 }}>{exp.category}</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <div style={{ fontWeight: 800, fontSize: 14, color: '#1A2340', fontFamily: 'monospace' }}>
                      {exp.amount}
                    </div>
                    <div className="flex items-center justify-end gap-1 mt-0.5">
                      <span style={{ fontSize: 12, color: exp.color, fontWeight: 700, fontFamily: 'monospace' }}>
                        Est. Tax {exp.tax}
                      </span>
                      <span
                        style={{ fontSize: 10, background: exp.color === '#008F68' ? 'rgba(0,143,104,0.1)' : 'rgba(232,114,26,0.1)', color: exp.color, padding: '1px 6px', borderRadius: 4, fontWeight: 600 }}
                      >
                        {exp.taxType}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
