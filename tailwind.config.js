/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

const calcPlugin = plugin(function ({ addUtilities }) {
  addUtilities({
    '.chatcomp': {
      minHeight: 'calc(100vh - 12rem)'
    },

    '.convdiv': {
      maxHeight: 'calc(100vh - 20rem)',
      height: 'calc(100vh - 20rem)'
    }

  })
})

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [calcPlugin],
};
