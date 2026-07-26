'use client';

import Link from 'next/link';
import { tickerItems } from '@/lib/data';

export default function LiveTicker() {
  const items = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <div className="fixed top-nav sm:top-nav-lg inset-x-0 z-ticker h-ticker bg-gold/[0.06] border-b border-gold/10 overflow-hidden">
      <div className="animate-marquee flex items-center h-full whitespace-nowrap">
        {items.map((item, i) => (
          <Link
            key={i}
            href="/auctions"
            className="inline-flex items-center gap-4 px-8 sm:px-12 text-xs text-muted hover:text-cream transition-colors shrink-0"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold/60 shrink-0" />
            <span className="font-semibold text-cream/80">{item.car}</span>
            <span className="text-gold font-bold">{item.price} ر.س</span>
            <span>{item.bids} مزايدة</span>
            <span>{item.time}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
