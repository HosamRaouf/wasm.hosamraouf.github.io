'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { getAssetPath } from '@/lib/paths';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [blurred, setBlurred] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {});

    const onTimeUpdate = () => {
      if (video.currentTime >= video.duration - 0.5) {
        video.removeEventListener('timeupdate', onTimeUpdate);
        setBlurred(true);
        setTimeout(() => {
          (window as any).__splashDone = true;
          window.dispatchEvent(new Event('splash-done'));
          onComplete();
        }, 800);
      }
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    return () => video.removeEventListener('timeupdate', onTimeUpdate);
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    setBlurred(true);
    setTimeout(() => {
      (window as any).__splashDone = true;
      window.dispatchEvent(new Event('splash-done'));
      onComplete();
    }, 800);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black"
      animate={{
        opacity: blurred ? 0 : 1,
        filter: blurred ? 'blur(20px)' : 'blur(0px)',
      }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <motion.video
        ref={videoRef}
        src={getAssetPath("assets/asseAcceleration_mode_HMI_loading_0-100_202607252037.mp4")}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      />

      <motion.button
        onClick={handleSkip}
        className="absolute top-8 left-8 z-10 px-4 py-2 text-sm text-white/50 hover:text-white transition-colors rounded-md border border-white/10 hover:border-white/30 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        تخطي ←
      </motion.button>

      {/* Logo in golden glowing circle */}
      <motion.div
        className="absolute bottom-20 right-20 z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.0, ease: "easeOut" }}
      >
        <div className="relative flex items-center justify-center">
          {/* Background Glows */}
          <div className="absolute h-56 w-56 rounded-full bg-gold/20 blur-[100px] animate-pulse" />
          <div className="absolute h-48 w-48 rounded-full border border-gold/15 animate-pulse" />

          {/* Main Circle Container */}
          <div className="relative h-28 w-28 rounded-full bg-obsidian/40 backdrop-blur-xl border border-gold/30 flex items-center justify-center shadow-[0_0_60px_rgba(212,175,55,0.15)]">
            <img
              src={getAssetPath("/assets/wasm-transparent.png")}
              alt="WASM Logo"
              className="h-24 w-auto object-contain brightness-110"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
