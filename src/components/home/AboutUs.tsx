'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function AboutUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="px-6 sm:px-8 lg:px-12 xl:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gold/10 blur-2xl" />
            <div className="absolute -inset-8 rounded-3xl bg-gold/[0.04] blur-3xl" />
            <img
              src={getAssetPath("/assets/wasss.png")}
              alt="وسم للسيارات"
              className="relative h-64 sm:h-80 lg:h-96 w-auto object-contain rounded-2xl"
            />
          </div>
        </motion.div>

        {/* Text */}
        <div className="flex flex-col">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-px mb-8 origin-left"
            style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }}
          />
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-black text-gold mb-8 leading-snug"
          >
            مرحبا بكم في وسم للسيارات
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-cream/70 text-sm sm:text-base leading-loose mb-4"
          >
            نود ان نرحب بكم في معرضنا الافتراضى والذي نقدمه لكم من خلال موقعنا الالكترونى، حيث حرصنا على توضيح مميزات سياراتنا واسعارها.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-cream/70 text-sm sm:text-base leading-loose mb-4"
          >
            نحن نقدر لكم قضاء بعض الوقت لزيارة موقعنا على شبكة الإنترنت، هدفنا هو منحك جولة تفاعلية لمخزوننا من السيارات الجديدة والمستعملة، بالإضافة إلى السماح لك بالحصول على عرض أسعار أو خدمات ما بعد البيع، أو التقدم للحصول على تمويل بسهولة.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-cream/70 text-sm sm:text-base leading-loose mb-4"
          >
            البحث عن سيارة تلبي احتياجاتك هو عمل شاق مليء بالتوقعات الكبيرة، ومما لا شك فيه اننا في شركة وسم للسيارات قمنا بتوفير مجموعة كبيرة ومتميزة من السيارات التي تفكر فيها.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-gold/80 font-bold text-sm sm:text-base"
          >
            فنحن في وسم للسيارات، نحن لسنا فقط موزعون سيارات بل نأمل أن نكون أول مستشار وأفضل اختيار.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-gold/60 font-bold text-sm mt-6"
          >
            — مع تحيات أسرة وسم للسيارات
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-px mt-8 origin-left"
            style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }}
          />
        </div>
      </div>
    </section>
  );
}
