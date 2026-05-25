// frontend/tailwind.config.js
// OM Marketing — Dark Luxury palette
// Note: Tailwind v4 reads tokens from the @theme block in globals.css.
// This file is kept in sync so any tool that still inspects it gets the same values.

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          canvas: '#14110F',
          surface: '#1C1814',
          gold: '#C4A66B',
          ivory: '#F2ECE0',
          muted: '#9C958B',
          dim: '#5C544A',
          hairline: 'rgba(196,166,107,0.18)',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'Garamond', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '2px',
        sharp: '2px',
      },
      letterSpacing: {
        label: '0.2em',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
};
