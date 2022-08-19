const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  content: [
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'gray-1000': '#050505',
        gray: colors.neutral,
      },
    },
    fontFamily: {
      sans: ['Inter', ...fontFamily.sans],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
