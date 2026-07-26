'use client';

import { useState } from 'react';
import { ShieldCheck, ShoppingCart, Loader2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CarIdentityBlockProps {
  brand: string;
  brandAr: string;
  name: string;
  nameAr: string;
  year: number;
  typeAr: string;
  mileage: number;
  location: string;
  price: number;
}

export default function CarIdentityBlock({
  brand,
  brandAr,
  name,
  nameAr,
  year,
  typeAr,
  mileage,
  location,
  price,
}: CarIdentityBlockProps) {
  const [buyState, setBuyState] = useState<'idle' | 'processing' | 'confirmed'>('idle');

  const handleBuy = () => {
    if (buyState !== 'idle') return;
    setBuyState('processing');
    setTimeout(() => setBuyState('confirmed'), 2000);
    setTimeout(() => setBuyState('idle'), 5000);
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-4 min-w-0">
      {/* Badges row */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
        <span className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-md bg-charcoal-light border border-subtle-border text-xs sm:text-sm font-bold text-cream">
          <span className="w-4 h-4 rounded bg-gold/20 flex items-center justify-center text-xs text-gold font-black">
            {brand.charAt(0)}
          </span>
          {brandAr}
        </span>
        <span className="px-2.5 sm:px-3 py-1 rounded-md bg-charcoal-light border border-subtle-border text-xs sm:text-sm font-bold text-cream">
          {year}
        </span>
        <span className="px-2.5 sm:px-3 py-1 rounded-md bg-charcoal-light border border-subtle-border text-xs sm:text-sm font-bold text-cream">
          {typeAr}
        </span>
        <span className="flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-xs sm:text-sm font-bold text-emerald-400">
          <ShieldCheck size={12} className="sm:hidden" />
          <ShieldCheck size={14} className="hidden sm:block" />
          تأكيد الفحص
        </span>
      </div>

      {/* Name */}
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-cream leading-tight">
          {nameAr}
        </h1>
        <p className="text-xs sm:text-sm text-muted mt-1 font-medium">{name}</p>
      </div>

      {/* Quick stats */}
      <div className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base text-muted flex-wrap">
        <span>{mileage.toLocaleString()} كم</span>
        <span className="w-1 h-1 rounded-full bg-muted/40" />
        <span>{location}</span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-black gold-gradient-text">
          {price.toLocaleString()}
        </span>
        <span className="text-xs sm:text-sm text-muted font-semibold">ر.س</span>
      </div>

      {/* Buy Now Button */}
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
    </div>
  );
}
