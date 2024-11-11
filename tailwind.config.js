/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        christi: {
          '50': '#f4faeb',
          '100': '#e5f4d3',
          '200': '#ceebab',
          '300': '#addc7a',
          '400': '#8fcb50',
          '500': '#6ca930',
          '600': '#568c24',
          '700': '#436b20',
          '800': '#37561e',
          '900': '#30491e',
          '950': '#17280b',
        },
        'waikawa-gray': {
          '50': '#f2f7fb',
          '100': '#e7f0f8',
          '200': '#d3e2f2',
          '300': '#b9cfe8',
          '400': '#9cb6dd',
          '500': '#839dd1',
          '600': '#6a7fc1',
          '700': '#6374ae',
          '800': '#4a5989',
          '900': '#414e6e',
          '950': '#262c40',
        },
      },
    },
  },
  plugins: [],
}

