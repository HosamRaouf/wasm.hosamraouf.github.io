'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Car, Users, Wrench } from 'lucide-react';

const features = [
  { icon: Shield, titleAr: 'حلول تمويلية متعددة', descAr: 'تعاقدنا مع العديد من جهات التمويل المختلفة سواء بنوك أو شركات تمويل، لنقدم أفضل حلول الشراء بالتقسيط التي تناسب جميع عملائنا' },
  { icon: Car, titleAr: 'مجموعة واسعة من السيارات', descAr: 'نقدم مجموعة كبيرة من السيارات التى تناسب كافة الاستخدامات، من مرسيدس، بى ام دبليو، نيسان، كيا، جيتور، تويوتا والمزيد' },
  { icon: Users, titleAr: 'ثقة العملاء', descAr: 'نقدم لك الاستشارة لتحصل على السيارة التى تناسب احتياجاتك بأفضل مميزات وأقل سعر، لأننا لا نبيعك سيارة فقط بل نقدم لك حلولاً' },
  { icon: Wrench, titleAr: 'خدمات ما بعد البيع', descAr: 'خدمة المساندة على الطريق، ضمان ممتد بعد انتهاء الوكيل، خصومات على قطع الغيار والأكسسوارات والبطاريات وأجور اليد العاملة' },
];

export default function WhyWasm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="px-6 sm:px-8 lg:px-12 xl:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-gold mb-3">لماذا وسم للسيارات؟</h2>
          <div className="w-16 h-1 rounded-full gold-gradient-bg" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.titleAr}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl border border-white/[0.06] bg-charcoal/50 hover:border-gold/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Icon size={22} className="text-gold" />
                </div>
                <h3 className="font-bold text-cream text-sm">{f.titleAr}</h3>
                <p className="text-xs text-muted leading-relaxed">{f.descAr}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
