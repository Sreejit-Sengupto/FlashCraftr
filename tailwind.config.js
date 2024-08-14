/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'red-ball': '0 35px 60px 155px #211012',
      }
    },
  },
  plugins: [],
}