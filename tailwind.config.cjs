/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '16px 0',
    },
    extend: {
      boxShadow: {
        page: '0 0 14px rgba(0,0,0,.04), 0 4px 16px rgba(0,0,0,.05)',
      },
    },
  },
  plugins: [],
};
