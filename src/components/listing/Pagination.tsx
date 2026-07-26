'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = (): (number | '...')[] => {
    const pages: (number | '...')[] = [];
    const delta = 1;

    pages.push(1);

    const rangeStart = Math.max(2, currentPage - delta);
    const rangeEnd = Math.min(totalPages - 1, currentPage + delta);

    if (rangeStart > 2) pages.push('...');

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (rangeEnd < totalPages - 1) pages.push('...');

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  return (
    <nav className="flex items-center justify-center gap-1.5" aria-label="التنقل بين الصفحات">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-touchSm w-touchSm items-center justify-center rounded-lg border border-white/10 bg-charcoal text-muted transition-all duration-200 hover:border-gold hover:text-gold disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:text-muted disabled:cursor-not-allowed"
      >
        <ChevronRight size={16} />
      </button>

      {getPageNumbers().map((page, idx) =>
        page === '...' ? (
          <span
            key={`ellipsis-${idx}`}
            className="flex h-touchSm w-touchSm items-center justify-center text-muted text-sm"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex h-touchSm w-touchSm items-center justify-center rounded-lg text-sm font-bold transition-all duration-200 ${
              currentPage === page
                ? 'bg-gold text-obsidian shadow-[0_0_12px_rgba(212,175,55,0.3)]'
                : 'border border-white/10 bg-charcoal text-cream/60 hover:border-gold hover:text-gold'
            }`}
          >
            {page}
          </button>
        ),
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-touchSm w-touchSm items-center justify-center rounded-lg border border-white/10 bg-charcoal text-muted transition-all duration-200 hover:border-gold hover:text-gold disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:text-muted disabled:cursor-not-allowed"
      >
        <ChevronLeft size={16} />
      </button>
    </nav>
  );
}
