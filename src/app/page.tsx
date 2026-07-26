'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Hero from '@/components/home/Hero';
import AboutUs from '@/components/home/AboutUs';
import BrowseByBrand from '@/components/home/BrowseByBrand';
import LiveAuctionsFeed from '@/components/home/LiveAuctionsFeed';
import CarCondition from '@/components/home/CarCondition';
import WhyWasm from '@/components/home/WhyWasm';
import CustomerReviews from '@/components/home/CustomerReviews';
import SectionGlow from '@/components/ui/SectionGlow';

function RevealSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <div dir="rtl" className="min-h-dvh bg-obsidian text-cream font-cairo flex flex-col gap-20 sm:gap-28">
      <Hero />

      <SectionGlow intensity={0.8}>
        <RevealSection><AboutUs /></RevealSection>
      </SectionGlow>

      <SectionGlow intensity={0.6} className="px-4 sm:px-6 lg:px-12 xl:px-16">
        <RevealSection><BrowseByBrand /></RevealSection>
      </SectionGlow>

      <RevealSection><LiveAuctionsFeed /></RevealSection>

      <SectionGlow intensity={0.7} className="px-4 sm:px-6 lg:px-12 xl:px-16">
        <RevealSection><CarCondition /></RevealSection>
      </SectionGlow>

      <SectionGlow intensity={0.5}>
        <RevealSection><WhyWasm /></RevealSection>
      </SectionGlow>

      <SectionGlow intensity={0.6}>
        <RevealSection><CustomerReviews /></RevealSection>
      </SectionGlow>
    </div>
  );
}
