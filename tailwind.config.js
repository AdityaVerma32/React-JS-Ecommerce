/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBlue: {
          400: '#67b7d1', // light blue color
        },
        purple: {
          300: '#a88ae0', // light purple color
        },
      },
    },
  },
  plugins: [],
}

