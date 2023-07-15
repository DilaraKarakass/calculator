/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js}"
  ],
  theme: {
    extend: {
      colors:{
        gray:{
          500:'#808080',
          600:'#6D6D6D',
          800:'#626060',
          900:'#1E1E1E'
        },
        orange:{
          500:'#EE9D00',
          800:'#A86F00'        
        }
      },
      fontFamily:{
        inter:'"Inter",sans-serif',
        worksans:'"Work Sans",sans-serif'
      }
    },
  },
  plugins: [],
}

