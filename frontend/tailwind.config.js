/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        scientific: {
          blue: '#1a56db',
          teal: '#0e9f6e',
          gray: '#f3f4f6',
          dark: '#111827',
          light: '#ffffff'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
