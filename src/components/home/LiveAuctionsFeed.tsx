'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useInView, useMotionValue, animate } from 'framer-motion';
import { ArrowLeft, Gavel, Clock, MapPin, Flame, Gauge, Fuel, ChevronLeft, ChevronRight } from 'lucide-react';
import { cars } from '@/lib/data';
import { getAssetPath } from '@/lib/paths';

const auctionCars = cars.filter((c) => c.isAuction);

function AuctionGradientBg() {
  const background = useMotionValue(
    'radial-gradient(ellipse 60% 60% at 15% 40%, rgba(220,38,38,0.10), transparent 70%), radial-gradient(ellipse 50% 50% at 85% 60%, rgba(255,106,26,0.08), transparent 60%), radial-gradient(ellipse 40% 40% at 50% 90%, rgba(180,20,20,0.06), transparent 55%)'
  );

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches) return;

    const keyframes = [
      'radial-gradient(ellipse 60% 60% at 15% 40%, rgba(220,38,38,0.10), transparent 70%), radial-gradient(ellipse 50% 50% at 85% 60%, rgba(255,106,26,0.08), transparent 60%), radial-gradient(ellipse 40% 40% at 50% 90%, rgba(180,20,20,0.06), transparent 55%)',
      'radial-gradient(ellipse 60% 60% at 80% 25%, rgba(255,106,26,0.09), transparent 70%), radial-gradient(ellipse 50% 50% at 20% 75%, rgba(220,38,38,0.07), transparent 60%), radial-gradient(ellipse 40% 40% at 60% 10%, rgba(255,80,40,0.05), transparent 55%)',
      'radial-gradient(ellipse 60% 60% at 50% 80%, rgba(180,20,20,0.08), transparent 70%), radial-gradient(ellipse 50% 50% at 50% 20%, rgba(220,38,38,0.09), transparent 60%), radial-gradient(ellipse 40% 40% at 15% 60%, rgba(255,106,26,0.06), transparent 55%)',
      'radial-gradient(ellipse 60% 60% at 15% 40%, rgba(220,38,38,0.10), transparent 70%), radial-gradient(ellipse 50% 50% at 85% 60%, rgba(255,106,26,0.08), transparent 60%), radial-gradient(ellipse 40% 40% at 50% 90%, rgba(180,20,20,0.06), transparent 55%)',
    ];

    const controls = animate(background, keyframes, {
      duration: 12,
      repeat: Infinity,
      ease: 'easeInOut',
    });

    return () => controls.stop();
  }, [background]);

  return <motion.div className="absolute inset-0 pointer-events-none" style={{ background }} />;
}

