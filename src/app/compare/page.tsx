'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Gauge,
  Fuel,
  Cog,
  Ruler,
  Weight,
  Palette,
  MapPin,
  Calendar,
  Zap,
  Trash2,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useCompareStore } from '@/stores';
import { cars } from '@/lib/data';
import FilterSidebar, { type FilterState } from '@/components/listing/FilterSidebar';
import SortAndViewToolbar, { type SortOption } from '@/components/listing/SortAndViewToolbar';
import Pagination from '@/components/listing/Pagination';
import CompareCarCard from '@/components/ui/CompareCarCard';

const ITEMS_PER_PAGE = 6;

const INITIAL_FILTERS: FilterState = {
  brands: [],
  priceMin: 80000,
  priceMax: 450000,
  yearFrom: null,
  yearTo: null,
  mileageRange: null,
  transmission: [],
  fuel: [],
};

const specRows = [
  { key: 'year', label: 'السنة', icon: Calendar, format: (v: number) => String(v) },
  { key: 'mileage', label: 'المسافة', icon: Gauge, format: (v: number) => `${v.toLocaleString('ar-SA')} كم` },
  { key: 'engine', label: 'المحرك', icon: Cog, format: (v: string) => v },
  { key: 'power', label: 'القدرة', icon: Zap, format: (v: string) => v },
  { key: 'torque', label: 'العزم', icon: Zap, format: (v: string) => v },
  { key: 'acceleration', label: 'التسارع', icon: Gauge, format: (v: string) => v },
  { key: 'fuelEconomy', label: 'استهلاك الوقود', icon: Fuel, format: (v: string) => v },
  { key: 'drivetrain', label: 'نظام الدفع', icon: Cog, format: (v: string) => v },
  { key: 'transmission', label: 'ناقل الحركة', icon: Cog, format: (v: string) => (v === 'automatic' ? 'أوتوماتيك' : 'يدوي') },
  { key: 'dimensions', label: 'الأبعاد', icon: Ruler, format: (v: string) => v },
  { key: 'weight', label: 'الوزن', icon: Weight, format: (v: string) => v },
  { key: 'color', label: 'اللون', icon: Palette, format: (v: string) => v },
  { key: 'wheels', label: 'الجنوط', icon: Cog, format: (v: string) => v },
  { key: 'interior', label: 'الديكور', icon: Cog, format: (v: string) => v },
  { key: 'climate', label: 'تكييف', icon: Cog, format: (v: string) => v },
  { key: 'location', label: 'الموقع', icon: MapPin, format: (v: string) => v },
];

function parseMileageRange(range: string): [number, number] | null {
  if (range === '30000+') return [30000, Infinity];
  const parts = range.split('-').map(Number);
  if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
    return [parts[0], parts[1]];
  }
  return null;
}

