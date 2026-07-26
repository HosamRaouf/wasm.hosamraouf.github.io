'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import { Gavel, CheckCircle, Loader2, ShieldAlert } from 'lucide-react';
import VehicleSummaryStrip from '@/components/auction-room/VehicleSummaryStrip';
import AuctionGallery from '@/components/auction-room/AuctionGallery';
import CountdownTimer from '@/components/auction-room/CountdownTimer';
import BidHistoryPanel from '@/components/auction-room/BidHistoryPanel';
import RulesAccordion from '@/components/auction-room/RulesAccordion';
import { Car } from '@/lib/types';

const fakeImages = [
  '/assets/cars/suv_land_cruiser.jpg',
  '/assets/cars/suv_g_class.jpg',
  '/assets/cars/sedan_luxury.jpg',
  '/assets/cars/sports_orange.jpg',
  '/assets/cars/pickup_f150.jpg',
  '/assets/cars/suv_land_cruiser.jpg',
  '/assets/cars/suv_g_class.jpg',
  '/assets/cars/sedan_luxury.jpg',
  '/assets/cars/sports_orange.jpg',
  '/assets/cars/suv_land_cruiser.jpg',
];

const fakeBids = [
  { id: 'b1', bidder: 'المزايد #482', time: 'منذ 30 ثانية', amount: 545000, rank: 1 },
  { id: 'b2', bidder: 'المزايد #1093', time: 'منذ دقيقة', amount: 543500, rank: 2 },
  { id: 'b3', bidder: 'المزايد #76', time: 'منذ 2 دقيقة', amount: 541000, rank: 3 },
  { id: 'b4', bidder: 'المزايد #2204', time: 'منذ 4 دقائق', amount: 538000, rank: 4 },
  { id: 'b5', bidder: 'المزايد #482', time: 'منذ 6 دقائق', amount: 535500, rank: 5 },
  { id: 'b6', bidder: 'المزايد #911', time: 'منذ 8 دقائق', amount: 532000, rank: 6 },
  { id: 'b7', bidder: 'المزايد #334', time: 'منذ 12 دقيقة', amount: 530000, rank: 7 },
];

function AuctionGradientBg() {
  const background = useMotionValue(
    'radial-gradient(ellipse 80% 60% at 30% 40%, rgba(255,106,26,0.08), transparent 70%), radial-gradient(ellipse 60% 50% at 75% 65%, rgba(204,77,10,0.05), transparent 55%), radial-gradient(ellipse 70% 45% at 50% 85%, rgba(212,175,55,0.04), transparent 50%)'
  );

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches) return;

    const keyframes = [
      'radial-gradient(ellipse 80% 60% at 30% 40%, rgba(255,106,26,0.08), transparent 70%), radial-gradient(ellipse 60% 50% at 75% 65%, rgba(204,77,10,0.05), transparent 55%), radial-gradient(ellipse 70% 45% at 50% 85%, rgba(212,175,55,0.04), transparent 50%)',
      'radial-gradient(ellipse 80% 60% at 70% 30%, rgba(204,77,10,0.07), transparent 70%), radial-gradient(ellipse 60% 50% at 25% 70%, rgba(255,106,26,0.06), transparent 55%), radial-gradient(ellipse 70% 45% at 60% 15%, rgba(212,175,55,0.03), transparent 50%)',
      'radial-gradient(ellipse 80% 60% at 50% 75%, rgba(255,106,26,0.06), transparent 70%), radial-gradient(ellipse 60% 50% at 50% 20%, rgba(204,77,10,0.04), transparent 55%), radial-gradient(ellipse 70% 45% at 20% 55%, rgba(212,175,55,0.05), transparent 50%)',
      'radial-gradient(ellipse 80% 60% at 30% 40%, rgba(255,106,26,0.08), transparent 70%), radial-gradient(ellipse 60% 50% at 75% 65%, rgba(204,77,10,0.05), transparent 55%), radial-gradient(ellipse 70% 45% at 50% 85%, rgba(212,175,55,0.04), transparent 50%)',
    ];

    const controls = animate(background, keyframes, {
      duration: 20,
      repeat: Infinity,
      ease: 'easeInOut',
    });

    return () => controls.stop();
  }, [background]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background }}
    />
  );
}

