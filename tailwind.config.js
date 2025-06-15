/* tailwind.config.js */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'totalcar-azul': '#002B5B',
        'totalcar-amarillo': '#FFD500',
        'totalcar-naranja': '#FF6B00',
        'totalcar-grafito': '#2B2B2B',
        'totalcar-hielo': '#F4F4F4',
      },
    },
  },
  plugins: [],
}