function AuctionCard({ car }: { car: typeof auctionCars[number] }) {
  const endsAt = car.endsAt ?? 0;
  const [remaining, setRemaining] = useState(() => Math.max(0, endsAt - Date.now()));

  useEffect(() => {
    const id = setInterval(() => setRemaining(Math.max(0, endsAt - Date.now())), 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  const h = Math.floor(remaining / 3600000);
  const m = Math.floor((remaining % 3600000) / 60000);
  const s = Math.floor((remaining % 60000) / 1000);
  const isEnding = remaining > 0 && remaining < 5 * 60 * 1000;

  return (
    <Link
      href={`/auctions/${car.id}`}
      className="group block rounded-2xl border border-ember/15 bg-gradient-to-b from-ember/[0.06] to-charcoal/80 backdrop-blur-sm overflow-hidden hover:border-ember/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-ember/10"
    >
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={getAssetPath(car.image)}
          alt={car.nameAr}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />

        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-ember text-white text-xs font-bold shadow-lg shadow-ember/30">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          مباشر
        </div>

        <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold ${
          isEnding ? 'bg-danger text-white animate-pulse' : 'bg-obsidian/90 text-cream border border-white/10'
        }`}>
          <Clock size={12} />
          <span className="font-mono tabular-nums">{String(h).padStart(2, '0')}:{String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}</span>
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <span className="text-[10px] text-cream/50 font-bold block mb-0.5">أعلى سعر</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl sm:text-2xl font-black text-white drop-shadow-lg">{car.currentBid?.toLocaleString()}</span>
              <span className="text-xs font-bold text-cream/60">ر.س</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-ember/80 text-white text-xs font-bold">
            <Gavel size={12} />
            {car.bidCount}
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold text-ember">{car.brandAr}</span>
          <span className="w-1 h-1 rounded-full bg-muted/40" />
          <span className="text-xs text-muted">{car.year}</span>
        </div>
        <h3 className="font-bold text-cream text-sm mb-3 line-clamp-1">{car.nameAr}</h3>

        <div className="flex items-center gap-3 text-[11px] text-muted mb-3">
          <span className="flex items-center gap-1">
            <Gauge size={11} className="text-ember/70" />
            {car.power}
          </span>
          <span className="flex items-center gap-1">
            <Fuel size={11} className="text-ember/70" />
            {car.fuel === 'gasoline' ? 'بنزين' : car.fuel === 'diesel' ? 'ديزل' : 'كهرباء'}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={11} className="text-ember/70" />
            {car.location}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
          <span className="text-xs text-muted">{car.engine}</span>
          <span className="text-xs font-bold text-ember group-hover:underline">تفاصيل ←</span>
        </div>
      </div>
    </Link>
  );
}

export default function LiveAuctionsFeed() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = auctionCars.length;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setCurrent((i) => (i + 1) % total);
    }, 4000);
    return () => clearInterval(id);
  }, [paused, total]);

  const prev = () => setCurrent((i) => (i + 1) % total);
  const next = () => setCurrent((i) => (i - 1 + total) % total);

  return (
    <section ref={ref} className="relative overflow-hidden -mx-4 sm:-mx-6 lg:-mx-12 xl:-mx-16 px-4 sm:px-6 lg:px-12 xl:px-16 py-12 sm:py-16">
      <AuctionGradientBg />

      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-ember/40 to-transparent" />
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-ember/20 to-transparent blur-sm" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-ember/40 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-ember/20 to-transparent blur-sm" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Text info */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-ember/15 text-ember text-xs font-bold">
                <Flame size={14} />
                مباشر الآن
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-cream leading-snug mb-4">
              المزادات <span className="text-ember">الحية</span>
            </h2>
            <p className="text-cream/60 text-sm sm:text-base leading-relaxed mb-3">
              شارك في مزاد مباشر وتنافس مع المزايدين للحصول على سيارتك المفضلة بسعر لا يُقاوم. كل مزاد يحدث في الوقت الفعلي — سجّل عرضك قبل انتهاء الوقت.
            </p>
            <p className="text-cream/60 text-sm sm:text-base leading-relaxed mb-3">
              تتبع سير المزايدة لحظة بلحظة، شاهد عدد المزايدين والسعر الحالي، واستغل لحظة الهدوء لتقديم عرضك الأخير.
            </p>
            <ul className="flex flex-col gap-2 mt-4">
              <li className="flex items-center gap-2 text-sm text-cream/70">
                <span className="w-1.5 h-1.5 rounded-full bg-ember shrink-0" />
                مزادات حية بالوقت الفعلي مع عداد تنازلي مباشر
              </li>
              <li className="flex items-center gap-2 text-sm text-cream/70">
                <span className="w-1.5 h-1.5 rounded-full bg-ember shrink-0" />
                شراء فوري بأفضل الأسعار السوقية
              </li>
              <li className="flex items-center gap-2 text-sm text-cream/70">
                <span className="w-1.5 h-1.5 rounded-full bg-ember shrink-0" />
                فحص ميكانيكي شامل لكل سيارة قبل العرض
              </li>
            </ul>
          </div>

          <Link
            href="/auctions"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-ember text-white font-bold text-sm hover:bg-ember-bright transition-colors self-start"
          >
            عرض جميع المزادات
            <ArrowLeft size={16} />
          </Link>
        </motion.div>

        {/* Coverflow carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative h-[380px] sm:h-[440px] flex items-center justify-center">
            {auctionCars.map((car, i) => {
              const offset = ((i - current + total) % total);
              const wrapped = offset > total / 2 ? offset - total : offset;

              const isActive = wrapped === 0;
              const absOffset = Math.abs(wrapped);

              return (
                <motion.div
                  key={car.id}
                  className="absolute"
                  animate={{
                    x: wrapped * 240,
                    scale: isActive ? 1 : 0.75,
                    opacity: isActive ? 1 : absOffset === 1 ? 0.4 : 0.15,
                    zIndex: isActive ? 10 : 5 - absOffset,
                    filter: isActive ? 'blur(0px)' : `blur(${absOffset * 2}px)`,
                  }}
                  transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setCurrent(i)}
                  style={{ cursor: isActive ? 'default' : 'pointer' }}
                >
                  <div className="w-[260px] sm:w-[300px]">
                    <AuctionCard car={car} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Arrows + dots */}
          <div className="flex items-center justify-center gap-4 mt-2">
            <button
              onClick={prev}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-obsidian/80 backdrop-blur-sm text-cream hover:bg-ember/20 hover:border-ember/40 transition-all cursor-pointer"
              aria-label="المزاد السابق"
            >
              <ChevronRight size={20} />
            </button>

            <div className="flex items-center gap-2">
              {auctionCars.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === current ? 'bg-ember w-6' : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`المزاد ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-obsidian/80 backdrop-blur-sm text-cream hover:bg-ember/20 hover:border-ember/40 transition-all cursor-pointer"
              aria-label="المزاد التالي"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
