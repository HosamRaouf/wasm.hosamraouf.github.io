'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ShieldCheck, FileText, Truck, CreditCard } from 'lucide-react';

const items = [
  {
    icon: ShieldCheck,
    title: 'الضمان الأصلي',
    desc: 'جميع السيارات مفحوصة ومعتمدة بأعلى معايير الجودة',
  },
  {
    icon: FileText,
    title: 'الوثائق الرسمية',
    desc: 'استخراج الوثائق والتصديقات الحكومية مباشرة من المنصة',
  },
  {
    icon: Truck,
    title: 'التوصيل السريع',
    desc: 'خدمة توصيل آمنة إلى أي مدينة في المملكة',
  },
  {
    icon: CreditCard,
    title: 'التمويل المرن',
    desc: 'خطط تمويل مرنة بأسعار تنافسية تصل إلى ٧ سنوات',
  },
];

export default function TrustStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="relative bg-charcoal/60 border-y border-subtle-border rounded-2xl overflow-hidden">
      {/* Subtle gold gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gold/[0.02] via-transparent to-gold/[0.02] pointer-events-none" />

      <div className="relative px-0 py-10 sm:py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex items-start gap-4 p-4 rounded-xl hover:bg-charcoal-light/50 transition-colors duration-300 group"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/15 transition-colors duration-300">
              <item.icon size={22} className="text-gold" />
            </div>
            <div className="flex flex-col gap-1.5 min-w-0">
              <h3 className="font-bold text-cream text-md">{item.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
