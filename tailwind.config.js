/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: '#1a1a1a',
          deep: '#141414',
        },
        card: {
          DEFAULT: '#232323',
          hover: '#2a2a2a',
        },
        ink: {
          DEFAULT: '#e8e6e3',
          dim: '#8a8a8a',
          faint: '#5c5c5c',
        },
        accent: {
          DEFAULT: '#ff5c8a',
          dim: '#ff5c8a33',
        },
        border: {
          DEFAULT: '#333333',
          light: '#3d3d3d',
        },
        cat: {
          work: { bg: '#3a2f1f', text: '#e8b06b', dot: '#e8b06b' },
          personal: { bg: '#1f3530', text: '#6bd9a8', dot: '#6bd9a8' },
          urgent: { bg: '#3a1f24', text: '#ed6b8a', dot: '#ed6b8a' },
          ideas: { bg: '#241f3a', text: '#a98bf0', dot: '#a98bf0' },
          none: { bg: '#2a2a2a', text: '#8a8a8a', dot: '#5c5c5c' },
        },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '18px',
        pill: '999px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.4)',
        popover: '0 12px 32px rgba(0,0,0,0.55)',
      },
    },
  },
  plugins: [],
}
