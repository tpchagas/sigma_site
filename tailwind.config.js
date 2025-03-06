/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'sigma-dark': 'var(--color-sigma-dark)',
        'sigma-light': 'var(--color-sigma-light)',
        'sigma-neon': 'var(--color-sigma-neon)',
        'sigma-muted': 'var(--color-sigma-muted)',
      },
    },
  },
  plugins: [],
};