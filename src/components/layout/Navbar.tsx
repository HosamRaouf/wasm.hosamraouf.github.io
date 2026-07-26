'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const links = [
  { href: '/', labelAr: 'الرئيسية', labelEn: 'Home' },
  { href: '/cars', labelAr: 'السيارات', labelEn: 'Cars' },
  { href: '/auctions', labelAr: 'المزادات', labelEn: 'Auctions' },
  { href: '/brands', labelAr: 'العلامات', labelEn: 'Brands' },
  { href: '/compare', labelAr: 'المقارنة', labelEn: 'Compare' },
  { href: '/about', labelAr: 'من نحن', labelEn: 'About' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 w-full bg-obsidian h-nav sm:h-nav-lg"
      style={{ zIndex: 1000 }}
    >
      <nav
        className="relative flex h-full items-center justify-between px-6 sm:px-8 lg:px-12 xl:px-16"
        style={{ paddingTop: '12px', paddingBottom: '12px' }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0 min-h-touchMd">
          <img
            src="/assets/wasm-transparent.png"
            alt="WASM"
            className="h-8 sm:h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-1 sm:gap-2 lg:gap-3">

          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`relative flex items-center gap-1.5 px-4 xl:px-5 py-2 rounded-md text-sm font-semibold transition-colors duration-200 min-h-touchMd ${
                    active
                      ? 'text-gold'
                      : 'text-cream/60 hover:text-cream'
                  }`}
                >
                  {l.labelAr}
                  {active && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_6px_rgba(212,175,55,0.8)]" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right-side actions */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-7">
          {/* Live auction pill */}
          <Link
            href="/auctions"
            className="flex items-center gap-3 rounded-full border border-ember/40 bg-ember/10 px-6 xl:px-7 py-2 text-xs xl:text-sm font-semibold text-ember animate-pulse-border hover:bg-ember/20 transition-colors min-h-touchMd"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
            </span>
            3 مزادات حية
          </Link>
          <Link
            href="/signin"
            className="gold-gradient-bg text-obsidian px-6 xl:px-7 py-2 rounded-full text-sm font-bold hover:shadow-[0_0_16px_rgba(212,175,55,0.3)] transition-shadow min-h-touchMd flex items-center"
          >
            تسجيل الدخول
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden flex h-touchLg w-touchLg items-center justify-center rounded-md text-cream hover:bg-white/5 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 top-nav sm:top-nav-lg bg-black/50 z-[40]"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden absolute top-nav sm:top-nav-lg left-0 right-0 w-full z-[50] bg-obsidian/98 frosted-glass border-b border-white/5 shadow-2xl"
            >
              <ul className="flex flex-col p-4 gap-1.5">
                {links.map((l) => {
                  const active = pathname === l.href;
                  return (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center px-5 py-4 rounded-xl text-md font-semibold transition-colors min-h-[52px] ${
                          active ? 'text-gold bg-gold/5' : 'text-cream/60 hover:text-cream hover:bg-white/5'
                        }`}
                      >
                  {l.labelAr}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="flex items-center justify-between px-5 py-5 border-t border-white/5">
                <Link
                  href="/auctions"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 rounded-full border border-ember/40 bg-ember/10 px-4 py-2 text-xs font-semibold text-ember min-h-touchMd"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
                  </span>
                  3 مزادات حية
                </Link>
                <Link
                  href="/signin"
                  onClick={() => setMobileOpen(false)}
                  className="gold-gradient-bg text-obsidian px-5 py-2.5 rounded-full text-sm font-bold min-h-touchMd flex items-center"
                >
                  تسجيل الدخول
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
