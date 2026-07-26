'use client';

import { useEffect, useRef, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, ArrowLeft, Gauge, Fuel } from 'lucide-react';
import { cars } from '@/lib/data';

/* ─── Animated Gradient Background ─────────────────────────── */
function AnimatedGradient() {
  const ref = useRef<HTMLDivElement>(null);
  const bloomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const bloomEl = bloomRef.current;
    if (!el || !bloomEl) return;

    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches) {
      el.style.setProperty(
        '--gradient',
        [
          'radial-gradient(ellipse 80% 50% at 30% 30%, rgba(212,175,55,0.10), transparent 65%)',
          'radial-gradient(ellipse 70% 55% at 70% 60%, rgba(255,106,26,0.06), transparent 55%)',
          'radial-gradient(ellipse 75% 45% at 50% 80%, rgba(245,213,121,0.05), transparent 50%)',
        ].join(', '),
      );
      return;
    }

    const DURATION = 22000;
    let start: number | null = null;
    let raf: number;

    const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    /* Organic keyframes — wide travel across full width */
    const keyframes = [
      { x1: 15, y1: 15, x2: 85, y2: 25, x3: 55, y3: 75, x4: 90, y4: 70, x5: 35, y5: 35 },
      { x1: 80, y1: 60, x2: 15, y2: 75, x3: 45, y3: 20, x4: 20, y4: 35, x5: 80, y5: 65 },
      { x1: 50, y1: 85, x2: 70, y2: 10, x3: 85, y3: 50, x4: 55, y4: 15, x5: 15, y5: 80 },
      { x1: 85, y1: 20, x2: 25, y2: 65, x3: 30, y3: 80, x4: 75, y4: 55, x5: 65, y5: 20 },
      { x1: 15, y1: 15, x2: 85, y2: 25, x3: 55, y3: 75, x4: 90, y4: 70, x5: 35, y5: 35 },
    ];

    const tick = (now: number) => {
      if (!start) start = now;
      const elapsed = now - start;
      const progress = (elapsed % DURATION) / DURATION;
      const segment = progress * (keyframes.length - 1);
      const idx = Math.floor(segment);
      const t = easeInOutSine(segment - idx);

      const k0 = keyframes[idx];
      const k1 = keyframes[Math.min(idx + 1, keyframes.length - 1)];

      const x1 = lerp(k0.x1, k1.x1, t);
      const y1 = lerp(k0.y1, k1.y1, t);
      const x2 = lerp(k0.x2, k1.x2, t);
      const y2 = lerp(k0.y2, k1.y2, t);
      const x3 = lerp(k0.x3, k1.x3, t);
      const y3 = lerp(k0.y3, k1.y3, t);
      const x4 = lerp(k0.x4, k1.x4, t);
      const y4 = lerp(k0.y4, k1.y4, t);
      const x5 = lerp(k0.x5, k1.x5, t);
      const y5 = lerp(k0.y5, k1.y5, t);

      /* 6 gradient layers — wide ellipses spanning full width */
      el.style.setProperty(
        '--gradient',
        [
          `radial-gradient(ellipse 80% 45% at ${x1}% ${y1}%, rgba(212,175,55,0.14), transparent 60%)`,
          `radial-gradient(ellipse 70% 50% at ${x2}% ${y2}%, rgba(255,106,26,0.09), transparent 55%)`,
          `radial-gradient(ellipse 75% 40% at ${x3}% ${y3}%, rgba(245,213,121,0.07), transparent 50%)`,
          `radial-gradient(ellipse 85% 50% at ${x4}% ${y4}%, rgba(204,77,10,0.08), transparent 55%)`,
          `radial-gradient(ellipse 65% 45% at ${x5}% ${y5}%, rgba(212,175,55,0.10), transparent 50%)`,
          `radial-gradient(ellipse 90% 60% at ${50 + (x1 - 50) * 0.3}% ${50 + (y2 - 50) * 0.3}%, rgba(245,240,230,0.03), transparent 65%)`,
        ].join(', '),
      );

      /* Bloom halos — wide spread covering full width */
      bloomEl.style.setProperty(
        '--bloom',
        [
          `radial-gradient(circle 500px at ${x1 + 5}% ${y1 + 8}%, rgba(212,175,55,0.07), transparent)`,
          `radial-gradient(circle 450px at ${100 - x2}% ${100 - y2}%, rgba(255,106,26,0.05), transparent)`,
        ].join(', '),
      );

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Primary animated gradient */}
      <div
        ref={ref}
        className="absolute inset-0 will-change-[background]"
        style={{ background: 'var(--gradient)' }}
      />
      {/* Bloom halos — separate layer for depth */}
      <div
        ref={bloomRef}
        className="absolute inset-0 will-change-[background] mix-blend-screen"
        style={{ background: 'var(--bloom)' }}
      />
      {/* Film grain texture — luxury tactile feel */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />
      {/* Cinematic vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_35%,rgba(11,11,13,0.5))]" />
    </div>
  );
}

const featuredCars = [
  cars.find(c => c.id === '5')!,  // Mercedes G63 AMG
  cars.find(c => c.id === '4')!,  // BMW X7 M60i
  cars.find(c => c.id === '11')!, // Audi RS e-tron GT
  cars.find(c => c.id === '2')!,  // Mercedes S500 AMG Line
  cars.find(c => c.id === '3')!,  // Toyota Land Cruiser VX
];

const floatingDots = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 5,
  duration: Math.random() * 4 + 4,
}));

function HeroCarCard({ car, isActive }: { car: typeof cars[number]; isActive?: boolean }) {
  return (
    <Link
      href={`/cars/${car.id}`}
      className={`block w-[220px] sm:w-[260px] rounded-xl border backdrop-blur-sm overflow-hidden transition-all duration-300 ${
        isActive
          ? 'border-gold bg-gradient-to-b from-gold/[0.12] to-charcoal/90 shadow-[0_0_30px_rgba(212,175,55,0.25)]'
          : 'border-gold/15 bg-charcoal/80 hover:border-gold/40'
      }`}
    >
      <div className="relative h-32 sm:h-40 overflow-hidden">
        <img
          src={car.image}
          alt={car.nameAr}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
        <div className="absolute bottom-2 left-2 right-2">
          <div className="flex items-baseline gap-1">
            <span className="text-lg sm:text-xl font-black text-white drop-shadow-lg">{car.price.toLocaleString('ar-SA')}</span>
            <span className="text-[10px] font-bold text-cream/60">ر.س</span>
          </div>
        </div>
      </div>
      <div className="p-3 text-center">
        <div className="flex items-center justify-center gap-2 mb-1.5">
          <span className="text-[10px] font-bold text-gold">{car.brandAr}</span>
          <span className="w-0.5 h-0.5 rounded-full bg-muted/40" />
          <span className="text-[10px] text-muted">{car.year}</span>
        </div>
        <h3 className="font-bold text-cream text-xs mb-2 line-clamp-1">{car.nameAr}</h3>
        <div className="flex items-center justify-center gap-2 text-[10px] text-muted">
          <span className="flex items-center gap-1">
            <Gauge size={10} className="text-gold/70" />
            {car.power}
          </span>
          <span className="flex items-center gap-1">
            <Fuel size={10} className="text-gold/70" />
            {car.fuel === 'gasoline' ? 'بنزين' : car.fuel === 'diesel' ? 'ديزل' : 'كهرباء'}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Hero() {
  const memoizedDots = useMemo(() => floatingDots, []);
  const [ready, setReady] = useState(false);
  const [current, setCurrent] = useState(0);
  const total = featuredCars.length;

  useEffect(() => {
    if ((window as any).__splashDone) {
      setReady(true);
      return;
    }
    const onSplashDone = () => setReady(true);
    window.addEventListener('splash-done', onSplashDone);
    return () => window.removeEventListener('splash-done', onSplashDone);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((i) => (i + 1) % total);
    }, 4000);
    return () => clearInterval(id);
  }, [total]);

  const show = ready;

  return (
    <section className="relative h-[calc(100dvh-130px)] sm:h-[calc(100dvh-144px)] flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Background layers */}
      <div className="absolute inset-0">
        {/* Background image */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat origin-center"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={show ? { opacity: 0.3, scale: 1 } : {}}
          transition={{ duration: 2, ease: 'easeOut' }}
          style={{ backgroundImage: '/assets/hero-bg.png' }}
        />

        {/* Fade to black — bottom */}
        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent" />

        {/* Fade to black — top */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-obsidian/60 to-transparent" />

        {/* Animated black blocks — drifting shadows */}
        <motion.div
          className="absolute w-[50%] h-[40%] rounded-full bg-obsidian/50 blur-3xl"
          animate={{
            x: ['-30%', '10%', '-15%', '-30%'],
            y: ['-20%', '20%', '5%', '-20%'],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[45%] h-[35%] rounded-full bg-obsidian/60 blur-3xl"
          animate={{
            x: ['20%', '-20%', '10%', '20%'],
            y: ['30%', '-10%', '15%', '30%'],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[40%] h-[30%] rounded-full bg-obsidian/40 blur-2xl"
          animate={{
            x: ['-10%', '25%', '-20%', '-10%'],
            y: ['-10%', '30%', '0%', '-10%'],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[35%] h-[25%] rounded-full bg-obsidian/45 blur-3xl"
          animate={{
            x: ['10%', '-15%', '5%', '10%'],
            y: ['-15%', '10%', '-5%', '-15%'],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Animated gradient background */}
        <AnimatedGradient />

        {/* Static base glow for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_50%_at_50%_-20%,rgba(212,175,55,0.06),transparent)]" />

        {/* Floating particles */}
        {memoizedDots.map((dot) => (
          <motion.div
            key={dot.id}
            className="absolute rounded-full bg-gold/20 will-change-transform"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: dot.size,
              height: dot.size,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, dot.id % 2 === 0 ? 15 : -15, 0],
              opacity: [0.15, 0.4, 0.15],
            }}
            transition={{
              duration: dot.duration,
              delay: dot.delay,
              repeat: Infinity,
              ease: [0.45, 0, 0.55, 1],
            }}
          />
        ))}

        {/* Decorative rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] pointer-events-none">
          <div className="absolute inset-0 rounded-full border border-gold/[0.04] animate-rotate-slow" />
          <div className="absolute inset-8 rounded-full border border-gold/[0.06] animate-rotate-slow [animation-direction:reverse] [animation-duration:40s]" />
          <div className="absolute inset-16 rounded-full border border-gold/[0.03] animate-rotate-slow [animation-duration:55s]" />
        </div>

        {/* Decorative lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]" aria-hidden="true">
          <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 8" className="animate-dash-flow" />
          <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 8" className="animate-dash-flow" style={{ animationDirection: 'reverse' }} />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left column — Logo, Divider, Tagline */}
        <div className="flex flex-col items-center text-center gap-0">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={show ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-visible origin-center"
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 blur-3xl opacity-40 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(212,175,55,0.6) 0%, rgba(245,213,121,0.3) 40%, transparent 70%)',
              }}
            />
            <img
              src="/assets/wasm-transparent.png"
              alt="WASM"
              className="relative h-32 sm:h-40 lg:h-48 xl:h-56 w-auto object-contain drop-shadow-[0_0_30px_rgba(212,175,55,0.4)] drop-shadow-[0_0_60px_rgba(212,175,55,0.2)]"
            />
          </motion.div>

          <div className="h-4 sm:h-10" />

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={show ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="w-24 h-px origin-center"
            style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
          />

          <div className="h-4 sm:h-10" />

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <p className="text-cream/80 font-cairo leading-relaxed" style={{ fontSize: 'clamp(14px, 2vw, 18px)' }}>
              منصة السيارات الفاخرة الأولى في المملكة العربية السعودية
            </p>
            <p className="text-cream/50 font-cairo mt-1" style={{ fontSize: 'clamp(12px, 1.5vw, 14px)' }}>
              اشترِ، بِع، وتنافس على أفضل السيارات
            </p>
          </motion.div>
        </div>

        {/* Right column — Title, Description, Cylinder, CTA */}
        <div className="flex flex-col items-center text-center justify-center gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gold font-cairo mb-2">صفقة رابحة</h2>
            <p className="text-cream/50 text-xs sm:text-sm font-cairo max-w-md leading-relaxed">
              سيارات فاخرة بأسعار استثنائية وعروض حصرية لا تُفوّت — تصفّح الآن واحجز صفقة حياتك
            </p>
          </motion.div>

          {/* Cylinder Carousel with arrows */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[480px]"
          >
            <div className="flex items-center gap-3">
              {/* Left arrow */}
              <button
                onClick={() => setCurrent((i) => (i + 1) % total)}
                className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full border border-gold/30 bg-charcoal/60 backdrop-blur-sm text-gold hover:bg-gold/10 hover:border-gold/50 transition-all cursor-pointer"
                aria-label="السابق"
              >
                <ChevronRight size={20} />
              </button>

              {/* Cylinder */}
              <div className="relative h-[280px] sm:h-[320px] flex-1 flex items-center justify-center overflow-hidden" style={{ perspective: '900px', perspectiveOrigin: '50% 50%' }}>
                {featuredCars.map((car, i) => {
                  const offset = ((i - current + total) % total);
                  const wrapped = offset > total / 2 ? offset - total : offset;
                  const isActive = wrapped === 0;

                  const angleDeg = wrapped * (360 / total);
                  const angleRad = (angleDeg * Math.PI) / 180;
                  const radius = 180;

                  const xPos = Math.sin(angleRad) * radius;
                  const zPos = (1 - Math.cos(angleRad)) * radius;
                  const rotateY = angleDeg;

                  const scale = isActive ? 1 : 1 - zPos / (radius * 4);
                  const opacity = isActive ? 1 : Math.max(0.15, 1 - zPos / (radius * 1.5));

                  return (
                    <motion.div
                      key={car.id}
                      className="absolute"
                      animate={{
                        x: xPos,
                        z: -zPos,
                        rotateY,
                        scale,
                        opacity,
                        zIndex: isActive ? 10 : Math.round((1 - zPos / (radius * 2)) * 10),
                      }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      onClick={() => setCurrent(i)}
                      style={{ cursor: isActive ? 'default' : 'pointer', transformStyle: 'preserve-3d' }}
                    >
                      <HeroCarCard car={car} isActive={isActive} />
                    </motion.div>
                  );
                })}
              </div>

              {/* Right arrow */}
              <button
                onClick={() => setCurrent((i) => (i - 1 + total) % total)}
                className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full border border-gold/30 bg-charcoal/60 backdrop-blur-sm text-gold hover:bg-gold/10 hover:border-gold/50 transition-all cursor-pointer"
                aria-label="التالي"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/cars"
              className="group relative flex items-center gap-2 px-8 py-4 rounded-xl gold-gradient-bg text-obsidian font-cairo font-bold text-base transition-all duration-300 hover:scale-[1.02] min-h-touchLg whitespace-nowrap shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)]"
            >
              <span className="absolute inset-0 rounded-xl gold-gradient-bg opacity-50 blur-md -z-10" />
              استكشف جميع السيارات
              <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : {}}
        transition={{ delay: 3.8, duration: 1 }}
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20"
      >
        <button
          type="button"
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-2 text-muted/40 hover:text-gold transition-colors cursor-pointer group outline-none"
          aria-label="اكتشف المزيد"
        >
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs tracking-widest font-cairo uppercase group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)] transition-all">اكتشف المزيد</span>
            <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center pt-2 group-hover:border-gold/80 transition-colors">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ChevronDown size={14} />
              </motion.div>
            </div>
          </motion.span>
        </button>
      </motion.div>
    </section>
  );
}
