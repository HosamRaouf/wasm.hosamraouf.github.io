'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ActiveFilterTagsProps {
  filters: { key: string; label: string }[];
  onRemove: (key: string) => void;
}

export default function ActiveFilterTags({ filters, onRemove }: ActiveFilterTagsProps) {
  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      <AnimatePresence mode="popLayout">
        {filters.map((f) => (
          <motion.span
            key={f.key}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold"
          >
            {f.label}
            <button
              onClick={() => onRemove(f.key)}
              className="flex h-4 w-4 items-center justify-center rounded-full bg-gold/20 text-gold transition-colors hover:bg-gold/30"
            >
              <X size={10} />
            </button>
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
