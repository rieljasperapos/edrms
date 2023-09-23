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
        'custom-gray': 'E4E4E4',
      }
    },
  },
  plugins: [],
}

