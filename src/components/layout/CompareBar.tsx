'use client';

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useCompareStore } from '@/stores';
import { getAssetPath } from '@/lib/paths';

export default function CompareBar() {
  const { vehicles, removeVehicle, clearVehicles } = useCompareStore();
  const router = useRouter();
  const hasAny = vehicles.length > 0;
  const canCompare = vehicles.length === 2;

  return (
    <AnimatePresence>
      {hasAny && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
          className="fixed bottom-0 inset-x-0 z-[50] bg-charcoal/95 frosted-glass border-t border-gold/20 shadow-[0_-8px_32px_rgba(0,0,0,0.5)]"
        >
          <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8 h-nav sm:h-navLg">
            {/* Vehicle slots */}
            <div className="flex-1 flex items-center gap-2 sm:gap-3 min-w-0">
              {[0, 1].map((i) => {
                const v = vehicles[i];
                return (
                  <div
                    key={i}
                    className={`flex-1 flex items-center gap-2 sm:gap-3 rounded-xl border px-2.5 sm:px-3 py-2 transition-colors min-w-0 ${
                      v ? 'border-gold/30 bg-white/5' : 'border-white/10 bg-white/[0.02] border-dashed'
                    }`}
                  >
                    {v ? (
                      <>
                        <img
                          src={getAssetPath(v.image)}
                          alt={v.name}
                          className="h-9 w-12 sm:h-10 sm:w-14 rounded-md object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm font-semibold text-cream truncate">{v.name}</p>
                          <p className="text-xs text-gold font-bold">
                            {v.price.toLocaleString('ar-SA')} ر.س
                          </p>
                        </div>
                        <button
                          onClick={() => removeVehicle(v.id)}
                          className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full text-cream/40 hover:text-danger hover:bg-danger/10 transition-colors"
                          aria-label="إزالة من المقارنة"
                        >
                          <X className="h-iconXs w-iconXs" />
                        </button>
                      </>
                    ) : (
                      <p className="text-xs sm:text-sm text-cream/25 text-center w-full py-2">
                        اختر سيارة
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                onClick={clearVehicles}
                className="px-2.5 sm:px-3 py-2 text-xs font-semibold text-danger/80 hover:text-danger hover:bg-danger/10 rounded-lg transition-colors min-h-touchSm"
              >
                مسح
              </button>
              <button
                disabled={!canCompare}
                onClick={canCompare ? () => router.push('/compare') : undefined}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-sm font-bold transition-all min-h-touchMd ${
                  canCompare
                    ? 'gold-gradient-bg text-obsidian shadow-[0_0_16px_rgba(212,175,55,0.3)] hover:shadow-[0_0_24px_rgba(212,175,55,0.45)] cursor-pointer'
                    : 'bg-white/10 text-cream/30 cursor-not-allowed'
                }`}
              >
                قارن
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
