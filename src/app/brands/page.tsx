'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { brands, cars } from '@/lib/data';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function BrandsPage() {
  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    cars.forEach((c) => {
      counts[c.brand] = (counts[c.brand] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-dvh bg-obsidian">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="flex flex-col items-center mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl font-black text-cream mb-3 font-cairo">العلامات التجارية</h1>
          <p className="text-sm sm:text-base text-muted font-cairo">تصفّح حسب العلامة المفضلة لديك</p>
          <div className="w-16 h-1 rounded-full gold-gradient-bg mt-4" />
        </div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 max-w-5xl mx-auto"
        >
          {brands.map((brand) => {
            const count = brandCounts[brand.id] || 0;
            return (
              <motion.div key={brand.id} variants={item}>
                <Link
                  href={`/cars/brand/${brand.id}`}
                  className="group relative flex flex-col items-center gap-4 p-6 sm:p-8 rounded-2xl border border-subtle-border bg-charcoal/40 hover:bg-charcoal/80 hover:border-gold/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.06)]"
                >
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center">
                    <Image
                      src={brand.logo}
                      alt={brand.nameAr}
                      width={128}
                      height={128}
                      className="object-contain opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_16px_rgba(212,175,55,0.4)]"
                      unoptimized
                    />
                  </div>

                  <div className="text-center">
                    <p className="text-base sm:text-lg font-bold text-cream font-cairo group-hover:text-gold transition-colors duration-300">{brand.nameAr}</p>
                    <p className="text-xs sm:text-sm text-muted font-cairo mt-1">
                      {count} {count === 1 ? 'سيارة' : 'سيارات'}
                    </p>
                  </div>

                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ChevronLeft size={16} className="text-gold/50" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
