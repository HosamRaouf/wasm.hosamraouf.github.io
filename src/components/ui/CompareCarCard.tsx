'use client';

import { Check, Calendar, Gauge, Fuel, Cog, Scale } from 'lucide-react';
import { useCompareStore, useToastStore } from '@/stores';

interface Car {
  id: string;
  nameAr: string;
  brandAr: string;
  typeAr: string;
  year: number;
  mileage: number;
  transmission: string;
  fuel: string;
  price: number;
  image: string;
}

function formatNumber(n: number) {
  return n.toLocaleString('ar-SA');
}

export default function CompareCarCard({ car }: { car: Car }) {
  const { vehicles, addVehicle, removeVehicle } = useCompareStore();
  const { show } = useToastStore();
  const isSelected = vehicles.some((v) => v.id === car.id);

  const handleToggle = () => {
    if (isSelected) {
      removeVehicle(car.id);
    } else {
      const ok = addVehicle({ id: car.id, name: car.nameAr, price: car.price, image: car.image });
      if (!ok) show('يمكنك مقارنة سيارتين فقط');
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`group relative w-full text-right rounded-xl sm:rounded-2xl bg-charcoal border overflow-hidden transition-all duration-300 cursor-pointer focus:outline-none ${
        isSelected
          ? 'border-gold shadow-[0_0_20px_rgba(212,175,55,0.15)] -translate-y-[2px]'
          : 'border-white/[0.06] hover:border-gold/40 hover:-translate-y-[2px] hover:shadow-xl'
      }`}
    >
      {/* Selected checkmark */}
      {isSelected && (
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full gold-gradient-bg shadow-[0_0_10px_rgba(212,175,55,0.4)]">
          <Check size={14} className="text-obsidian" strokeWidth={3} />
        </div>
      )}

      {/* Image area */}
      <div className="relative aspect-[16/10] overflow-hidden bg-charcoal-light">
        <img
          src={car.image}
          alt={car.nameAr}
          className={`h-full w-full object-cover transition-transform duration-500 ${
            isSelected ? 'scale-[1.03]' : 'group-hover:scale-[1.06]'
          }`}
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-charcoal/90 to-transparent" />

        <span className="absolute top-2 left-2 sm:top-3 sm:left-3 rounded-full bg-obsidian/70 frosted-glass px-2.5 py-1 text-xs font-semibold text-cream/80">
          {car.typeAr}
        </span>
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
      </div>

      {/* Footer hint */}
      <div className={`flex items-center justify-center gap-2 border-t px-3 sm:px-4 py-2 sm:py-2.5 transition-colors ${
        isSelected ? 'border-gold/20 bg-gold/[0.04]' : 'border-white/[0.04]'
      }`}>
        <Scale className={`h-iconSm w-iconSm ${isSelected ? 'text-gold' : 'text-cream/30'}`} />
        <span className={`text-xs font-cairo ${isSelected ? 'text-gold font-semibold' : 'text-cream/30'}`}>
          {isSelected ? 'مختار للمقارنة' : 'اضغط للمقارنة'}
        </span>
      </div>
    </button>
  );
}
