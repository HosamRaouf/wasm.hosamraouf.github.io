'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Gauge, Palette, Cog, Fuel, MapPin,
  Zap, Weight, Ruler, Car, Snowflake, CircleDot,
  ShieldCheck, FileText, Eye,
} from 'lucide-react';

interface Car {
  year: number;
  mileage: number;
  color: string;
  colorEn: string;
  transmission: string;
  fuel: string;
  location: string;
  locationEn: string;
  engine: string;
  power: string;
  torque: string;
  drivetrain: string;
  acceleration: string;
  fuelEconomy: string;
  dimensions: string;
  weight: string;
  interior: string;
  wheels: string;
  climate: string;
  nameAr: string;
  brandAr: string;
}

interface SpecTabsProps {
  car: Car;
}

const OVERVIEW_ATTRS = [
  { key: 'year', label: 'السنة', icon: Calendar, getValue: (c: Car) => String(c.year) },
  { key: 'mileage', label: 'المسافة', icon: Gauge, getValue: (c: Car) => `${c.mileage.toLocaleString()} كم` },
  { key: 'color', label: 'اللون', icon: Palette, getValue: (c: Car) => c.color },
  { key: 'transmission', label: 'ناقل الحركة', icon: Cog, getValue: (c: Car) => c.transmission === 'automatic' ? 'أوتوماتيك' : 'يدوي' },
  { key: 'fuel', label: 'الوقود', icon: Fuel, getValue: (c: Car) => c.fuel === 'electric' ? 'كهرباء' : c.fuel === 'diesel' ? 'ديزل' : 'بنزين' },
  { key: 'location', label: 'الموقع', icon: MapPin, getValue: (c: Car) => c.location },
];

const FEATURES = [
  'كاميرا 360°', 'نظام ملاحة', 'مقاعد مساج', 'سقف بانورامي',
  'تكييف ثنائي المنطقة', 'نظام صوت محيطي', 'إضاءة محيطية',
  'فتحة سقف كهربائية', 'مقاعد مدفأة ومبردة', 'نظام تعليق هوائي',
];

const SPECS_GRID = [
  { label: 'المحرك', icon: Cog, getValue: (c: Car) => c.engine },
  { label: 'القوة', icon: Zap, getValue: (c: Car) => c.power },
  { label: 'العزم', icon: Gauge, getValue: (c: Car) => c.torque },
  { label: 'نظام الدفع', icon: Car, getValue: (c: Car) => c.drivetrain },
  { label: 'التسارع 0-100', icon: Zap, getValue: (c: Car) => c.acceleration },
  { label: 'استهلاك الوقود', icon: Fuel, getValue: (c: Car) => c.fuelEconomy },
  { label: 'الأبعاد', icon: Ruler, getValue: (c: Car) => c.dimensions },
  { label: 'الوزن', icon: Weight, getValue: (c: Car) => c.weight },
  { label: 'الداخلي', icon: Eye, getValue: (c: Car) => c.interior },
  { label: 'الجنطات', icon: CircleDot, getValue: (c: Car) => c.wheels },
  { label: 'التكييف', icon: Snowflake, getValue: (c: Car) => c.climate },
  { label: 'ناقل الحركة', icon: Cog, getValue: (c: Car) => c.transmission === 'automatic' ? 'أوتوماتيك 8 سرعات' : 'يدوي 6 سرعات' },
  { label: 'نظام الدفع', icon: Car, getValue: (c: Car) => c.drivetrain === 'AWD' ? 'دفع رباعي' : c.drivetrain === 'RWD' ? 'دفع خلفي' : 'دفع أمامي' },
  { label: 'نوع الوقود', icon: Fuel, getValue: (c: Car) => c.fuel === 'electric' ? 'كهرباء بالكامل' : c.fuel === 'diesel' ? 'ديزل' : 'بنزين' },
  { label: 'نظام الفرامل', icon: ShieldCheck, getValue: () => 'ABS + EBD + ESP' },
  { label: 'مدة الضمان', icon: FileText, getValue: () => '5 سنوات / 150,000 كم' },
];

const TABS = [
  { id: 'overview' as const, label: 'نظرة عامة' },
  { id: 'specs' as const, label: 'المواصفات' },
];

export default function SpecTabs({ car }: SpecTabsProps) {
  const [active, setActive] = useState<'overview' | 'specs'>('overview');

  return (
    <div className="flex flex-col gap-4">
      {/* Tabs */}
      <div className="flex items-center gap-1 rounded-xl bg-charcoal p-1">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`relative flex-1 px-4 py-2.5 rounded-md text-sm font-bold transition-all duration-200 ${
              active === t.id
                ? 'text-obsidian'
                : 'text-muted hover:text-cream'
            }`}
          >
            {active === t.id && (
                <motion.div
                  layoutId="spec-tab-active"
                  className="absolute inset-0 gold-gradient-bg rounded-md shadow-ember"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
            )}
            <span className="relative z-10">{t.label}</span>
          </button>
        ))}
      </div>

      {/* Panels */}
      <AnimatePresence mode="wait">
        {active === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-5"
          >
            {/* Attribute cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {OVERVIEW_ATTRS.map((attr) => {
                const Icon = attr.icon;
                return (
                  <div
                    key={attr.key}
                    className="flex flex-col gap-2 p-4 rounded-xl bg-charcoal border border-subtle-border hover:border-gold/20 transition-colors"
                  >
                    <div className="flex items-center gap-2 text-muted">
                      <Icon size={14} />
                      <span className="text-xs font-semibold">{attr.label}</span>
                    </div>
                    <span className="text-sm font-bold text-cream">{attr.getValue(car)}</span>
                  </div>
                );
              })}
            </div>

            {/* Description */}
            <div className="p-5 rounded-xl bg-charcoal border border-subtle-border">
              <h3 className="text-sm font-bold text-cream mb-3">وصف السيارة</h3>
              <p className="text-sm text-muted leading-relaxed">
                {car.nameAr} موديل {car.year} بحالة ممتازة، فحص شامل موثّق.
                الممشى {car.mileage.toLocaleString()} كم فقط. اللون {car.color} مع داخلي فاخر.
                مجهّزة بأحدث أنظمة الأمان والراحة. مثالية لمن يبحث عن الفخامة والأداء.
              </p>
            </div>

            {/* Features chips */}
            <div>
              <h3 className="text-sm font-bold text-cream mb-3">المميزات</h3>
              <div className="flex flex-wrap gap-2">
                {FEATURES.map((f) => (
                  <span
                    key={f}
                    className="px-3 py-1.5 rounded-md bg-charcoal border border-subtle-border text-xs font-semibold text-cream hover:border-gold/30 transition-colors cursor-default"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {active === 'specs' && (
          <motion.div
            key="specs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl bg-charcoal border border-subtle-border overflow-hidden"
          >
            {SPECS_GRID.map((spec, i) => {
              const Icon = spec.icon;
              return (
                  <div
                    key={spec.label}
                    className={`flex items-center justify-between px-5 py-3.5 ${
                    i < SPECS_GRID.length - 1 ? 'border-b border-subtle-border' : ''
                  } hover:bg-charcoal-light/50 transition-colors`}
                >
                  <div className="flex items-center gap-2.5 text-muted">
                    <Icon size={14} />
                    <span className="text-sm font-semibold">{spec.label}</span>
                  </div>
                  <span className="text-sm font-bold text-cream">{spec.getValue(car)}</span>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
