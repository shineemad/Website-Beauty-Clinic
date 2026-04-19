import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#FCFAF8',
        charcoal: '#1A1A1A',
        gold: '#D5B97D',
        rose: '#DDBEBB',
        muted: '#8A8279'
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'sans-serif']
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        28: '7rem',
        36: '9rem'
      }
    }
  },
  plugins: []
};

export default config;