'use client';

import { useState } from 'react';
import { ChevronDown, RotateCcw, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { brands } from '@/lib/data';
import Image from 'next/image';
import { getAssetPath } from '@/lib/paths';

export interface FilterState {
  brands: string[];
  priceMin: number;
  priceMax: number;
  yearFrom: number | null;
  yearTo: number | null;
  mileageRange: string | null;
  transmission: string[];
  fuel: string[];
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const PRICE_MIN = 80000;
const PRICE_MAX = 450000;

const YEAR_CHIPS = [2020, 2021, 2022, 2023, 2024, 2025];

const MILEAGE_OPTIONS = [
  { value: '0-5000', label: '0 - 5,000 كم' },
  { value: '5000-15000', label: '5,000 - 15,000 كم' },
  { value: '15000-30000', label: '15,000 - 30,000 كم' },
  { value: '30000+', label: '+30,000 كم' },
];

const TRANSMISSION_OPTIONS = [
  { value: 'automatic', label: 'أوتوماتيك' },
  { value: 'manual', label: 'يدوي' },
];

const FUEL_OPTIONS = [
  { value: 'gasoline', label: 'بنزين' },
  { value: 'diesel', label: 'ديزل' },
  { value: 'electric', label: 'كهربائي' },
  { value: 'hybrid', label: 'هجين' },
];

function SectionHeader({
  title,
  open,
  onToggle,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between py-3 text-xs font-bold uppercase tracking-widest text-gold min-h-touchMd"
    >
      <span>{title}</span>
      <motion.span
        animate={{ rotate: open ? 180 : 0 }}
        transition={{ duration: 0.25 }}
      >
        <ChevronDown size={14} />
      </motion.span>
    </button>
  );
}

function ChipButton({
  active,
  onClick,
  children,
  className = '',
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold border transition-all duration-200 min-h-touchSm ${
        active
          ? 'border-gold bg-gold/15 text-gold'
          : 'border-white/10 bg-charcoal-light text-cream/60 hover:border-white/20 hover:text-cream'
      } ${className}`}
    >
      {children}
    </button>
  );
}

function FilterContent({
  filters,
  onChange: updateFilter,
  openSections,
  toggle,
}: {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  openSections: Record<string, boolean>;
  toggle: (key: string) => void;
}) {
  const update = (patch: Partial<FilterState>) =>
    updateFilter({ ...filters, ...patch });

  const toggleBrand = (brand: string) => {
    const next = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    update({ brands: next });
  };

  const toggleTransmission = (val: string) => {
    const next = filters.transmission.includes(val)
      ? filters.transmission.filter((t) => t !== val)
      : [...filters.transmission, val];
    update({ transmission: next });
  };

  const toggleFuel = (val: string) => {
    const next = filters.fuel.includes(val)
      ? filters.fuel.filter((f) => f !== val)
      : [...filters.fuel, val];
    update({ fuel: next });
  };

  const resetAll = () =>
    updateFilter({
      brands: [],
      priceMin: PRICE_MIN,
      priceMax: PRICE_MAX,
      yearFrom: null,
      yearTo: null,
      mileageRange: null,
      transmission: [],
      fuel: [],
    });

  const handlePriceMinChange = (val: number) => {
    update({ priceMin: Math.min(val, filters.priceMax - 10000) });
  };

  const handlePriceMaxChange = (val: number) => {
    update({ priceMax: Math.max(val, filters.priceMin + 10000) });
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-sm font-bold text-cream">الفلاتر</h2>
        <button
          onClick={resetAll}
          className="flex items-center gap-1.5 text-xs font-semibold text-muted hover:text-gold transition-colors min-h-touchSm px-2"
        >
          <RotateCcw size={12} />
          مسح الكل
        </button>
      </div>

      <div className="h-px bg-subtle-border my-3" />

      {/* ─── Brand ─── */}
      <section>
        <SectionHeader title="الماركة" open={openSections.brand} onToggle={() => toggle('brand')} />
        <AnimatePresence initial={false}>
          {openSections.brand && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-1 pb-3">
                {brands.map((b) => {
                  const checked = filters.brands.includes(b.name);
                  return (
                    <button
                      key={b.id}
                      onClick={() => toggleBrand(b.name)}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 min-h-touchMd ${
                        checked
                          ? 'bg-gold/10 border border-gold/30'
                          : 'hover:bg-white/[0.03] border border-transparent'
                      }`}
                    >
                      <span
                        className={`relative h-[18px] w-[18px] rounded shrink-0 border-2 flex items-center justify-center transition-colors ${
                          checked ? 'border-gold bg-gold' : 'border-white/20'
                        }`}
                      >
                        {checked && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path
                              d="M1 4L3.5 6.5L9 1"
                              stroke="#0B0B0D"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </span>
                      <span className="shrink-0 grayscale opacity-70">
                        <Image
                          src={getAssetPath(b.logo)}
                          alt={b.name}
                          width={18}
                          height={18}
                          className="object-contain"
                        />
                      </span>
                      <span className="flex-1 text-right text-cream/80">{b.nameAr}</span>
                      <span
                        className={`text-xs font-bold rounded-full px-2 py-0.5 ${
                          checked ? 'bg-gold/20 text-gold' : 'bg-white/5 text-muted'
                        }`}
                      >
                        {b.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <div className="h-px bg-subtle-border" />

      {/* ─── Price Range ─── */}
      <section>
        <SectionHeader title="نطاق السعر" open={openSections.price} onToggle={() => toggle('price')} />
        <AnimatePresence initial={false}>
          {openSections.price && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-gold bg-gold/10 px-3 py-1 rounded-full">
                    {(filters.priceMin / 1000).toFixed(0)} ألف
                  </span>
                  <span className="text-xs text-muted">—</span>
                  <span className="text-xs font-bold text-gold bg-gold/10 px-3 py-1 rounded-full">
                    {(filters.priceMax / 1000).toFixed(0)} ألف
                  </span>
                </div>

                <div className="relative h-8 mx-1">
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 rounded-full bg-white/10" />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 h-1 rounded-full"
                    style={{
                      left: `${((filters.priceMin - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%`,
                      right: `${100 - ((filters.priceMax - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%`,
                      background: 'linear-gradient(90deg, #D4AF37, #F5D579)',
                    }}
                  />
                  <input
                    type="range"
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    step={5000}
                    value={filters.priceMin}
                    onChange={(e) => handlePriceMinChange(Number(e.target.value))}
                    className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none
                      [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none
                      [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full
                      [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-obsidian
                      [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(212,175,55,0.5)]
                      [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-20
                      [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none
                      [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-full
                      [&::-moz-range-thumb]:bg-gold [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-obsidian
                      [&::-moz-range-thumb]:shadow-[0_0_10px_rgba(212,175,55,0.5)]
                      [&::-moz-range-thumb]:relative [&::-moz-range-thumb]:z-20"
                  />
                  <input
                    type="range"
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    step={5000}
                    value={filters.priceMax}
                    onChange={(e) => handlePriceMaxChange(Number(e.target.value))}
                    className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none
                      [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none
                      [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full
                      [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-obsidian
                      [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(212,175,55,0.5)]
                      [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-20
                      [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none
                      [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-full
                      [&::-moz-range-thumb]:bg-gold [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-obsidian
                      [&::-moz-range-thumb]:shadow-[0_0_10px_rgba(212,175,55,0.5)]
                      [&::-moz-range-thumb]:relative [&::-moz-range-thumb]:z-20"
                  />
                </div>

                <div className="flex justify-between mt-2">
                  <span className="text-xs text-muted">80,000</span>
                  <span className="text-xs text-muted">450,000 ر.س</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <div className="h-px bg-subtle-border" />

      {/* ─── Manufacture Year ─── */}
      <section>
        <SectionHeader title="سنة الصنع" open={openSections.year} onToggle={() => toggle('year')} />
        <AnimatePresence initial={false}>
          {openSections.year && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="pb-3">
                <div className="flex gap-2 mb-3">
                  <input
                    type="number"
                    placeholder="من"
                    min={2015}
                    max={2025}
                    value={filters.yearFrom ?? ''}
                    onChange={(e) =>
                      update({ yearFrom: e.target.value ? Number(e.target.value) : null })
                    }
                    className="w-full rounded-xl bg-charcoal-light border border-white/10 px-3 py-2.5 text-xs text-cream placeholder:text-muted/50 focus:outline-none focus:border-gold/50 min-h-[44px]"
                  />
                  <input
                    type="number"
                    placeholder="إلى"
                    min={2015}
                    max={2025}
                    value={filters.yearTo ?? ''}
                    onChange={(e) =>
                      update({ yearTo: e.target.value ? Number(e.target.value) : null })
                    }
                    className="w-full rounded-xl bg-charcoal-light border border-white/10 px-3 py-2.5 text-xs text-cream placeholder:text-muted/50 focus:outline-none focus:border-gold/50 min-h-touchMd"
                  />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {YEAR_CHIPS.map((y) => {
                    const active = filters.yearFrom === y && filters.yearTo === y;
                    return (
                      <button
                        key={y}
                        onClick={() =>
                          update(active ? { yearFrom: null, yearTo: null } : { yearFrom: y, yearTo: y })
                        }
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold border transition-all duration-200 min-h-[36px] ${
                          active
                            ? 'border-gold text-gold bg-gold/10'
                            : 'border-white/10 text-cream/50 hover:border-white/20 hover:text-cream'
                        }`}
                      >
                        {y}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <div className="h-px bg-subtle-border" />

      {/* ─── Mileage ─── */}
      <section>
        <SectionHeader title="الكيلومتر" open={openSections.mileage} onToggle={() => toggle('mileage')} />
        <AnimatePresence initial={false}>
          {openSections.mileage && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-1 pb-3">
                {MILEAGE_OPTIONS.map((opt) => {
                  const active = filters.mileageRange === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() =>
                        update({ mileageRange: active ? null : opt.value })
                      }
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-white/[0.03] min-h-touchMd"
                    >
                      <span
                        className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                          active ? 'border-gold' : 'border-white/20'
                        }`}
                      >
                        {active && (
                          <span className="w-2 h-2 rounded-full bg-gold" />
                        )}
                      </span>
                      <span
                        className={`text-sm ${
                          active ? 'text-cream' : 'text-cream/60'
                        }`}
                      >
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <div className="h-px bg-subtle-border" />

      {/* ─── Transmission ─── */}
      <section>
        <SectionHeader title="ناقل الحركة" open={openSections.transmission} onToggle={() => toggle('transmission')} />
        <AnimatePresence initial={false}>
          {openSections.transmission && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 pb-3">
                {TRANSMISSION_OPTIONS.map((opt) => (
                  <ChipButton
                    key={opt.value}
                    active={filters.transmission.includes(opt.value)}
                    onClick={() => toggleTransmission(opt.value)}
                  >
                    {opt.label}
                  </ChipButton>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <div className="h-px bg-subtle-border" />

      {/* ─── Fuel Type ─── */}
      <section>
        <SectionHeader title="نوع الوقود" open={openSections.fuel} onToggle={() => toggle('fuel')} />
        <AnimatePresence initial={false}>
          {openSections.fuel && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 pb-3">
                {FUEL_OPTIONS.map((opt) => (
                  <ChipButton
                    key={opt.value}
                    active={filters.fuel.includes(opt.value)}
                    onClick={() => toggleFuel(opt.value)}
                  >
                    {opt.label}
                  </ChipButton>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}

export default function FilterSidebar({ filters, onChange, mobileOpen, onMobileClose }: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    brand: true,
    price: true,
    year: true,
    mileage: true,
    transmission: true,
    fuel: true,
  });

  const toggle = (key: string) =>
    setOpenSections((s) => ({ ...s, [key]: !s[key] }));

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-[280px] shrink-0 sticky top-[108px] h-[calc(100vh-108px)] overflow-y-auto rounded-2xl bg-charcoal border border-subtle-border hide-scrollbar">
        <div className="p-5">
          <FilterContent filters={filters} onChange={onChange} openSections={openSections} toggle={toggle} />
        </div>
      </aside>

      {/* Mobile drawer overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black/60 z-40"
              onClick={onMobileClose}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-[320px] max-w-[85vw] z-50 bg-charcoal border-l border-subtle-border overflow-y-auto hide-scrollbar"
            >
              <div className="flex items-center justify-between p-4 border-b border-subtle-border">
                <h2 className="text-sm font-bold text-cream">الفلاتر</h2>
                <button
                  onClick={onMobileClose}
                  className="flex h-touchSm w-touchSm items-center justify-center rounded-md text-cream/60 hover:text-cream hover:bg-white/5 transition-colors"
                  aria-label="إغلاق الفلاتر"
                >
                  <X className="h-iconLg w-iconLg" />
                </button>
              </div>
              <div className="p-5">
                <FilterContent filters={filters} onChange={onChange} openSections={openSections} toggle={toggle} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
