/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // "now" can be any name you like
        now: ['Now', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
