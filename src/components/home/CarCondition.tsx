'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function CarCondition() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const conditions = [
    {
      id: 'used',
      labelAr: 'مستعملة',
      labelEn: 'Used',
      description: 'اكتشف مجموعة واسعة من السيارات المستعملة بحالة ممتازة وأسعار تنافسية',
      href: '/cars?condition=used',
      gradient: 'from-gold/10 to-transparent',
      borderHover: 'hover:border-gold/50',
    },
    {
      id: 'new',
      labelAr: 'جديدة',
      labelEn: 'New',
      description: 'أحدث طرازات السيارات الجديدة من أفضل العلامات التجارية العالمية',
      href: '/cars?condition=new',
      gradient: 'from-ember/10 to-transparent',
      borderHover: 'hover:border-ember/50',
    },
  ];

  return (
    <section ref={ref}>
      <div className="flex flex-col items-center mb-10 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-black text-cream mb-3">ماذا تبحث عن؟</h2>
        <div className="w-16 h-1 rounded-full gold-gradient-bg" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {conditions.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <Link
              href={c.href}
              className={`group block relative rounded-2xl border border-white/[0.06] bg-charcoal overflow-hidden transition-all duration-300 ${c.borderHover} hover:-translate-y-[3px] hover:shadow-xl`}
            >
              {/* Gradient bg */}
              <div className={`absolute inset-0 bg-gradient-to-br ${c.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="relative p-8 sm:p-10 flex flex-col items-center text-center gap-4">
                <span className="text-3xl sm:text-4xl font-black text-gold">
                  {c.labelAr}
                </span>
                <span className="text-sm font-semibold text-muted uppercase tracking-wider">
                  {c.labelEn}
                </span>
                <p className="text-sm text-cream/60 leading-relaxed max-w-xs">
                  {c.description}
                </p>
                <span className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-gold group-hover:gap-3 transition-all duration-300">
                  اكتشف الآن
                  <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