function CompareContent() {
  const searchParams = useSearchParams();
  const { vehicles, removeVehicle, clearVehicles, addVehicle } = useCompareStore();

  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [comparisonExpanded, setComparisonExpanded] = useState(true);

  useEffect(() => {
    document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const id1 = searchParams.get('id1');
    const id2 = searchParams.get('id2');
    if (id1 && id2) {
      [id1, id2].forEach((id) => {
        if (!vehicles.some((v) => v.id === id)) {
          const car = cars.find((c) => c.id === id);
          if (car) {
            addVehicle({ id: car.id, name: car.nameAr, price: car.price, image: car.image });
          }
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const carA = cars.find((c) => c.id === vehicles[0]?.id) ?? null;
  const carB = cars.find((c) => c.id === vehicles[1]?.id) ?? null;
  const selectedIds = new Set(vehicles.map((v) => v.id));

  const filteredCars = useMemo(() => {
    let result = [...cars];

    if (filters.brands.length > 0) {
      result = result.filter((c) => filters.brands.includes(c.brand));
    }

    result = result.filter(
      (c) => c.price >= filters.priceMin && c.price <= filters.priceMax,
    );

    if (filters.yearFrom !== null) {
      result = result.filter((c) => c.year >= filters.yearFrom!);
    }
    if (filters.yearTo !== null) {
      result = result.filter((c) => c.year <= filters.yearTo!);
    }

    if (filters.mileageRange) {
      const parsed = parseMileageRange(filters.mileageRange);
      if (parsed) {
        result = result.filter((c) => c.mileage >= parsed[0] && c.mileage <= parsed[1]);
      }
    }

    if (filters.transmission.length > 0) {
      result = result.filter((c) => filters.transmission.includes(c.transmission));
    }

    if (filters.fuel.length > 0) {
      result = result.filter((c) => filters.fuel.includes(c.fuel));
    }

    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'mileage':
        result.sort((a, b) => a.mileage - b.mileage);
        break;
      case 'popular':
        result.sort((a, b) => (b.isAuction ? 1 : 0) - (a.isAuction ? 1 : 0));
        break;
    }

    return result;
  }, [filters, sortBy]);

  const totalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE);
  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const activeFilters = useMemo(() => {
    const tags: { key: string; label: string }[] = [];

    filters.brands.forEach((b) => {
      tags.push({ key: `brand-${b}`, label: b });
    });

    if (filters.priceMin > 80000 || filters.priceMax < 450000) {
      tags.push({
        key: 'price',
        label: `${(filters.priceMin / 1000).toFixed(0)}-${(filters.priceMax / 1000).toFixed(0)} ألف ر.س`,
      });
    }

    if (filters.yearFrom !== null) {
      tags.push({ key: 'yearFrom', label: `من ${filters.yearFrom}` });
    }
    if (filters.yearTo !== null) {
      tags.push({ key: 'yearTo', label: `إلى ${filters.yearTo}` });
    }

    if (filters.mileageRange) {
      const label = ['0-5000 كم', '5-15 ألف كم', '15-30 ألف كم', '+30 ألف كم'][
        ['0-5000', '5000-15000', '15000-30000', '30000+'].indexOf(filters.mileageRange)
      ];
      if (label) tags.push({ key: 'mileage', label });
    }

    filters.transmission.forEach((t) => {
      tags.push({
        key: `transmission-${t}`,
        label: t === 'automatic' ? 'أوتوماتيك' : 'يدوي',
      });
    });

    filters.fuel.forEach((f) => {
      const fuelLabels: Record<string, string> = {
        gasoline: 'بنزين',
        diesel: 'ديزل',
        electric: 'كهربائي',
        hybrid: 'هجين',
      };
      tags.push({ key: `fuel-${f}`, label: fuelLabels[f] ?? f });
    });

    return tags;
  }, [filters]);

  const handleRemoveFilter = (key: string) => {
    if (key.startsWith('brand-')) {
      const brand = key.replace('brand-', '');
      setFilters((f) => ({
        ...f,
        brands: f.brands.filter((b) => b !== brand),
      }));
    } else if (key === 'price') {
      setFilters((f) => ({ ...f, priceMin: 80000, priceMax: 450000 }));
    } else if (key === 'yearFrom') {
      setFilters((f) => ({ ...f, yearFrom: null }));
    } else if (key === 'yearTo') {
      setFilters((f) => ({ ...f, yearTo: null }));
    } else if (key === 'mileage') {
      setFilters((f) => ({ ...f, mileageRange: null }));
    } else if (key.startsWith('transmission-')) {
      const val = key.replace('transmission-', '');
      setFilters((f) => ({
        ...f,
        transmission: f.transmission.filter((t) => t !== val),
      }));
    } else if (key.startsWith('fuel-')) {
      const val = key.replace('fuel-', '');
      setFilters((f) => ({
        ...f,
        fuel: f.fuel.filter((f) => f !== val),
      }));
    }
    setCurrentPage(1);
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 xl:px-16 py-6 sm:py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 sm:mb-8 flex items-center gap-2 text-sm text-cream/40 font-cairo">
        <Link href="/" className="hover:text-cream transition-colors">الرئيسية</Link>
        <span>/</span>
        <span className="text-cream/70">مقارنة السيارات</span>
      </nav>

      {/* Header */}
      <div className="flex items-center justify-between mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-cream font-cairo">مقارنة السيارات</h1>
        {vehicles.length > 0 && (
          <button
            onClick={clearVehicles}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-danger/30 text-danger text-sm font-semibold font-cairo hover:bg-danger/10 transition-colors min-h-touchMd"
          >
            <Trash2 size={16} />
            مسح الكل
          </button>
        )}
      </div>

      {/* Comparison section */}
      <AnimatePresence>
        {vehicles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 overflow-hidden"
          >
            <button
              onClick={() => setComparisonExpanded(!comparisonExpanded)}
              className="flex items-center gap-3 w-full mb-4 group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${vehicles.length === 2 ? 'bg-gold animate-pulse' : 'bg-cream/30'}`} />
                <h2 className="text-lg font-bold text-cream font-cairo">
                  المقارنة
                </h2>
                <span className="text-sm text-cream/40 font-cairo">
                  ({vehicles.length}/2)
                </span>
              </div>
              {comparisonExpanded ? (
                <ChevronUp size={18} className="text-cream/40 group-hover:text-cream transition-colors" />
              ) : (
                <ChevronDown size={18} className="text-cream/40 group-hover:text-cream transition-colors" />
              )}
            </button>

            {comparisonExpanded && (
              <div className="space-y-8">
                {/* Car cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {[carA, carB].map((car, i) => (
                    <div
                      key={i}
                      className="relative rounded-2xl border border-subtle-border bg-charcoal/50 overflow-hidden"
                    >
                      {car ? (
                        <>
                          <div className="relative aspect-[16/10] overflow-hidden">
                            <Image src={car.image} alt={car.nameAr} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
                            <button
                              onClick={() => removeVehicle(car.id)}
                              className="absolute top-3 left-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white/70 hover:text-danger hover:bg-black/80 transition-colors backdrop-blur-sm"
                              aria-label="إزالة من المقارنة"
                            >
                              <X size={16} />
                            </button>
                          </div>
                          <div className="p-4 sm:p-5">
                            <p className="text-lg font-bold text-cream font-cairo mb-1">{car.nameAr}</p>
                            <p className="text-xs text-muted mb-3">{car.brandAr} · {car.typeAr} · {car.year}</p>
                            <div className="flex items-center gap-2 py-3 px-4 rounded-xl bg-gold/[0.06] border border-gold/15">
                              <span className="text-xl font-black text-gold font-inter tabular-nums">
                                {car.price.toLocaleString('ar-SA')}
                              </span>
                              <span className="text-xs text-gold/60 font-cairo">ر.س</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-3 py-16 px-4">
                          <div className="w-16 h-16 rounded-full border-2 border-dashed border-gold/20 flex items-center justify-center">
                            <span className="text-2xl text-gold/40">+</span>
                          </div>
                          <p className="text-sm text-cream/30 font-cairo">اختر سيارة من القائمة أدناه</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Spec comparison table */}
                {carA && carB && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="rounded-2xl border border-subtle-border bg-charcoal/50 overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 py-4 border-b border-subtle-border">
                      <h2 className="text-base font-bold text-cream font-cairo">المواصفات التقنية</h2>
                    </div>
                    <div className="px-5 sm:px-6 py-4">
                      {specRows.map((row, idx) => {
                        const valA = carA[row.key as keyof typeof carA];
                        const valB = carB[row.key as keyof typeof carB];
                        const Icon = row.icon;
                        const isEven = idx % 2 === 0;
                        const isSame = String(valA) === String(valB);

                        return (
                          <div
                            key={row.key}
                            className={`grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-4 py-3.5 px-3 rounded-lg ${isEven ? 'bg-white/[0.02]' : ''}`}
                          >
                            <span className={`text-sm text-cream font-cairo text-right truncate ${isSame ? 'text-cream/50' : ''}`}>
                              {row.format(valA as never)}
                            </span>
                            <div className="flex flex-col items-center gap-0.5 min-w-[70px] sm:min-w-[90px]">
                              <Icon size={14} className="text-gold/50" />
                              <span className="text-[10px] sm:text-xs text-muted font-cairo text-center whitespace-nowrap">{row.label}</span>
                            </div>
                            <span className={`text-sm text-cream font-cairo text-left truncate ${isSame ? 'text-cream/50' : ''}`}>
                              {row.format(valB as never)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Features comparison */}
                {carA && carB && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="rounded-2xl border border-subtle-border bg-charcoal/50 overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 py-4 border-b border-subtle-border">
                      <h2 className="text-base font-bold text-cream font-cairo">المميزات</h2>
                    </div>
                    <div className="px-5 sm:px-6 py-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[carA, carB].map((car, i) => (
                          <div key={i}>
                            <p className="text-xs text-muted font-cairo mb-3">{car.nameAr}</p>
                            <div className="flex flex-wrap gap-2">
                              {car.features.map((f) => {
                                const inOther = i === 0
                                  ? carB.features.includes(f)
                                  : carA.features.includes(f);
                                return (
                                  <span
                                    key={f}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-cairo border transition-colors ${
                                      inOther
                                        ? 'bg-gold/[0.08] border-gold/20 text-gold/80'
                                        : 'bg-white/5 border-white/10 text-cream/50'
                                    }`}
                                  >
                                    {f}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Car listing with filters */}
      <div>
        <h2 className="text-lg font-bold text-cream font-cairo mb-4">
          {vehicles.length > 0 ? 'اختر سيارة أخرى' : 'اختر سيارتين للمقارنة'}
        </h2>

        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-charcoal text-sm font-semibold text-cream/80 hover:border-gold/40 transition-colors min-h-touchLg"
          >
            <SlidersHorizontal className="h-iconMd w-iconMd" />
            الفلاتر
            {activeFilters.length > 0 && (
              <span className="flex h-badgeLg w-badgeLg items-center justify-center rounded-full bg-gold text-obsidian text-xs font-bold">
                {activeFilters.length}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-6" dir="rtl">
          {/* Sidebar */}
          <FilterSidebar
            filters={filters}
            onChange={(f) => { setFilters(f); setCurrentPage(1); }}
            mobileOpen={mobileFiltersOpen}
            onMobileClose={() => setMobileFiltersOpen(false)}
          />

          {/* Main content */}
          <main className="flex-1 min-w-0 flex flex-col gap-4 sm:gap-5">
            <SortAndViewToolbar
              resultCount={filteredCars.length}
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewChange={setViewMode}
              filters={activeFilters}
              onRemoveFilter={handleRemoveFilter}
            />

            {paginatedCars.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5'
                    : 'flex flex-col gap-3 sm:gap-4'
                }
              >
                {paginatedCars.map((car) => (
                  <CompareCarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 sm:py-24 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mb-4">
                  <SlidersHorizontal className="h-7 w-7 text-gold/60" />
                </div>
                <h3 className="text-lg font-bold text-cream mb-2">لا توجد نتائج</h3>
                <p className="text-sm text-muted max-w-sm">
                  لم يتم العثور على سيارات تطابق معايير البحث المحددة. حاول تعديل الفلاتر للحصول على نتائج أكثر.
                </p>
              </div>
            )}

            <div className="py-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}

export default function ComparePage() {
  return (
    <Suspense>
      <CompareContent />
    </Suspense>
  );
}