export default function AuctionRoomClient({ car }: { car: Car }) {
  const [currentBid, setCurrentBid] = useState(car.currentBid ?? 0);
  const [leaderId, setLeaderId] = useState('المزايد #482');
  const [bidAmount, setBidAmount] = useState((car.currentBid ?? 0) + 500);
  const [endsAt, setEndsAt] = useState(() => car.endsAt ?? Date.now() + 3600000);
  const [bids, setBids] = useState(fakeBids);
  const [bidCount, setBidCount] = useState(car.bidCount ?? 0);
  const [bidState, setBidState] = useState<'idle' | 'processing' | 'accepted'>('idle');

  const handleExtend = useCallback(() => {
    setEndsAt((prev) => prev + 3 * 60 * 1000);
  }, []);

  const handlePlaceBid = () => {
    if (bidState !== 'idle') return;

    setBidState('processing');

    setTimeout(() => {
      setCurrentBid(bidAmount);
      setLeaderId('أنت');
      setBidCount((c) => c + 1);

      const newBid = {
        id: `b${Date.now()}`,
        bidder: 'أنت',
        time: 'الآن',
        amount: bidAmount,
        rank: 1,
      };

      setBids((prev) => {
        const updated = prev.map((b) => ({ ...b, rank: b.rank + 1 }));
        return [newBid, ...updated];
      });

      setBidAmount(bidAmount + 500);

      const timeLeft = endsAt - Date.now();
      if (timeLeft < 3 * 60 * 1000) {
        handleExtend();
      }

      setBidState('accepted');

      setTimeout(() => {
        setBidState('idle');
      }, 3000);
    }, 1200);
  };

  return (
    <div dir="rtl" className="relative min-h-dvh bg-obsidian text-cream font-cairo">
      <AuctionGradientBg />

      <div className="relative z-10">
        <VehicleSummaryStrip
          car={{
            id: car.id,
            nameAr: car.nameAr,
            year: car.year,
            mileage: car.mileage,
            location: car.location,
            fuel: car.fuel,
            color: car.color,
            image: car.image,
            bidCount,
          }}
        />

        <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6">
            {/* Left column: Gallery + Bid History */}
            <div className="lg:col-span-3 space-y-5 sm:space-y-6">
              <AuctionGallery
                images={fakeImages}
                mainImage={car.image}
                carName={car.nameAr}
              />

              <BidHistoryPanel bids={bids} />
            </div>

            {/* Right column: Sticky bid panel */}
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-28 space-y-3 sm:space-y-4">
                <CountdownTimer
                  endsAt={endsAt}
                  onExtend={handleExtend}
                />

                <div className="relative rounded-2xl border-2 border-ember/30 bg-ember/[0.06] backdrop-blur-sm overflow-hidden animate-pulse-border">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-ember via-gold to-ember animate-shimmer-gold" style={{ backgroundSize: '200% 100%' }} />

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-75" />
                          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ember" />
                        </span>
                        <span className="text-xs font-bold text-ember uppercase tracking-wider">المزايدة الحية</span>
                      </div>
                      <span className="rounded-full bg-ember/10 px-2.5 py-0.5 text-xs font-bold text-ember border border-ember/20">
                        مباشر
                      </span>
                    </div>

                    <div className="text-center py-4">
                      <p className="text-xs text-muted mb-2">أعلى مزايدة حالياً</p>
                      <p className="text-4xl font-black text-ember leading-none" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', textShadow: '0 0 30px rgba(255,106,26,0.4)' }}>
                        {currentBid.toLocaleString('ar-SA')}
                      </p>
                      <p className="text-sm font-semibold text-gold mt-1">ر.س</p>
                    </div>

                    <div className="flex items-center justify-center gap-2 mt-2 py-3 border-t border-b border-ember/10">
                      <span className="text-sm text-muted">المزايد المتصدر:</span>
                      <span className="text-sm font-bold text-gold">{leaderId}</span>
                    </div>

                    <div className="mt-4">
                      <p className="text-xs font-bold text-muted mb-3">مبلغ المزايدة</p>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            const next = bidAmount - 500;
                            if (next >= currentBid + 500) setBidAmount(next);
                          }}
                          disabled={bidAmount <= currentBid + 500}
                          className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl border-2 p-3 transition-all duration-200 ${
                            bidAmount <= currentBid + 500
                              ? 'border-white/[0.06] bg-white/[0.03] text-muted/40 cursor-not-allowed'
                              : 'border-ember/40 bg-ember/5 text-ember hover:bg-ember/15 hover:border-ember/60 active:scale-95'
                          }`}
                        >
                          <span className="text-lg font-bold">-</span>
                        </button>
                        <div className="relative flex-1">
                          <input
                            type="text"
                            readOnly
                            value={`${bidAmount.toLocaleString('ar-SA')} ر.س`}
                            className="w-full rounded-xl border border-ember/20 bg-obsidian/80 px-4 py-3 text-center text-xl font-black text-ember outline-none focus:border-ember/50 transition-colors"
                          />
                        </div>
                        <button
                          onClick={() => setBidAmount(bidAmount + 500)}
                          className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl border-2 border-ember/40 bg-ember/5 p-3 text-ember hover:bg-ember/15 hover:border-ember/60 active:scale-95 transition-all duration-200"
                        >
                          <span className="text-lg font-bold">+</span>
                        </button>
                      </div>
                      <p className="text-xs text-muted text-center mt-2">
                        الحد الأدنى للزيادة: 500 ر.س
                      </p>
                    </div>

                    <div className="mt-4 relative">
                      <AnimatePresence mode="wait">
                        {bidState === 'idle' && (
                          <motion.button
                            key="idle"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            onClick={handlePlaceBid}
                            className="w-full flex items-center justify-center gap-3 rounded-2xl ember-gradient-bg py-4 text-base sm:text-lg font-black text-white shadow-[0_4px_24px_rgba(255,106,26,0.35)] hover:shadow-[0_4px_32px_rgba(255,106,26,0.55)] transition-all duration-300 active:scale-[0.98] min-h-buttonXl cursor-pointer"
                          >
                            <Gavel className="h-6 w-6" />
                            زايد الآن
                          </motion.button>
                        )}

                        {bidState === 'processing' && (
                          <motion.div
                            key="processing"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full flex items-center justify-center gap-3 rounded-2xl bg-ember/10 border-2 border-ember/40 py-4 text-base sm:text-lg font-bold text-ember min-h-buttonXl"
                          >
                            <Loader2 className="h-6 w-6 animate-spin" />
                            جاري معالجة عرضك...
                          </motion.div>
                        )}

                        {bidState === 'accepted' && (
                          <motion.div
                            key="accepted"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full flex items-center justify-center gap-3 rounded-2xl bg-emerald-500/20 border-2 border-emerald-500/50 py-4 text-base sm:text-lg font-black text-emerald-400 min-h-buttonXl"
                          >
                            <CheckCircle className="h-6 w-6" />
                            تم قبول عرضك!
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="flex items-start gap-2.5 mt-4 rounded-xl bg-ember/[0.06] border border-ember/15 p-3">
                      <ShieldAlert className="h-5 w-5 text-ember flex-shrink-0 mt-0.5" />
                      <p className="text-xs leading-relaxed text-muted">
                        <span className="font-bold text-cream">الحماية من الالتقاط:</span>{' '}
                        أي عرض خلال 3 دقائق الأخيرة يمتد المزاد بـ 3 دقائق
                      </p>
                    </div>
                  </div>
                </div>

                <RulesAccordion />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
