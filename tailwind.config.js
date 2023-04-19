/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        sage: {
          50: "#f5f7f2",
          100: "#e8ebe0",
          200: "#cfd6c4",
          300: "#acba9b",
          400: "#90a17d",
          500: "#647a4f",
          600: "#4d603b",
          700: "#3d4c30",
          800: "#323e27",
          900: "#293321",
          950: "#161c12",
        },
        red: {
          50: "#fef2f2",
          100: "#ffe1e1",
          200: "#ffc8c8",
          300: "#ff9494",
          400: "#fd6c6c",
          500: "#f53e3e",
          600: "#e22020",
          700: "#be1717",
          800: "#9d1717",
          900: "#821a1a",
          950: "#470808",
        },
      },
    },
  },
  plugins: [],
};
