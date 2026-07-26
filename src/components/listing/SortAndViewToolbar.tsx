'use client';

import { LayoutGrid, List, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import ActiveFilterTags from './ActiveFilterTags';

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'mileage' | 'popular';

interface SortAndViewToolbarProps {
  resultCount: number;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: 'grid' | 'list';
  onViewChange: (mode: 'grid' | 'list') => void;
  filters: { key: string; label: string }[];
  onRemoveFilter: (key: string) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'الأحدث أولاً' },
  { value: 'price-asc', label: 'السعر: من الأقل إلى الأعلى' },
  { value: 'price-desc', label: 'السعر: من الأعلى إلى الأقل' },
  { value: 'mileage', label: 'أقل كيلومترياً' },
  { value: 'popular', label: 'الأكثر شعبية' },
];

export default function SortAndViewToolbar({
  resultCount,
  sortBy,
  onSortChange,
  viewMode,
  onViewChange,
  filters,
  onRemoveFilter,
}: SortAndViewToolbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const currentLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? '';

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-charcoal border border-subtle-border p-4">
      {/* Active filter tags */}
      {filters.length > 0 && (
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted whitespace-nowrap">الفلاتر النشطة:</span>
          <ActiveFilterTags filters={filters} onRemove={onRemoveFilter} />
        </div>
      )}

      <div className="flex items-center justify-between">
        {/* Result count */}
        <p className="text-sm text-muted">
          <span className="font-bold text-cream">{resultCount}</span> نتيجة
        </p>

        <div className="flex items-center gap-3">
          {/* Sort dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-charcoal-light px-4 py-2 text-sm font-semibold text-cream/80 transition-colors hover:border-white/20"
            >
              {currentLabel}
              <ChevronDown
                size={14}
                className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-2 z-30 min-w-[240px] rounded-xl bg-charcoal border border-white/10 shadow-2xl overflow-hidden">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      onSortChange(opt.value);
                      setDropdownOpen(false);
                    }}
                    className={`block w-full text-right px-4 py-2.5 text-sm font-semibold transition-colors ${
                      sortBy === opt.value
                        ? 'text-gold bg-gold/10'
                        : 'text-cream/70 hover:text-cream hover:bg-white/5'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Grid / List toggle */}
          <div className="flex items-center rounded-xl border border-white/10 overflow-hidden">
            <button
              onClick={() => onViewChange('grid')}
              className={`flex h-10 w-10 items-center justify-center transition-colors ${
                viewMode === 'grid'
                  ? 'bg-gold text-obsidian'
                  : 'bg-charcoal-light text-muted hover:text-cream'
              }`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => onViewChange('list')}
              className={`flex h-10 w-10 items-center justify-center transition-colors ${
                viewMode === 'list'
                  ? 'bg-gold text-obsidian'
                  : 'bg-charcoal-light text-muted hover:text-cream'
              }`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
