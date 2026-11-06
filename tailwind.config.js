/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        baa: {
          cream:      '#FAF6F0',
          terracotta: '#C5602A',
          night:      '#2C1810',
          warm:       '#FFFFFF',
          salmon:     '#F5E0D0',
          charcoal:   '#1A1A1A',
          muted:      '#6B5E57',
          success:    '#4CAF50',
          warning:    '#F59E0B',
        }
      },
      fontFamily: {
        sans:   ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif:  ['"Cormorant Garamond"', 'Georgia', 'serif'],
        mono:   ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      animation: {
        'pulse-dot':  'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blink':      'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
      },
      backdropBlur: {
        xl: '24px',
      },
    },
  },
  plugins: [],
}

