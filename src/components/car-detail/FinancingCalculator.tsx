'use client';

import { useState, useMemo } from 'react';
import { Calculator, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface FinancingCalculatorProps {
  price: number;
}

const TENURES = [12, 24, 36, 48, 60];
const RATE = 0.049;

export default function FinancingCalculator({ price }: FinancingCalculatorProps) {
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [tenure, setTenure] = useState(36);

  const calc = useMemo(() => {
    const down = price * (downPaymentPct / 100);
    const financed = price - down;
    const monthly = (financed * (1 + (RATE * tenure) / 12)) / tenure;
    return { down, financed, monthly };
  }, [price, downPaymentPct, tenure]);

  const sliderPct = ((downPaymentPct - 10) / 50) * 100;

  return (
    <div className="rounded-2xl bg-charcoal border border-subtle-border p-5 flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <Calculator size={18} className="text-gold" />
        <h3 className="text-lg font-bold text-cream">حاسبة التقسيط</h3>
      </div>

      {/* Down Payment */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted">الدفعة المقدمة</span>
          <span className="text-sm font-bold text-gold">{downPaymentPct}%</span>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={10}
            max={60}
            step={5}
            value={downPaymentPct}
            onChange={(e) => setDownPaymentPct(Number(e.target.value))}
            className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to left, #D4AF37 ${sliderPct}%, #1E1D24 ${sliderPct}%)`,
            }}
          />
          <span className="text-sm font-bold text-cream min-w-[90px] text-left">
            {calc.down.toLocaleString()} ر.س
          </span>
        </div>
      </div>

      {/* Tenure */}
      <div className="flex flex-col gap-3">
        <span className="text-sm text-muted">مدة التقسيط</span>
        <div className="grid grid-cols-5 gap-2">
          {TENURES.map((t) => (
            <button
              key={t}
              onClick={() => setTenure(t)}
              className={`py-2.5 rounded-md text-xs font-bold transition-all duration-200 ${
                tenure === t
                  ? 'gold-gradient-bg text-obsidian shadow-[0_0_8px_rgba(212,175,55,0.25)]'
                  : 'bg-charcoal-light border border-subtle-border text-muted hover:text-cream hover:border-gold/20'
              }`}
            >
              {t} شهر
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      <motion.div
        key={`${downPaymentPct}-${tenure}`}
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        className="rounded-xl bg-obsidian/60 border border-gold/20 p-4 flex flex-col gap-2"
      >
        <span className="text-xs text-muted">القسط الشهري التقديري</span>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black gold-gradient-text">
            {Math.round(calc.monthly).toLocaleString()}
          </span>
          <span className="text-sm text-muted font-semibold">ر.س / شهرياً</span>
        </div>
        <div className="flex items-center justify-between text-xs text-muted mt-1 pt-2 border-t border-subtle-border">
          <span>المبلغ الممول: {calc.financed.toLocaleString()} ر.س</span>
          <span>الفائدة: {(RATE * 100).toFixed(1)}%</span>
        </div>
      </motion.div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 p-3 rounded-md bg-ember/5 border border-ember/10">
        <AlertCircle size={14} className="text-ember mt-0.5 shrink-0" />
        <p className="text-[11px] text-muted leading-relaxed">
          تقديري — يعتمد على موافقة البنك والائتمان. الأقساط الفعلية قد تختلف حسب حالة المقرض والبنك الممول.
        </p>
      </div>
    </div>
  );
}
