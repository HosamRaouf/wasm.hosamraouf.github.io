'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCompareStore } from '@/stores';

export default function FloatingCompareBanner() {
  const router = useRouter();
  const { vehicles, removeVehicle } = useCompareStore();
  const hasAny = vehicles.length > 0;

  return (
    <AnimatePresence>
      {hasAny && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 rounded-2xl border border-gold/20 bg-charcoal/95 frosted-glass px-4 py-3 shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
        >
          {[0, 1].map((i) => {
            const v = vehicles[i];
            return (
              <div
                key={i}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2 transition-colors ${
                  v ? 'border border-gold/30 bg-white/5' : 'border border-dashed border-white/10 bg-white/[0.02]'
                }`}
              >
                {v ? (
                  <>
                    <img
                      src={v.image}
                      alt={v.name}
                      className="h-10 w-14 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-cream truncate max-w-[120px]">{v.name}</p>
                      <p className="text-[11px] text-gold font-bold">{v.price.toLocaleString('ar-SA')} ر.س</p>
                    </div>
                    <button
                      onClick={() => removeVehicle(v.id)}
                      className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full text-cream/40 hover:text-danger hover:bg-danger/10 transition-colors"
                      aria-label="إزالة من المقارنة"
                    >
                      <X size={13} />
                    </button>
                  </>
                ) : (
                  <p className="text-[11px] text-cream/25 px-2 py-1 whitespace-nowrap">اختر سيارة</p>
                )}
              </div>
            );
          })}
          <button
            disabled={vehicles.length < 2}
            onClick={vehicles.length === 2 ? () => router.push(`/compare?id1=${vehicles[0].id}&id2=${vehicles[1].id}`) : undefined}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              vehicles.length === 2
                ? 'gold-gradient-bg text-obsidian shadow-[0_0_16px_rgba(212,175,55,0.3)] hover:shadow-[0_0_24px_rgba(212,175,55,0.45)] cursor-pointer'
                : 'bg-white/10 text-cream/30 cursor-not-allowed'
            }`}
          >
            قارن
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
