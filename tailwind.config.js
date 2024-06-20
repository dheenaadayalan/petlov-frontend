const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./Components/**/*.{js,ts,jsx,tsx}",
    "./Pages/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  prefix: 'tw-',
  theme: {
    extend: {
      colors: {
        primary: "#053B50",
        secondary: "#176B87",
        tertiary : "#64CCC5",
        quaternary:'#EEEEEE',
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
    },
  },
  plugins: [
    flowbite.plugin()
  ],
}

