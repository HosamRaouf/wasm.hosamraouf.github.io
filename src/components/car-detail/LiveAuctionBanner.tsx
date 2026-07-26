'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Gavel, Clock, TrendingUp, Loader2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LiveAuctionBannerProps {
  currentBid: number;
  bidCount: number;
  lastBidTime: string;
  endsAt: number;
  carId?: string;
}

function formatTime(ms: number) {
  if (ms <= 0) return '00:00:00';
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function LiveAuctionBanner({
  currentBid,
  bidCount,
  lastBidTime,
  endsAt,
  carId,
}: LiveAuctionBannerProps) {
  const router = useRouter();
  const [remaining, setRemaining] = useState(() => endsAt - Date.now());
  const [auctionState, setAuctionState] = useState<'idle' | 'processing' | 'confirmed'>('idle');

  useEffect(() => {
    const tick = () => setRemaining(endsAt - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  const handleAuction = () => {
    if (auctionState !== 'idle' || !carId) return;
    setAuctionState('processing');
    setTimeout(() => {
      setAuctionState('confirmed');
      setTimeout(() => router.push(`/auctions/${carId}`), 500);
    }, 800);
  };

  const closeDate = new Date(endsAt).toLocaleDateString('ar-SA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl overflow-hidden border border-ember/30 animate-pulse-border"
      style={{
        background: 'linear-gradient(135deg, rgba(255,106,26,0.08), rgba(204,77,10,0.04))',
      }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 sm:py-3 bg-ember/10 border-b border-ember/20">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-ember" />
          </span>
          <span className="text-ember font-black text-xs sm:text-sm tracking-wide">مزاد حي</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted text-[11px] sm:text-xs">
          <Gavel size={12} />
          <span className="font-bold">{bidCount}</span> مزايدة
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col gap-3 sm:gap-4">
        {/* Current Bid */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm sm:text-base text-muted mb-1">أعلى مزايدة حالياً</p>
            <p className="text-2xl sm:text-3xl font-black text-ember" style={{ textShadow: '0 0 20px rgba(255,106,26,0.3)' }}>
              {currentBid.toLocaleString()} <span className="text-sm sm:text-base font-bold">ر.س</span>
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted">
            <TrendingUp size={13} className="text-emerald-400" />
            <span>تزايد مستمر</span>
          </div>
        </div>

        {/* Timer */}
        <div className="rounded-xl bg-obsidian/60 border border-ember/20 p-3.5 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={13} className="text-ember" />
            <span className="text-[11px] sm:text-xs text-muted font-semibold">الوقت المتبقي</span>
          </div>
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            {formatTime(remaining).split(':').map((unit, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-black text-cream tabular-nums" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {unit}
                </span>
                <span className="text-[9px] sm:text-[10px] text-muted mt-1">
                  {i === 0 ? 'ساعات' : i === 1 ? 'دقائق' : 'ثواني'}
                </span>
              </div>
            )).reduce<(React.ReactNode | string)[]>((acc, el, i) => {
              if (i > 0) acc.push(<span key={`sep-${i}`} className="text-ember/60 text-xl sm:text-2xl font-bold">:</span>);
              acc.push(el);
              return acc;
            }, [])}
          </div>
        </div>

        {/* Enter Auction Button */}
        <motion.button
          whileHover={auctionState === 'idle' ? { scale: 1.01 } : {}}
          whileTap={auctionState === 'idle' ? { scale: 0.98 } : {}}
          onClick={handleAuction}
          disabled={auctionState !== 'idle'}
          className={`relative w-full py-4 rounded-xl font-black text-base transition-all duration-300 overflow-hidden ${
            auctionState === 'idle'
              ? 'ember-gradient-bg text-white shadow-[0_4px_24px_rgba(255,106,26,0.3)] hover:shadow-[0_4px_32px_rgba(255,106,26,0.5)]'
              : auctionState === 'processing'
              ? 'bg-ember/30 text-white/60 cursor-wait'
              : 'bg-emerald-500 text-white'
          }`}
        >
          {auctionState === 'idle' && (
            <span className="absolute inset-0 rounded-xl border-2 border-ember/40 animate-pulse-border pointer-events-none" />
          )}
          <AnimatePresence mode="wait">
            {auctionState === 'idle' && (
              <motion.span
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2"
              >
                <Gavel size={18} />
                الدخول في المزاد
              </motion.span>
            )}
            {auctionState === 'processing' && (
              <motion.span
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2"
              >
                <Loader2 size={18} className="animate-spin" />
                جاري التسجيل...
              </motion.span>
            )}
            {auctionState === 'confirmed' && (
              <motion.span
                key="confirmed"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2"
              >
                <Check size={18} />
                تم التسجيل بنجاح!
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Footer info */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-muted pt-2 border-t border-subtle-border">
          <span>آخر مزايدة: {lastBidTime}</span>
          <span className="hidden sm:inline">ينتهي: {closeDate}</span>
        </div>
      </div>
    </motion.div>
  );
}
