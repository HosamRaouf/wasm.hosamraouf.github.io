'use client';

import { motion, useMotionValue, animate } from 'framer-motion';
import { useEffect } from 'react';

interface SectionGlowProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export default function SectionGlow({ children, className = '', intensity = 1 }: SectionGlowProps) {
  const background = useMotionValue(
    `radial-gradient(ellipse 80% 50% at 20% 50%, rgba(212,175,55,${0.08 * intensity}), transparent 65%), radial-gradient(ellipse 70% 55% at 80% 50%, rgba(255,106,26,${0.04 * intensity}), transparent 55%)`
  );

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mql.matches) return;

    const o = intensity;
    const keyframes = [
      `radial-gradient(ellipse 80% 50% at 20% 50%, rgba(212,175,55,${0.08 * o}), transparent 65%), radial-gradient(ellipse 70% 55% at 80% 50%, rgba(255,106,26,${0.04 * o}), transparent 55%)`,
      `radial-gradient(ellipse 80% 50% at 80% 30%, rgba(255,106,26,${0.05 * o}), transparent 65%), radial-gradient(ellipse 70% 55% at 20% 70%, rgba(212,175,55,${0.07 * o}), transparent 55%)`,
      `radial-gradient(ellipse 80% 50% at 50% 80%, rgba(212,175,55,${0.06 * o}), transparent 65%), radial-gradient(ellipse 70% 55% at 50% 20%, rgba(245,213,121,${0.04 * o}), transparent 55%)`,
      `radial-gradient(ellipse 80% 50% at 20% 50%, rgba(212,175,55,${0.08 * o}), transparent 65%), radial-gradient(ellipse 70% 55% at 80% 50%, rgba(255,106,26,${0.04 * o}), transparent 55%)`,
    ];

    const controls = animate(background, keyframes, {
      duration: 16,
      repeat: Infinity,
      ease: 'easeInOut',
    });

    return () => controls.stop();
  }, [background, intensity]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-0 pointer-events-none" style={{ background }} />
      <div className="relative">{children}</div>
    </div>
  );
}
