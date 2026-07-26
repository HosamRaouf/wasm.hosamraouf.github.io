// ─── Design Tokens ───────────────────────────────────────────────────────────
// Centralized constants for the WASM design system.
// All values align with 8dp grid, WCAG AA contrast, and Tailwind v4 @theme tokens.

// ─── Spacing Scale (8dp grid) ────────────────────────────────────────────────
// Used for padding, margins, gaps, and insets.
export const spacing = {
  0: '0px',
  0.5: '2px',    // 1/4 of base unit
  1: '4px',      // half unit
  1.5: '6px',
  2: '8px',      // base unit
  2.5: '10px',
  3: '12px',     // 1.5 units
  3.5: '14px',
  4: '16px',     // 2 units
  5: '20px',     // 2.5 units
  6: '24px',     // 3 units
  7: '28px',     // 3.5 units
  8: '32px',     // 4 units
  9: '36px',
  10: '40px',    // 5 units
  12: '48px',    // 6 units  (touch target minimum)
  14: '56px',    // 7 units
  16: '64px',    // 8 units
  20: '80px',    // 10 units
  24: '96px',    // 12 units
  28: '112px',   // 14 units
  32: '128px',   // 16 units
} as const;

// ─── Sizing Scale ────────────────────────────────────────────────────────────
// Component dimensions, icon sizes, avatar sizes, image aspect ratios.
export const sizing = {
  // Icon sizes (consistent per hierarchy level)
  icon: {
    xs: '12px',    // 3 units - inline metadata icons
    sm: '16px',    // 4 units - card/spec icons
    md: '20px',    // 5 units - nav/action icons
    lg: '24px',    // 6 units - hero section icons
    xl: '32px',    // 8 units - logo icons
    '2xl': '36px', // 9 units - large logo
  },
  // Touch targets (WCAG / Apple HIG minimum 44pt)
  touch: {
    sm: '40px',    // compact contexts (inline actions)
    md: '44px',    // standard touch target
    lg: '48px',    // Material Design minimum
    xl: '56px',    // prominent CTAs
  },
  // Component heights (consistent vertical rhythm)
  height: {
    input: '44px',       // form inputs (touch-friendly)
    inputLg: '52px',     // prominent inputs
    button: '40px',      // default buttons
    buttonLg: '48px',    // large/CTA buttons
    buttonXl: '56px',    // hero CTAs
    nav: '64px',         // mobile nav
    navLg: '72px',       // desktop nav
    badge: '24px',       // status badges
    badgeLg: '32px',     // large badges
    avatar: '40px',      // user avatars
    avatarLg: '56px',    // large avatars
    progressBar: '6px',  // range sliders, progress
  },
  // Container max-widths
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1440px',
  },
} as const;

// ─── Border Radius Scale ─────────────────────────────────────────────────────
// Consistent rounding across all components.
export const borderRadius = {
  none: '0px',
  sm: '4px',      // inline tags, small badges
  md: '8px',      // buttons, inputs, nav items
  lg: '12px',     // cards, panels, dropdowns
  xl: '16px',     // large cards, modals
  '2xl': '20px',  // hero sections, featured cards
  '3xl': '24px',  // floating elements
  full: '9999px', // pills, circular avatars, live dots
} as const;

// ─── Font Size Scale ─────────────────────────────────────────────────────────
// Type scale based on 1.25 ratio with 16px base.
// All sizes ensure readability (min 11px for non-essential labels).
export const fontSize = {
  '2xs': { size: '10px', lineHeight: '14px' },   // micro labels, timestamps
  xs:    { size: '11px', lineHeight: '16px' },   // metadata, badges
  sm:    { size: '12px', lineHeight: '16px' },   // secondary text, specs
  base:  { size: '14px', lineHeight: '20px' },   // body text (mobile)
  md:    { size: '15px', lineHeight: '22px' },   // body text (desktop)
  lg:    { size: '16px', lineHeight: '24px' },   // emphasized body
  xl:    { size: '18px', lineHeight: '28px' },   // card titles
  '2xl': { size: '20px', lineHeight: '28px' },   // section headings
  '3xl': { size: '24px', lineHeight: '32px' },   // page headings
  '4xl': { size: '32px', lineHeight: '40px' },   // display
  '5xl': { size: '40px', lineHeight: '48px' },   // hero subheadings
  '6xl': { size: '48px', lineHeight: '56px' },   // hero titles
  hero:  { size: 'clamp(48px, 8vw, 80px)', lineHeight: '1.1' }, // hero display
} as const;

