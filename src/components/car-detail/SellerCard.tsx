'use client';

import { Star, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface SellerCardProps {
  seller: {
    name: string;
    rating: number;
    reviews: number;
  };
}

export default function SellerCard({ seller }: SellerCardProps) {
  return (
    <div className="rounded-2xl bg-charcoal border border-subtle-border p-5 flex flex-col gap-4">
      <h3 className="text-sm font-bold text-cream">المعلن</h3>

      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="flex h-touchMd w-touchMd items-center justify-center rounded-full gold-gradient-bg text-obsidian text-lg font-black shrink-0">
          {seller.name.charAt(0)}
        </div>

        <div className="flex flex-col min-w-0">
          <span className="text-sm font-bold text-cream truncate">{seller.name}</span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={11}
                  className={i < Math.round(seller.rating) ? 'text-gold fill-gold' : 'text-muted/30'}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-gold">{seller.rating}</span>
            <span className="text-xs text-muted">({seller.reviews} تقييم)</span>
          </div>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 rounded-xl border border-gold/30 bg-gold/5 text-gold text-sm font-bold hover:bg-gold/10 transition-all duration-200 flex items-center justify-center gap-2"
      >
        <MessageCircle size={16} />
        تواصل مع المعلن
      </motion.button>
    </div>
  );
}
