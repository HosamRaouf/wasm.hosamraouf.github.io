'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ShieldCheck, BadgeCheck, Globe, MapPin, Phone, Clock } from 'lucide-react';
import { getAssetPath } from '@/lib/paths';

const sections = {
  sections: {
    title: 'الأقسام',
    links: [
      { label: 'السيارات', href: '/cars' },
      { label: 'المزادات', href: '/auctions' },
      { label: 'العلامات', href: '/brands' },
      { label: 'الفاخرة', href: '/luxury' },
      { label: 'المقارنة', href: '/compare' },
    ],
  },
  company: {
    title: 'الشركة',
    links: [
      { label: 'من نحن', href: '/about' },
      { label: 'الشركاء', href: '/partners' },
      { label: 'الوظائف', href: '/careers' },
      { label: 'المدونة', href: '/blog' },
      { label: 'اتصل بنا', href: '/contact' },
    ],
  },
  support: {
    title: 'الدعم',
    links: [
      { label: 'كيف تعمل المزادات', href: '/how-auctions-work' },
      { label: 'سياسة الإرجاع', href: '/returns' },
      { label: 'الشروط', href: '/terms' },
      { label: 'الخصوصية', href: '/privacy' },
      { label: 'التحقق من السيارة', href: '/vehicle-verification' },
    ],
  },
};

const socials = [
  { label: 'Twitter', icon: 'X' },
  { label: 'Instagram', icon: 'I' },
  { label: 'Snapchat', icon: 'S' },
  { label: 'TikTok', icon: 'T' },
  { label: 'YouTube', icon: 'Y' },
];

const trustBadges = [
  { icon: ShieldCheck, label: 'محمي بـ SSL' },
  { icon: BadgeCheck, label: 'منصة موثقة' },
  { icon: Globe, label: 'معتمدة في المملكة' },
];

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const start = performance.now();

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const draw = (now: number) => {
      const elapsed = prefersReducedMotion ? 0 : (now - start) / 1000;
      const t = (elapsed / 16) % 1; // 16s loop

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Gold radial glow 1
      const x1 = canvas.width * (0.3 + 0.4 * Math.sin(t * Math.PI * 2));
      const y1 = canvas.height * 0.6;
      const grad1 = ctx.createRadialGradient(x1, y1, 0, x1, y1, canvas.width * 0.5);
      grad1.addColorStop(0, 'rgba(212, 175, 55, 0.08)');
      grad1.addColorStop(1, 'rgba(212, 175, 55, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Gold radial glow 2
      const x2 = canvas.width * (0.7 + 0.3 * Math.cos(t * Math.PI * 2));
      const y2 = canvas.height * 0.4;
      const grad2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, canvas.width * 0.4);
      grad2.addColorStop(0, 'rgba(207, 120, 40, 0.06)');
      grad2.addColorStop(1, 'rgba(207, 120, 40, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (!prefersReducedMotion) {
        animationId = requestAnimationFrame(draw);
      }
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <footer className="relative bg-gold/[0.04] border-t border-gold/10 text-cream/80 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-6 sm:pb-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-8 mb-10 sm:mb-12">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img
              src={getAssetPath("/assets/wasm-transparent.png")}
              alt="WASM"
              className="h-10 w-auto object-contain mb-3 sm:mb-4"
            />
            <p className="text-sm leading-relaxed text-cream/50 max-w-xs">
              منصة السيارات الفاخرة الأولى في المملكة العربية السعودية. اكتشف أرقى السيارات المعروضة في المزادات المباشرة.
            </p>
            <div className="flex items-center gap-2.5 sm:gap-3 mt-5 sm:mt-6">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex h-touchSm w-touchSm items-center justify-center rounded-md border border-white/10 bg-white/5 text-cream/50 hover:text-gold hover:border-gold/30 transition-colors"
                >
                  <span className="text-xs font-bold">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {(Object.values(sections) as { title: string; links: { label: string; href: string }[] }[]).map(
            (col) => (
              <div key={col.title}>
                <h4 className="font-semibold text-sm text-gold mb-3 sm:mb-4">{col.title}</h4>
                <ul className="space-y-2 sm:space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-cream/50 hover:text-cream hover:translate-x-0.5 inline-block transition-all duration-200 min-h-[32px] leading-8"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}

          {/* Contact & Location */}
          <div className="sm:col-span-2 lg:col-span-2">
            <h4 className="font-semibold text-sm text-gold mb-3 sm:mb-4">تواصل معنا</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
                <span className="text-sm text-cream/60">2507 وادي الغرارة، القادسية، الرياض</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-gold mt-0.5 shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="tel:0556357546" className="text-sm text-cream/60 hover:text-gold transition-colors">مبيعات: 0556357546</a>
                  <a href="tel:0530307097" className="text-sm text-cream/60 hover:text-gold transition-colors">مبيعات: 0530307097</a>
                  <a href="tel:0507666730" className="text-sm text-cream/60 hover:text-gold transition-colors">اتصل بنا: 0507666730</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={16} className="text-gold mt-0.5 shrink-0" />
                <div className="text-sm text-cream/60">
                  <p>السبت — الخميس: 8:45ص — 1م | 3:45م — 9:30م</p>
                  <p>الجمعة: 3:45م — 9:30م</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-5 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-xs text-cream/40 text-center sm:text-right">
            &copy; 2026 WASM. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-3 sm:gap-5 flex-wrap justify-center">
            {trustBadges.map((b) => (
              <span key={b.label} className="flex items-center gap-1.5 text-xs text-cream/40">
                <b.icon className="h-iconXs w-iconXs text-gold/60" />
                {b.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
