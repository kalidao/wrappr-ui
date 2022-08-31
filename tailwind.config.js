/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          '50': '#E6FFFF',
          '100': '#B8FEFE',
          '200': '#8BFEFE',
          '300': '#5EFDFD',
          '400': '#30FDFD',
          '500': '#03FCFC',
          '600': '#02CACA',
          '700': '#029797',
          '800': '#016565',
          '900': '#013232',
        },
      }
    },
  },
  plugins: [],
}
