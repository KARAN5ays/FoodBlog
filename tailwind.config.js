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
        // Essential Engineering Palette
        border: 'var(--border-custom)',
        background: 'var(--bg-body)',
        foreground: 'var(--text-primary)',
        surface: 'var(--bg-surface)',
        "text-secondary": 'var(--text-secondary)',
        link: 'var(--link)',
        input: 'var(--bg-muted)',

        // Brand Colors
        primary: {
          DEFAULT: 'var(--text-primary)',
          foreground: 'var(--bg-body)',
        },
        // Professional Dev Blue
        dev: {
          blue: '#0969da',
        }
      },
      borderRadius: {
        // Sharp technical corners
        'dev': '4px',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        // Added for technical metadata/counters
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Required for manual theme switching
}