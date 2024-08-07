/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["'Roboto', 'Arial'"],
      },
      colors: {
        lightBeige: "#F9F3E5",
        mediumYellow: "#F4D799",
      },
      // Custom utilities for pseudo-elements
      content: {
        checkMark: '"\\1F5F9"',
      },
    },
  },
  plugins: [
    function ({ addComponents, theme }) {
      addComponents({
        ".spanEle::before": {
          content: theme("content.checkMark"),
          color: "green",
          fontWeight: "900",
          fontSize: "1rem",
        },
      });
    },
  ],
};
