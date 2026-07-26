'use client';

import { useState, lazy, Suspense } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, RotateCw, BadgeCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAssetPath } from '@/lib/paths';


const CarViewer360 = lazy(() => import('./CarViewer360'));

interface MediaGalleryProps {
  image: string;
  nameAr: string;
  isAuction?: boolean;
}

const FAKE_THUMBS = [1, 2, 3, 4, 5, 6];

export default function MediaGallery({ image, nameAr, isAuction }: MediaGalleryProps) {
  const [tab, setTab] = useState<'photos' | '360'>('photos');
  const [current, setCurrent] = useState(0);
  const total = 18;

  const prev = () => setCurrent((c) => (c === 0 ? total - 1 : c - 1));
  const next = () => setCurrent((c) => (c === total - 1 ? 0 : c + 1));

  return (
    <div className="flex flex-col gap-3">
      {/* Main Image Area */}
      <div className="relative rounded-2xl overflow-hidden bg-charcoal border border-subtle-border aspect-video">
        {/* Tabs — top left over the image */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-1 rounded-xl bg-obsidian/80 backdrop-blur-sm p-1 z-20 border border-white/10">
          <button
            onClick={() => setTab('photos')}
            className={`px-4 py-1.5 rounded-md text-xs sm:text-sm font-bold transition-all duration-200 ${
              tab === 'photos'
                ? 'gold-gradient-bg text-obsidian shadow-[0_0_12px_rgba(212,175,55,0.25)]'
                : 'text-muted hover:text-cream'
            }`}
          >
            الصور
          </button>
          <button
            onClick={() => setTab('360')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs sm:text-sm font-bold transition-all duration-200 ${
              tab === '360'
                ? 'gold-gradient-bg text-obsidian shadow-[0_0_12px_rgba(212,175,55,0.25)]'
                : 'text-muted hover:text-cream'
            }`}
          >
            <RotateCw size={14} />
            عرض 360°
          </button>
        </div>
        <AnimatePresence mode="wait">
          {tab === 'photos' ? (
            <motion.div
              key={`photo-${current}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              <Image
                src={getAssetPath(image)}
                alt={`${nameAr} - صورة ${current + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
            </motion.div>
          ) : (
            <motion.div
              key="360"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative w-full h-full"
            >
              <Suspense
                fallback={
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed border-gold/50">
                      <RotateCw className="h-8 w-8 text-gold animate-spin" style={{ animationDuration: '3s' }} />
                    </div>
                    <p className="text-muted text-sm">جاري تحميل العرض ثلاثي الأبعاد...</p>
                  </div>
                }
              >
                <CarViewer360 />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overlays */}
        {tab === 'photos' && (
          <>
            {/* Badges */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-1.5 sm:gap-2 z-20">
              <span className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-bold">
                <BadgeCheck size={12} className="sm:hidden" />
                <BadgeCheck size={14} className="hidden sm:block" />
                فحص موثّق
              </span>
              {isAuction && (
                <span className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-md bg-ember/90 backdrop-blur-sm text-white text-xs font-bold animate-pulse-border">
                  <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-white" />
                  </span>
                  مزاد حي
                </span>
              )}
            </div>

            {/* Arrows */}
            <button
              onClick={prev}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 flex h-touchSm w-touchSm items-center justify-center rounded-full bg-obsidian/60 backdrop-blur-sm border border-white/10 text-cream hover:bg-obsidian/80 hover:border-gold/40 transition-all z-20"
            >
              <ChevronRight size={18} />
            </button>
            <button
              onClick={next}
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 flex h-touchSm w-touchSm items-center justify-center rounded-full bg-obsidian/60 backdrop-blur-sm border border-white/10 text-cream hover:bg-obsidian/80 hover:border-gold/40 transition-all z-20"
            >
              <ChevronLeft size={18} />
            </button>
          </>
        )}

        {/* 360 badge */}
        {tab === '360' && (
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-md bg-gold/20 backdrop-blur-sm border border-gold/30 text-gold text-xs font-bold z-20 flex items-center gap-1.5">
            <RotateCw size={12} />
            عرض تفاعلي 360°
          </div>
        )}
      </div>

      {/* Thumbnails */}
      <div className={`flex items-center gap-2 overflow-x-auto hide-scrollbar ${tab === '360' ? 'opacity-30 pointer-events-none' : ''}`}>
        {FAKE_THUMBS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`relative flex-shrink-0 w-14 h-10 sm:w-16 sm:h-12 rounded-md overflow-hidden border-2 transition-all duration-200 ${
              current === i
                ? 'border-gold shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                : 'border-subtle-border hover:border-gold/30'
            }`}
          >
            <Image
              src={getAssetPath(image)}
              alt={`صورة مصغرة ${i + 1}`}
              fill
              className="object-cover"
              sizes="64px"
            />
            {current === i && (
              <div className="absolute inset-0 bg-gold/10" />
            )}
          </button>
        ))}
        <span className="text-muted text-xs font-semibold mr-1 shrink-0">
          +{total - FAKE_THUMBS.length}
        </span>
      </div>
    </div>
  );
}
