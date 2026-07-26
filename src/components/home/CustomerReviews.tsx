'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  { name: 'أحمد بهمّام', text: 'المعرض ممتاز وانصح الشراء منه، تعامل الموظفين رايق ومحترف ومتعاونين', rating: 5 },
  { name: 'سارة عبدالله', text: 'أخذت من عنده سيارة وأنا متطمنة وكأني أخذتها من الوكالة، أكثر المعارض ثقة واحترافية وأمانة وأسعار تنافسية', rating: 5 },
  { name: 'منصور العبيدي', text: 'قمة التعامل الحسن والاحترافية والأمانة، أشكركم جميعاً', rating: 5 },
  { name: 'أحمد', text: 'قمة في التعامل والأخلاق العالية وحسن المقابلة وكرم الضيافة', rating: 5 },
  { name: 'فكونزيكسي', text: 'وجدت عندهم أقل الأسعار وتعامل طيب جداً وسرعة في الإنجاز، بالتوفيق للجميع', rating: 5 },
];

export default function CustomerReviews() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="relative py-20 sm:py-28 px-6 sm:px-8 lg:px-12 xl:px-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-gold/[0.02] blur-3xl" />
      </div>

      <div className="relative">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-gold mb-3">تقييمات العملاء</h2>
          <div className="w-16 h-1 rounded-full gold-gradient-bg" />
        </div>

        {/* Marquee */}
        <div className="relative overflow-hidden py-4">
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-obsidian to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-obsidian to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee-reviews flex items-center gap-6 whitespace-nowrap">
            {[...reviews, ...reviews, ...reviews].map((r, i) => (
              <motion.div
                key={`${r.name}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: (i % reviews.length) * 0.1 }}
                className="flex-shrink-0 w-80 sm:w-96 flex flex-col gap-3 p-5 rounded-2xl border border-white/[0.06] bg-charcoal/50 whitespace-normal"
              >
                <Quote size={20} className="text-gold/40" />
                <p className="text-sm text-cream/70 leading-relaxed flex-1">{r.text}</p>
                <div className="flex items-center gap-2 pt-2 border-t border-white/[0.06]">
                  <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-gold">{r.name[0]}</span>
                  </div>
                  <span className="text-xs font-bold text-cream/80">{r.name}</span>
                  <div className="mr-auto flex gap-0.5">
                    {[...Array(r.rating)].map((_, j) => (
                      <Star key={j} size={10} className="fill-gold text-gold" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
