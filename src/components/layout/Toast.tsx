'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useToastStore } from '@/stores';

export default function Toast() {
  const { message } = useToastStore();

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          className="fixed bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-[70] max-w-[calc(100vw-2rem)] rounded-xl border border-gold/40 bg-obsidian/95 frosted-glass px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-cream shadow-xl"
          role="status"
          aria-live="polite"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
