/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkGradientStart: "#0c0d1a",
        darkGradientEnd: "#121326",
        primaryPurple: "#1A1C45",
        secondaryPurple: "#8487AC",
      },
      backgroundImage: {
        "gradient-dark": "linear-gradient(to bottom, #0D122B, #1B1F42)",
      },
      fontFamily: {
        sans: ["InterVariable", ...defaultTheme.fontFamily.sans],
      },
    },
  },
};
