// frontend/tailwind.config.js

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
        primary: {
          50: '#e6f7f7',
          100: '#b3e6e6',
          200: '#80d4d4',
          300: '#4dc3c3',
          400: '#1ab1b1',
          500: '#008080',
          600: '#006666',
          700: '#004d4d',
          800: '#003333',
          900: '#001a1a',
        },
        accent: {
          50: '#fff7e6',
          100: '#ffe7b3',
          200: '#ffd780',
          300: '#ffc74d',
          400: '#ffb71a',
          500: '#ffa500',
          600: '#e69500',
          700: '#cc8400',
          800: '#b37300',
          900: '#996300',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'gradient': 'gradient-shift 10s ease infinite',
        'bounce-pulse': 'bounce-pulse 2.5s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2.2s ease-in-out infinite',
        'shake': 'shake 0.55s cubic-bezier(0.36,0.07,0.19,0.97)',
        'gradient-border': 'gradient-border-flow 5s ease infinite',
        'ken-burns': 'ken-burns 8s ease-in-out alternate infinite',
        'slide-up-in': 'slide-up-in 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
}
