/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        oswald:['Oswald','sans-serif'],
        orbitron:['Orbitron','sans-serif'],
        open:['Open Sans','sans-serif'],
        archivo:['Archivo Black','sans-serif']
      }
    },
  },
  plugins: [],
}

