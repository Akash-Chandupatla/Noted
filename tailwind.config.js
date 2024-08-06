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
        checkmark: '"\\2714"',
      },
    },
  },
  plugins: [
    function ({ addComponents, theme }) {
      addComponents({
        ".spanEle::before": {
          content: theme("content.checkmark"),
          color: "green",
          fontWeight: "900",
          fontSize: "1rem",
        },
      });
    },
  ],
};
