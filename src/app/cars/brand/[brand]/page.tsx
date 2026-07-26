'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { SlidersHorizontal } from 'lucide-react';
import { cars, brands } from '@/lib/data';
import FilterSidebar, { type FilterState } from '@/components/listing/FilterSidebar';
import SortAndViewToolbar, { type SortOption } from '@/components/listing/SortAndViewToolbar';
import Pagination from '@/components/listing/Pagination';
import CarCard from '@/components/ui/CarCard';

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

function parseMileageRange(range: string): [number, number] | null {
  if (range === '30000+') return [30000, Infinity];
  const parts = range.split('-').map(Number);
  if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
    return [parts[0], parts[1]];
  }
  return null;
}

export default function CarsByBrandPage() {
  const params = useParams();
  const brandSlug = params.brand as string;

  const brandInfo = brands.find((b) => b.id === brandSlug);
  const brandName = brandInfo?.name ?? '';

  const [filters, setFilters] = useState<FilterState>({
    ...INITIAL_FILTERS,
    brands: brandName ? [brandName] : [],
  });
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredCars = useMemo(() => {
    let result = [...cars];

    // Pre-filter by brand
    if (brandName) {
      result = result.filter((c) => c.brand === brandName);
    }

    // Additional brand filter from sidebar (should not apply extra since pre-filtered)
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
  }, [filters, sortBy, brandName]);

  const totalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE);
  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const activeFilters = useMemo(() => {
    const tags: { key: string; label: string }[] = [];

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
      const labels: Record<string, string> = {
        '0-5000': '0-5,000 كم',
        '5000-15000': '5-15 ألف كم',
        '15000-30000': '15-30 ألف كم',
        '30000+': '+30 ألف كم',
      };
      tags.push({ key: 'mileage', label: labels[filters.mileageRange] });
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
    if (key === 'price') {
      setFilters((f) => ({ ...f, priceMin: 80000, priceMax: 450000 }));
    } else if (key === 'yearFrom') {
      setFilters((f) => ({ ...f, yearFrom: null }));
    } else if (key === 'yearTo') {
      setFilters((f) => ({ ...f, yearTo: null }));
    } else if (key === 'mileage') {
      setFilters((f) => ({ ...f, mileageRange: null }));
    } else if (key.startsWith('transmission-')) {
      setFilters((f) => ({
        ...f,
        transmission: f.transmission.filter((t) => t !== key.replace('transmission-', '')),
      }));
    } else if (key.startsWith('fuel-')) {
      setFilters((f) => ({
        ...f,
        fuel: f.fuel.filter((fl) => fl !== key.replace('fuel-', '')),
      }));
    }
    setCurrentPage(1);
  };

  return (
    <div className="min-h-dvh bg-obsidian pt-[72px]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-8 py-6 sm:py-8">
        {brandInfo && (
          <div className="mb-5 sm:mb-6 flex flex-wrap items-center gap-3 sm:gap-4" dir="rtl">
            <h1 className="text-xl sm:text-2xl font-bold text-cream">
              <span className="gold-gradient-text">{brandInfo.nameAr}</span>
              <span className="text-muted text-base sm:text-lg mr-3 font-normal">— {brandInfo.name}</span>
            </h1>
            <span className="text-xs sm:text-sm text-muted bg-charcoal px-3 py-1 rounded-full border border-subtle-border">
              {brandInfo.count} سيارة
            </span>
          </div>
        )}

        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-charcoal text-sm font-semibold text-cream/80 hover:border-gold/40 transition-colors min-h-[48px]"
          >
            <SlidersHorizontal className="h-4 w-4" />
            الفلاتر
            {activeFilters.length > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-obsidian text-[10px] font-bold">
                {activeFilters.length}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-6" dir="rtl">
          <FilterSidebar
            filters={filters}
            onChange={(f) => { setFilters(f); setCurrentPage(1); }}
            mobileOpen={mobileFiltersOpen}
            onMobileClose={() => setMobileFiltersOpen(false)}
          />

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
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 sm:py-24 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mb-4">
                  <SlidersHorizontal className="h-7 w-7 text-gold/60" />
                </div>
                <h3 className="text-lg font-bold text-cream mb-2">لا توجد نتائج</h3>
                <p className="text-sm text-muted max-w-sm">
                  لم يتم العثور على سيارات من ماركة &quot;{brandInfo?.nameAr ?? brandSlug}&quot; تطابق معايير البحث. حاول تعديل الفلاتر.
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
    </div>
  );
}