// ─── Z-Index Scale ───────────────────────────────────────────────────────────
// Layered z-index system to prevent stacking conflicts.
export const zIndex = {
  base:      0,
  raised:    10,    // lifted cards on hover
  dropdown:  20,    // dropdown menus
  sticky:    30,    // sticky headers
  overlay:   40,    // backdrops, overlays
  modal:     50,    // modals, dialogs
  popover:   60,    // popovers, tooltips
  toast:     70,    // toast notifications
  splash:    80,    // splash screen
  max:       90,    // highest priority
} as const;

// ─── Shadow Scale ────────────────────────────────────────────────────────────
// Elevation system for depth. Use with Tailwind arbitrary values.
export const shadows = {
  none:    'none',
  xs:      '0 1px 2px rgba(0,0,0,0.3)',
  sm:      '0 2px 4px rgba(0,0,0,0.3)',
  md:      '0 4px 8px rgba(0,0,0,0.3)',
  lg:      '0 8px 16px rgba(0,0,0,0.35)',
  xl:      '0 12px 40px rgba(0,0,0,0.4)',
  '2xl':   '0 20px 60px rgba(0,0,0,0.5)',
  gold:    '0 0 18px rgba(212,175,55,0.35)',
  goldLg:  '0 0 30px rgba(212,175,55,0.25)',
  ember:   '0 0 12px rgba(255,106,26,0.3)',
  emberLg: '0 0 30px rgba(255,106,26,0.25)',
  inner:   'inset 0 2px 4px rgba(0,0,0,0.2)',
} as const;

// ─── Breakpoints ─────────────────────────────────────────────────────────────
export const breakpoints = {
  sm:  '640px',
  md:  '768px',
  lg:  '1024px',
  xl:  '1280px',
  '2xl': '1440px',
} as const;

// ─── Animation Tokens ────────────────────────────────────────────────────────
// Consistent timing and easing across all interactions.
export const animation = {
  duration: {
    instant:  '0ms',
    fast:     '150ms',   // micro-interactions (hover, press)
    normal:   '200ms',   // standard transitions
    moderate: '300ms',   // complex state changes
    slow:     '400ms',   // page transitions
    slower:   '600ms',   // entrance animations
  },
  easing: {
    easeOut:      'cubic-bezier(0.16, 1, 0.3, 1)',  // entering elements
    easeIn:       'cubic-bezier(0.7, 0, 0.84, 0)',  // exiting elements
    easeInOut:    'cubic-bezier(0.45, 0, 0.55, 1)', // continuous motion
    spring:       'cubic-bezier(0.34, 1.56, 0.64, 1)', // bouncy/physical
  },
} as const;

// ─── Layout Tokens ───────────────────────────────────────────────────────────
export const layout = {
  pageGutter: {
    mobile: '16px',
    tablet: '24px',
    desktop: '48px',
    wide: '64px',
  },
  sectionGap: {
    sm: '32px',
    md: '48px',
    lg: '64px',
    xl: '96px',
  },
  contentMaxWidth: '1280px',
  lineLength: {
    short: '35ch',   // mobile long-form
    medium: '60ch',  // tablet
    long: '75ch',    // desktop optimal
  },
} as const;

// ─── Touch Target Constants ──────────────────────────────────────────────────
// Enforce Apple HIG (44pt) and Material (48dp) minimums.
export const touchTarget = {
  minSize: '44px',
  minGap: '8px',
  hitSlop: {
    top: 8,
    bottom: 8,
    left: 8,
    right: 8,
  },
} as const;
