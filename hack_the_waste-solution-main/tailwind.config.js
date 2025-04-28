/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'fost-primary': '#456f2b',
        'fost-secondary': '#578c37',
        'fost-bg': '#f7f9ed',
      },
    },
  },
  plugins: [],
};