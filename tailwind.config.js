/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1A2B6D',
          dark: '#111E4F',
          light: '#2E4098',
        },
        cadeli: {
          blue: '#1A2B6D',
          mid: '#2E4098',
          gray: '#F4F5F7',
          border: '#E2E4EA',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
