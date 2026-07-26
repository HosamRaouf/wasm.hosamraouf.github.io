'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { vehicleTypes } from '@/lib/data';
import {
  Car,
  Truck,
  Gauge,
  CircleDot,
  Minus,
  Bus,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  sedan: Car,
  suv: Truck,
  pickup: Truck,
  sports: Gauge,
  coupe: CircleDot,
  hatchback: Minus,
  van: Bus,
};

export default function BrowseByType() {
  const [selected, setSelected] = useState<string | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref}>
      <div className="flex flex-col items-center mb-10 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-black text-cream mb-3">تصفح حسب النوع</h2>
        <div className="w-16 h-1 rounded-full gold-gradient-bg" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 sm:gap-4">
        {vehicleTypes.map((type, i) => {
          const isActive = selected === type.id;
          const Icon = iconMap[type.id] || Car;
          return (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link
                href={`/cars/type/${type.id}`}
                onClick={() => setSelected(type.id)}
                className={`
                  group relative flex flex-col items-center gap-3 p-5 sm:p-6 rounded-2xl border transition-all duration-300 min-h-touchLg
                  ${
                    isActive
                      ? 'bg-gold/10 border-gold shadow-[0_0_24px_rgba(212,175,55,0.12)]'
                      : 'bg-charcoal border-subtle-border hover:border-gold/40 hover:-translate-y-[3px] hover:shadow-[0_8px_32px_rgba(212,175,55,0.08)]'
                  }
                `}
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/15 transition-colors duration-300">
                  <Icon size={24} className={isActive ? 'text-gold' : 'text-muted group-hover:text-gold transition-colors duration-300'} />
                </div>
                <span className={`font-bold text-sm ${isActive ? 'text-gold' : 'text-cream'}`}>
                  {type.name}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-charcoal-light text-muted font-medium">
                  {type.count} سيارة
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
