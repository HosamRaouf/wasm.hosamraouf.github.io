'use client';

import { useState } from 'react';
import { Expand, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuctionGalleryProps {
  images: string[];
  mainImage: string;
  carName: string;
}

export default function AuctionGallery({ images, mainImage, carName }: AuctionGalleryProps) {
  const allImages = [mainImage, ...images.slice(0, 4)];
  const hasMore = images.length > 4;
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="relative overflow-hidden rounded-2xl bg-ember/[0.04] border border-ember/15">
        {/* Main image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={allImages[active] || mainImage}
            alt={carName}
            className="h-full w-full object-cover transition-transform duration-500"
          />

          {/* Expand button */}
          <button
            onClick={() => setExpanded(true)}
            className="absolute top-3 left-3 sm:top-4 sm:left-4 flex h-touchSm w-touchSm items-center justify-center rounded-xl bg-obsidian/70 frosted-glass text-cream/70 hover:text-cream hover:bg-obsidian/90 transition-all"
          >
            <Expand className="h-iconMd w-iconMd sm:h-iconLg sm:w-iconLg" />
          </button>

          {/* Image count badge */}
          <span className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 rounded-md bg-obsidian/70 frosted-glass px-2.5 sm:px-3 py-1 text-xs font-medium text-cream/70">
            {active + 1} / {allImages.length}
          </span>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 p-3 overflow-x-auto hide-scrollbar">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative h-14 w-[72px] sm:h-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                i === active
                  ? 'border-gold shadow-[0_0_12px_rgba(212,175,55,0.3)]'
                  : 'border-white/[0.08] hover:border-white/20'
              }`}
            >
              <img
                src={img}
                alt={`${carName} - صورة ${i + 1}`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </button>
          ))}

          {hasMore && (
              <div className="relative h-14 w-[72px] sm:h-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 border-white/[0.08]">
              <img
                src={mainImage}
                alt=""
                className="h-full w-full object-cover blur-sm"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-obsidian/60">
                <span className="text-xs sm:text-sm font-bold text-cream">
                  +{images.length - 4}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Expanded lightbox */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/95 frosted-glass"
            onClick={() => setExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-h-[90vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={allImages[active] || mainImage}
                alt={carName}
                className="max-h-[85vh] max-w-full rounded-2xl object-contain"
              />
              <button
                onClick={() => setExpanded(false)}
                className="absolute top-3 left-3 flex h-touchSm w-touchSm items-center justify-center rounded-full bg-obsidian/80 text-cream hover:bg-obsidian transition-colors"
              >
                <X className="h-iconLg w-iconLg" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
