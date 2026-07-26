'use client';

import Link from 'next/link';
import Image from 'next/image';
import { brands } from '@/lib/data';
import { getAssetPath } from '@/lib/paths';

const marqueeItems = [...brands, ...brands, ...brands];

export default function BrowseByBrand() {
  return (
    <section>
      <div className="flex flex-col items-center mb-10 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-black text-cream mb-3">العلامات التجارية المميزة</h2>
        <div className="w-16 h-1 rounded-full gold-gradient-bg" />
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden py-4">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-obsidian to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-obsidian to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-brand flex items-center gap-10 sm:gap-14 whitespace-nowrap">
          {marqueeItems.map((brand, i) => (
            <Link
              key={`${brand.id}-${i}`}
              href={`/cars/brand/${brand.id}`}
              className="flex-shrink-0 group flex flex-col items-center gap-2 transition-transform duration-300 hover:scale-110"
            >
              <div className="relative w-36 h-36 sm:w-52 sm:h-52 flex items-center justify-center">
                <Image
                  src={getAssetPath(brand.logo)}
                  alt={brand.nameAr}
                  width={208}
                  height={208}
                  className="object-contain opacity-70 drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] transition-all duration-300 group-hover:opacity-100 group-hover:scale-110 group-hover:drop-shadow-[0_0_16px_rgba(212,175,55,0.5)]"
                  unoptimized
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-10 sm:mt-12">
        <Link
          href="/brands"
          className="group flex items-center gap-2 px-6 py-3 rounded-xl border border-gold/40 text-gold text-sm font-bold hover:bg-gold/10 transition-all duration-300 min-h-touchLg"
        >
          عرض جميع العلامات
          <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
        </Link>
      </div>
    </section>
  );
}
