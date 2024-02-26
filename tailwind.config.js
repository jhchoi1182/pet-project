/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".tooltipTail::after": {
          content: '""',
          position: "absolute",
          bottom: "-15px",
          left: "50%",
          transform: "translate(-50%, 50%)",
          borderWidth: "15px",
          borderColor: "white transparent transparent transparent",
        },
        ".h-nav": {
          height: "59px",
        },
        ".h-board": {
          height: "calc(100% - 119px)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
