/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        changeColor: "changeColor 0.8s steps(1, end) infinite",
      },
      keyframes: {
        changeColor: {
          "0%": { backgroundColor: "#D9D9D9" },
          "12.5%": { backgroundColor: "#2D2D2D" },
          "25%": { backgroundColor: "#D9D9D9" },
          "100%": { backgroundColor: "#D9D9D9" },
        },
      },
    },
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
