'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Share2, Scale, Calendar, Gauge, Fuel, Cog } from 'lucide-react';
import { useCompareStore, useFavoriteStore, useToastStore } from '@/stores';

interface Car {
  id: string;
  name: string;
  nameAr: string;
  brand: string;
  brandAr: string;
  type: string;
  typeAr: string;
  year: number;
  mileage: number;
  transmission: string;
  fuel: string;
  color: string;
  colorEn: string;
  location: string;
  locationEn: string;
  price: number;
  startingBid: number | null;
  image: string;
  badge: string | null;
  isAuction: boolean;
  currentBid?: number;
  bidCount?: number;
  lastBidTime?: string;
  endsAt?: number;
}

interface CarCardProps {
  car: Car;
  variant?: 'default' | 'auction';
}

function formatNumber(n: number) {
  return n.toLocaleString('ar-SA');
}

function Countdown({ endsAt }: { endsAt: number }) {
  const [remaining, setRemaining] = useState(() => Math.max(0, Math.floor((endsAt - Date.now()) / 1000)));

  useEffect(() => {
    const tick = () => setRemaining(Math.max(0, Math.floor((endsAt - Date.now()) / 1000)));
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  const h = Math.floor(remaining / 3600);
  const m = Math.floor((remaining % 3600) / 60);
  const s = remaining % 60;

  if (remaining <= 0) return <span className="text-danger font-bold">انتهى</span>;

  return (
    <span className="font-mono text-ember font-bold animate-timer-glow tabular-nums">
      {String(h).padStart(2, '0')}:{String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
    </span>
  );
}

export default function CarCard({ car, variant = 'default' }: CarCardProps) {
  const isAuction = variant === 'auction' || car.isAuction;
  const { vehicles, addVehicle, removeVehicle } = useCompareStore();
  const isSelected = vehicles.some((v) => v.id === car.id);
  const { isFavorited, toggle: toggleFav } = useFavoriteStore();
  const { show } = useToastStore();
  const fav = isFavorited(car.id);

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSelected) {
      removeVehicle(car.id);
    } else {
      const ok = addVehicle({ id: car.id, name: car.nameAr, price: car.price, image: car.image });
      if (!ok) show('يمكنك مقارنة سيارتين فقط');
    }
  };

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFav(car.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    show('تم نسخ الرابط');
  };

  return (
    <Link
      href={`/cars/${car.id}`}
      className="group block rounded-xl sm:rounded-2xl bg-charcoal border border-white/[0.06] overflow-hidden transition-all duration-300 hover:border-gold/40 hover:-translate-y-[3px] hover:shadow-xl"
    >
      {/* Image area */}
      <div className="relative aspect-[16/10] overflow-hidden bg-charcoal-light">
        <img
          src={car.image}
          alt={car.nameAr}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-charcoal/90 to-transparent" />

        {isAuction && (
          <span className="absolute top-2 left-2 sm:top-3 sm:left-3 flex items-center gap-1.5 rounded-full bg-ember px-2.5 py-1 sm:px-3 text-xs font-bold text-white shadow-lg animate-pulse-border">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            مباشر
          </span>
        )}

        <span className="absolute top-2 right-2 sm:top-3 sm:right-3 rounded-full bg-obsidian/70 frosted-glass px-2.5 py-1 text-xs font-semibold text-cream/80">
          {car.typeAr}
        </span>

        <button
          onClick={handleCompare}
          className={`absolute bottom-2 left-2 sm:bottom-3 sm:left-3 flex h-touchSm w-touchSm items-center justify-center rounded-md border transition-all duration-200 ${
            isSelected
              ? 'gold-gradient-bg border-gold text-obsidian shadow-[0_0_12px_rgba(212,175,55,0.4)]'
              : 'border-white/20 bg-obsidian/60 frosted-glass text-cream/60 hover:border-gold/40'
          }`}
          aria-label="إضافة للمقارنة"
        >
          <Scale className="h-4 w-4" />
        </button>
      </div>

      {/* Card body */}
      <div className="px-3 sm:px-4 pt-2 pb-2">
        <h3 className="font-bold text-xs sm:text-sm text-cream leading-tight line-clamp-1">{car.nameAr}</h3>

        <div className="flex items-center gap-x-2 sm:gap-x-2.5 gap-y-1 mt-2 text-xs text-muted flex-wrap">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3 shrink-0" />
            {car.year}
          </span>
          <span className="flex items-center gap-1">
            <Gauge className="h-3 w-3 shrink-0" />
            {formatNumber(car.mileage)} كم
          </span>
          <span className="flex items-center gap-1">
            <Cog className="h-3 w-3 shrink-0" />
            {car.transmission === 'automatic' ? 'أوتوماتيك' : 'يدوي'}
          </span>
          <span className="flex items-center gap-1">
            <Fuel className="h-3 w-3 shrink-0" />
            {car.fuel === 'electric' ? 'كهرباء' : 'بنزين'}
          </span>
        </div>

        <p className="mt-2 text-md sm:text-lg font-extrabold text-gold">
          {formatNumber(car.price)} <span className="text-xs sm:text-sm font-semibold text-gold/60">ر.س</span>
        </p>

        {isAuction && car.currentBid != null && (
          <div className="mt-2 flex items-center justify-between rounded-xl bg-ember/[0.06] border border-ember/15 px-3 py-2">
            <div>
              <p className="text-xs text-muted">أعلى مزايدة</p>
              <p className="text-xs sm:text-sm font-bold text-ember">{formatNumber(car.currentBid)} ر.س</p>
            </div>
            <div className="text-left">
              <p className="text-xs text-muted">{car.bidCount} مزايدة</p>
              {car.endsAt != null && <Countdown endsAt={car.endsAt} />}
            </div>
          </div>
        )}
      </div>

      {/* Card footer */}
      <div className="flex items-center justify-between border-t border-white/[0.04] px-3 sm:px-4 py-2 sm:py-2.5">
        <button
          onClick={handleFav}
          className="flex h-touchSm w-touchSm items-center justify-center rounded-md hover:bg-white/5 transition-colors"
          aria-label="إضافة للمفضلة"
        >
          <Heart
            className={`h-iconMd w-iconMd transition-colors ${fav ? 'fill-danger text-danger' : 'text-cream/40 hover:text-danger'}`}
          />
        </button>
        <button
          onClick={handleShare}
          className="flex h-touchSm w-touchSm items-center justify-center rounded-md text-cream/40 hover:text-cream hover:bg-white/5 transition-colors"
          aria-label="مشاركة"
        >
          <Share2 className="h-iconMd w-iconMd" />
        </button>
        <button
          onClick={handleCompare}
          className={`flex h-touchSm w-touchSm items-center justify-center rounded-md transition-colors ${
            isSelected ? 'text-gold bg-gold/10' : 'text-cream/40 hover:text-gold hover:bg-white/5'
          }`}
          aria-label="مقارنة"
        >
          <Scale className="h-iconMd w-iconMd" />
        </button>
      </div>
    </Link>
  );
}
