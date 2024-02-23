const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // for next-themes
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: colors.gray,
        gray: {
          // 50: 'rgb(245, 245, 245)',
          // 100: 'rgb(255, 227, 87)',
          // 200: 'rgb(255, 213, 74)',
          // 300: 'rgb(255, 199, 60)',
          // 400: 'rgb(255, 185, 47)',
          // 500: 'rgb(255, 172, 32)',
          // 600: 'rgb(245, 158, 11)',
          // 700: 'rgb(229, 145, 0)',
          // 800: 'rgb(213, 133, 22)',
          // 900: 'rgb(198, 120, 0)',
        }
      },
      fontFamily: {
        sans: ["var(--skin-font-sans)", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
