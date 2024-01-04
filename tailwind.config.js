/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      const tooltip = {
        ".tooltipTail::after": {
          content: '""',
          position: "absolute",
          bottom: "-15px",
          left: "50%",
          transform: "translate(-50%, 50%)",
          borderWidth: "15px",
          borderColor: "white transparent transparent transparent",
        },
      };
      addComponents(tooltip);
    },
  ],
};
