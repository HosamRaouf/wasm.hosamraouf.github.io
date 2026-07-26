'use client';

import { useRef, useEffect } from 'react';
import { Trophy, Clock } from 'lucide-react';

interface Bid {
  id: string;
  bidder: string;
  time: string;
  amount: number;
  rank: number;
}

interface BidHistoryPanelProps {
  bids: Bid[];
}

function formatNumber(n: number) {
  return n.toLocaleString('ar-SA');
}

export default function BidHistoryPanel({ bids }: BidHistoryPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [bids]);

  return (
    <div className="relative rounded-2xl border-2 border-ember/30 bg-ember/[0.06] backdrop-blur-sm overflow-hidden animate-pulse-border">
      {/* Animated gradient top accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-ember via-gold to-ember animate-shimmer-gold" style={{ backgroundSize: '200% 100%' }} />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-ember/10">
        <h3 className="text-sm font-bold text-cream">سجل المزادات</h3>
        <span className="rounded-full bg-ember/10 px-2.5 py-0.5 text-xs font-bold text-ember">
          {bids.length} عرض
        </span>
      </div>

      {/* Scrollable list */}
      <div ref={scrollRef} className="max-h-72 overflow-y-auto hide-scrollbar">
        {bids.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted">لا توجد مزادات بعد</div>
        ) : (
          <div className="divide-y divide-ember/[0.08]">
            {bids.map((bid) => (
              <div
                key={bid.id}
                className={`flex items-center gap-3 px-4 py-3 transition-colors duration-200 ${
                  bid.rank === 1
                    ? 'bg-gold/[0.04] border-r-2 border-r-gold'
                    : 'hover:bg-white/[0.02]'
                }`}
              >
                {/* Rank */}
                <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-xs font-black ${
                  bid.rank === 1
                    ? 'bg-gold text-obsidian'
                    : 'bg-white/[0.06] text-muted'
                }`}>
                  {bid.rank}
                </div>

                {/* Bidder + time */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    {bid.rank === 1 && <Trophy className="h-3 w-3 text-gold flex-shrink-0" />}
                    <span className={`text-sm font-bold truncate ${bid.rank === 1 ? 'text-gold' : 'text-cream'}`}>
                      {bid.bidder}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Clock className="h-2.5 w-2.5 text-muted" />
                    <span className="text-xs text-muted">{bid.time}</span>
                  </div>
                </div>

                {/* Amount */}
                <div className="text-left flex-shrink-0">
                  <span className={`text-sm font-black ${bid.rank === 1 ? 'text-gold' : 'text-ember'}`}>
                    {formatNumber(bid.amount)}
                  </span>
                  <span className="text-xs text-muted mr-1">ر.س</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
