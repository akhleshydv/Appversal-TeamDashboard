/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7fa',
          100: '#ebeef3',
          200: '#d3dae5',
          300: '#adb9cd',
          400: '#8193b0',
          500: '#617597',
          600: '#4d5d7d',
          700: '#3f4b66',
          800: '#364156',
          900: '#303849',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

