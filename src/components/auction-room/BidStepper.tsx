'use client';

import { Minus, Plus } from 'lucide-react';

interface BidStepperProps {
  currentBid: number;
  bidAmount: number;
  onBidChange: (amount: number) => void;
}

function formatNumber(n: number) {
  return n.toLocaleString('ar-SA');
}

export default function BidStepper({ currentBid, bidAmount, onBidChange }: BidStepperProps) {
  const increment = 500;
  const floor = currentBid + increment;
  const isAtFloor = bidAmount <= floor;

  const handleDecrement = () => {
    const next = bidAmount - increment;
    if (next >= floor) {
      onBidChange(next);
    }
  };

  const handleIncrement = () => {
    onBidChange(bidAmount + increment);
  };

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-charcoal p-4">
      <p className="text-xs font-bold text-muted mb-3">مبلغ المزايدة</p>

      <div className="flex items-center gap-3">
        {/* Decrement */}
        <button
          onClick={handleDecrement}
          disabled={isAtFloor}
          className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl border-2 p-3 transition-all duration-200 ${
            isAtFloor
              ? 'border-white/[0.06] bg-white/[0.03] text-muted/40 cursor-not-allowed'
              : 'border-gold/30 bg-gold/5 text-gold hover:bg-gold/10 hover:border-gold/50 active:scale-95'
          }`}
        >
          <Minus className="h-6 w-6" />
        </button>

        {/* Input */}
        <div className="relative flex-1">
          <input
            type="text"
            readOnly
            value={`${formatNumber(bidAmount)} ر.س`}
            className="w-full rounded-xl border border-white/[0.08] bg-obsidian px-4 py-3 text-center text-xl font-black text-gold outline-none"
          />
        </div>

        {/* Increment */}
        <button
          onClick={handleIncrement}
          className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl border-2 border-gold/30 bg-gold/5 p-3 text-gold hover:bg-gold/10 hover:border-gold/50 active:scale-95 transition-all duration-200"
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>

      <p className="text-xs text-muted text-center mt-2">
        الحد الأدنى للزيادة: {formatNumber(increment)} ر.س
      </p>
    </div>
  );
}
