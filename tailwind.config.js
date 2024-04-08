/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./coba.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mulish: ["mulish", "sans-serif"],
        inter: ["inter", "sans-serif"],
      },
      colors: {
        blue: "#1D4ED8",
        "light-blue": "#2563EB",
        "semi-black": "#4E4B66",
        "darkest-grey": "#696F79",
        "darker-grey": "#AAAAAA",
        "dark-grey": "#A0A3BD",
        grey: "#DEDEDE",
        "light-grey": "#F6F6F8",
        "lighter-grey": "#FCFDFE",
        green: "#00BA88",
        red: "#E82C2C",
      },
      borderWidth: {
        1: "1px",
      },
      boxShadow: {
        outset: "0 0 0 5000px rgba(0, 0, 0, 0.5)",
        inset: "inset 0 0 0 5000px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
