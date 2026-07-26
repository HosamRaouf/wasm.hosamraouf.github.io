'use client';

import { ShieldAlert } from 'lucide-react';

interface LiveBidCardProps {
  currentBid: number;
  leaderId: string;
}

function formatNumber(n: number) {
  return n.toLocaleString('ar-SA');
}

export default function LiveBidCard({ currentBid, leaderId }: LiveBidCardProps) {
  return (
    <div className="rounded-2xl border-2 border-ember/40 bg-charcoal p-5 animate-pulse-border">
      {/* Live indicator */}
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

      {/* Current highest bid */}
      <div className="text-center py-4">
        <p className="text-xs text-muted mb-2">أعلى مزايدة حالياً</p>
        <p className="text-4xl font-black text-ember animate-timer-glow leading-none" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>
          {formatNumber(currentBid)}
        </p>
        <p className="text-sm font-semibold text-gold mt-1">ر.س</p>
      </div>

      {/* Leader */}
      <div className="flex items-center justify-center gap-2 mt-2 py-3 border-t border-b border-white/[0.06]">
        <span className="text-sm text-muted">المزايد المتصدر:</span>
        <span className="text-sm font-bold text-gold">{leaderId}</span>
      </div>

      {/* Auto-extend notice */}
      <div className="flex items-start gap-2.5 mt-4 rounded-xl bg-ember/[0.06] border border-ember/15 p-3">
        <ShieldAlert className="h-iconMd w-iconMd text-ember flex-shrink-0 mt-0.5" />
        <p className="text-xs leading-relaxed text-muted">
          <span className="font-bold text-cream">الحماية من الالتقاط:</span>{' '}
          أي عرض خلال 3 دقائق الأخيرة يمتد المزاد بـ 3 دقائق
        </p>
      </div>
    </div>
  );
}
