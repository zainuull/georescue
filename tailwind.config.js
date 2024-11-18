/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}', // sesuaikan jika menggunakan folder 'app'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
