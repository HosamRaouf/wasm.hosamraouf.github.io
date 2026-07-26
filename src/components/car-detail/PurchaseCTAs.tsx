'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Gavel, Loader2, Check } from 'lucide-react';

type ButtonState = 'idle' | 'processing' | 'confirmed';

interface PurchaseCTAsProps {
  price: number;
  isAuction?: boolean;
  carId?: string;
}

export default function PurchaseCTAs({ price, isAuction, carId }: PurchaseCTAsProps) {
  const router = useRouter();
  const [buyState, setBuyState] = useState<ButtonState>('idle');
  const [auctionState, setAuctionState] = useState<ButtonState>('idle');

  const handleBuy = () => {
    if (buyState !== 'idle') return;
    setBuyState('processing');
    setTimeout(() => setBuyState('confirmed'), 2000);
    setTimeout(() => setBuyState('idle'), 5000);
  };

  const handleAuction = () => {
    if (auctionState !== 'idle' || !carId) return;
    setAuctionState('processing');
    setTimeout(() => {
      setAuctionState('confirmed');
      setTimeout(() => router.push(`/auctions/${carId}`), 500);
    }, 800);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Buy Now */}
      <motion.button
        whileHover={buyState === 'idle' ? { scale: 1.01 } : {}}
        whileTap={buyState === 'idle' ? { scale: 0.98 } : {}}
        onClick={handleBuy}
        disabled={buyState !== 'idle'}
        className={`relative w-full py-4 rounded-xl font-black text-base transition-all duration-300 overflow-hidden ${
          buyState === 'idle'
            ? 'gold-gradient-bg text-obsidian shadow-[0_4px_24px_rgba(212,175,55,0.3)] hover:shadow-[0_4px_32px_rgba(212,175,55,0.5)]'
            : buyState === 'processing'
            ? 'bg-gold/30 text-obsidian/60 cursor-wait'
            : 'bg-emerald-500 text-white'
        }`}
      >
        <AnimatePresence mode="wait">
          {buyState === 'idle' && (
            <motion.span
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} />
              شراء مباشر — {price.toLocaleString()} ر.س
            </motion.span>
          )}
          {buyState === 'processing' && (
            <motion.span
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2"
            >
              <Loader2 size={18} className="animate-spin" />
              جاري المعالجة...
            </motion.span>
          )}
          {buyState === 'confirmed' && (
            <motion.span
              key="confirmed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2"
            >
              <Check size={18} />
              تأكيد بنجاح!
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Enter Auction */}
      {isAuction && (
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
          {/* Pulsing glow ring */}
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
      )}
    </div>
  );
}
