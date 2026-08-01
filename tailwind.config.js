/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#f6f7f9',
          100: '#eceef2',
          200: '#d5d9e2',
          300: '#b0b8c8',
          400: '#8590a8',
          500: '#67738d',
          600: '#525c73',
          700: '#434b5e',
          800: '#3a4051',
          900: '#0b0d12',
          950: '#05060a',
        },
        accent: {
          DEFAULT: '#c8c2b6',
          soft: '#e4e0d6',
          deep: '#9a9488',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.18)',
        'glass-light': '0 8px 32px rgba(15,23,42,0.08)',
        glow: '0 0 24px rgba(200,194,182,0.25)',
      },
      backdropBlur: { xs: '2px' },
      keyframes: {
        'fade-up': { '0%': { opacity: 0, transform: 'translateY(20px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        blob: { '0%,100%': { transform: 'translate(0,0) scale(1)' }, '33%': { transform: 'translate(30px,-40px) scale(1.1)' }, '66%': { transform: 'translate(-20px,20px) scale(0.95)' } },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        float: 'float 6s ease-in-out infinite',
        blob: 'blob 18s ease-in-out infinite',
        shimmer: 'shimmer 1.6s infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
      },
    },
  },
  plugins: [],
}
