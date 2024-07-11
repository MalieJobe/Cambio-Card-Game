/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        'primary': '#671ff3',
        'secondary': '#dc7df8',
        'danger': '#de608e',
        'dark': '#060111',
        'light': '#f8f5fe',
      },
    },
  },
  plugins: [],
}

