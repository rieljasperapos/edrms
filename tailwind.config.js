/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundColor: {
        'custom-blue': '#189AB4',
        'custom-gray': '#F0F0F0',
        'custom-green': '#6ED178',
      },
      fontFamily: {
        'Monsterrat': ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'inner-dark': 'inset 2px 2px 6px 0 rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
}

