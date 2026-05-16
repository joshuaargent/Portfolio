import { SiteConfig, NavItem } from '@/types';

// ============================================
// Site Configuration
// ============================================

export const siteConfig: SiteConfig = {
  name: 'Joshua Argent',
  description: 'I run 5km a day, read a lot, and share what I learn about fitness and faith.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://joshuaargent.vercel.app',
  ogImage: '/og-image.png',
  links: {
    youtube: 'https://youtube.com/@joshua_argent',
    github: 'https://github.com/joshuaargent',
    instagram: 'https://instagram.com/joshua_argent',
    facebook: 'https://facebook.com/joshua_argent',
    email: 'argentjackjoshua@outlook.com',
  },
  author: {
    name: 'Joshua Argent',
    bio: 'I run 5km a day, read a lot, and share what I learn about fitness and faith.',
    avatar: '/images/avatar.jpg',
  },
};

// ============================================
// Navigation
// ============================================

export const mainNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Running', href: '/running' },
  { label: 'Reading', href: '/reading' },
  { label: 'Code', href: '/code' },
  { label: 'Content', href: '/content' },
  { label: 'Blog', href: '/blog' },
  { label: 'CV', href: '/cv' },
];

export const footerNav = {
  main: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Running', href: '/running' },
    { label: 'Reading', href: '/reading' },
    { label: 'Code', href: '/code' },
    { label: 'Content', href: '/content' },
    { label: 'Blog', href: '/blog' },
    { label: 'CV', href: '/cv' },
    { label: 'Contact', href: '/contact' },
  ],
  content: [
    { label: 'Faith', href: '/content/faith' },
    { label: 'Psychology', href: '/content/psychology' },
    { label: 'Health', href: '/content/health' },
    { label: 'Performance', href: '/content/performance' },
  ],
  social: [
    { label: 'YouTube', href: 'https://youtube.com/@joshua_argent' },
    { label: 'GitHub', href: 'https://github.com/joshuaargent' },
    { label: 'Instagram', href: 'https://instagram.com/joshua_argent' },
    { label: 'Facebook', href: 'https://facebook.com/joshua_argent' },
  ],
};

// ============================================
// Content Categories
// ============================================

export const contentCategories = [
  { id: 'faith', label: 'Faith', color: 'violet' },
  { id: 'psychology', label: 'Psychology', color: 'blue' },
  { id: 'health', label: 'Health', color: 'green' },
  { id: 'performance', label: 'Performance', color: 'orange' },
  { id: 'learning', label: 'Learning', color: 'cyan' },
] as const;

// ============================================
// Design Tokens
// ============================================

export const colors = {
  // Primary
  accent: '#0D9488',
  accentHover: '#0F766E',
  accentLight: '#CCFBF1',

  // Backgrounds
  bgPrimary: '#FAFAF9',
  bgSecondary: '#F5F5F4',
  bgCard: '#FFFFFF',

  // Text
  textPrimary: '#1C1917',
  textSecondary: '#57534E',
  textMuted: '#A8A29E',

  // Border
  border: '#E7E5E4',

  // Category Colors
  faith: '#7C3AED',
  psychology: '#2563EB',
  health: '#16A34A',
  performance: '#EA580C',
  code: '#0891B2',
} as const;

export const spacing = {
  section: 'py-16 md:py-24',
  sectionSm: 'py-12 md:py-16',
  container: 'max-w-6xl mx-auto px-4 sm:px-6 lg:px-8',
  containerSm: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
  containerLg: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
} as const;

export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
    serif: ['Lora', 'Georgia', 'serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
} as const;

// ============================================
// Animation
// ============================================

export const transitions = {
  fast: '150ms ease',
  base: '200ms ease',
  slow: '300ms ease',
  slower: '500ms ease',
} as const;

export const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.4 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3 },
  },
} as const;

// ============================================
// External Links
// ============================================

export const externalLinks = {
  youtube: 'https://youtube.com/@joshua_argent',
  github: 'https://github.com/joshuaargent',
  instagram: 'https://instagram.com/joshua_argent',
  facebook: 'https://facebook.com/joshua_argent',
  email: 'mailto:argentjackjoshua@outlook.com',
} as const;

// ============================================
// Meta
// ============================================

export const meta = {
  title: 'Joshua Argent | Runner. Reader. Programmer.',
  description: 'I run 5km a day, read a lot, and share what I learn about fitness and faith.',
  keywords: [
    'Joshua',
    'running',
    'reading',
    'coding',
    'faith',
    'psychology',
    'health',
    'performance',
    'personal development',
    'content creator',
  ] as string[],
  instagramHandle: '@joshua_argent',
} as const;
