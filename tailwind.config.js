/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
        '192': '48rem',
        '216': '52rem',
      },
      borderColor: {
        'custom-blue': '#189AB4',
        'custom-gray': '#F0F0F0',
        'custom-green': '#6ED178',
      },
      backgroundColor: {
        'custom-blue': '#189AB4',
        'custom-gray': '#F0F0F0',
        'custom-green': '#6ED178',
      },
      fontFamily: {
        'Monsterrat': ['Montserrat', 'sans-serif'],
        'Karla': ['Karla','sans-serif'],
      },
      boxShadow: {
        'inner-dark': 'inset 2px 2px 6px 0 rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
}

