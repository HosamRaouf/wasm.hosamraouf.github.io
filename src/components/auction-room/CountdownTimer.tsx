'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CountdownTimerProps {
  endsAt: number;
  onExtend: () => void;
}

function getRemaining(endsAt: number) {
  return Math.max(0, Math.floor((endsAt - Date.now()) / 1000));
}

export default function CountdownTimer({ endsAt, onExtend }: CountdownTimerProps) {
  const [remaining, setRemaining] = useState(() => getRemaining(endsAt));

  useEffect(() => {
    const id = setInterval(() => {
      const r = getRemaining(endsAt);
      setRemaining(r);
      if (r <= 0) {
        clearInterval(id);
        onExtend();
      }
    }, 1000);
    return () => clearInterval(id);
  }, [endsAt, onExtend]);

  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;

  const isUrgent = remaining > 0 && remaining < 300;
  const isLessThanHour = remaining > 0 && remaining < 3600;
  const isEnded = remaining <= 0;

  if (isEnded) {
    return (
      <div className="rounded-2xl border border-danger/30 bg-danger/10 p-4 text-center">
        <Clock className="h-5 w-5 text-danger mx-auto mb-2" />
        <p className="text-sm font-bold text-danger">انتهى المزاد</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-ember/15 bg-ember/[0.04] p-3.5 sm:p-4">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Clock className="h-4 w-4 text-ember" />
        <span className="text-xs font-bold text-muted uppercase tracking-wider">الوقت المتبقي</span>
      </div>

      {/* Segmented timer */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2">
        <TimerSegment value={hours} label="ساعة" isUrgent={isLessThanHour} />
        <span className={`text-xl sm:text-2xl font-black ${isLessThanHour ? 'text-danger' : 'text-ember'}`}>:</span>
        <TimerSegment value={minutes} label="دقيقة" isUrgent={isLessThanHour} />
        <span className={`text-xl sm:text-2xl font-black ${isLessThanHour ? 'text-danger' : 'text-ember'}`}>:</span>
        <TimerSegment value={seconds} label="ثانية" isUrgent={isLessThanHour} />
      </div>

      <AnimatePresence>
        {isUrgent && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="mt-3 flex items-center justify-center"
          >
            <span className="text-xs font-bold text-danger animate-[pulse_1s_ease-in-out_infinite]">
              ⚠ أقل من 5 دقائق!
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TimerSegment({ value, label, isUrgent }: { value: number; label: string; isUrgent: boolean }) {
  return (
    <div className={`flex flex-col items-center gap-1 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 border transition-colors duration-300 ${
      isUrgent
        ? 'bg-danger/10 border-danger/30'
        : 'bg-obsidian/60 border-ember/15'
    }`}>
      <span className={`text-2xl sm:text-3xl font-black font-mono tabular-nums leading-none ${
        isUrgent ? 'text-danger animate-timer-glow' : 'text-ember animate-timer-glow'
      }`}>
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-xs text-muted font-medium">{label}</span>
    </div>
  );
}
