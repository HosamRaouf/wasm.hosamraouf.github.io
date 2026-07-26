'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  {
    id: 'rules',
    title: 'قواعد المزادات',
    defaultOpen: true,
    items: [
      'جميع المزادات تبدأ بسعر ابتدائي محدد من البائع',
      'الحد الأدنى للزيادة هو 500 ريال سعودي',
      'يُضاف 3 دقائق تلقائياً لأي مزايدة خلال آخر 3 دقائق',
      'المزايد الأعلى في نهاية المزاد هو الفائز',
      'جميع المزادات ملزمة قانونياً بعد الفوز',
      'يحق لمنصة واصم إلغاء المزاد في حالات معينة',
    ],
  },
  {
    id: 'payment',
    title: 'شروط الدفع',
    defaultOpen: false,
    items: [
      'يجب سداد المبلغ الكامل خلال 48 ساعة من الفوز',
      'يُقبل الدفع عبر تحويل بنكي أو بطاقة ائتمان',
      'رسوم الخدمة 2.5% من مبلغ المزايدة الفائز',
      'يُصدر فاتورة رسمية معتمدة لكل صفقة',
      'الدفعة الأولى غير قابلة للاسترداد',
    ],
  },
  {
    id: 'cancellation',
    title: 'سياسة الإلغاء',
    defaultOpen: false,
    items: [
      'لا يمكن الإلغاء بعد الفوز في المزاد',
      'في حال عدم السداد خلال 48 ساعة، يُخصم 5% كغرامة',
      'يحق للبائع سحب السيارة قبل بدء المزاد فقط',
      'المنصة غير مسؤولة عن أي تغييرات في حالة السيارة',
      'يتم إتاحة فحص السيارة قبل المزاد للمهتمين',
    ],
  },
];

export default function RulesAccordion() {
  const [openId, setOpenId] = useState('rules');

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <div className="rounded-2xl border border-ember/15 bg-ember/[0.04] overflow-hidden">
      <div className="px-4 py-3 border-b border-ember/10">
        <h3 className="text-sm font-bold text-cream">الشروط والأحكام</h3>
      </div>

      {sections.map((section) => {
        const isOpen = openId === section.id;
        return (
          <div key={section.id} className="border-b border-ember/[0.08] last:border-b-0">
            <button
              onClick={() => toggle(section.id)}
              className="flex w-full items-center justify-between px-4 py-3 hover:bg-white/[0.02] transition-colors"
            >
              <span className="text-sm font-semibold text-cream">{section.title}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-muted"
              >
                <ChevronDown className="h-4 w-4" />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <ul className="px-4 pb-4 space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs leading-relaxed text-muted">
                        <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-gold/50" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
