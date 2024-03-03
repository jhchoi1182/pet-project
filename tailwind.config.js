/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        electrolize: ["var(--font-electrolize)"],
      },
      fontSize: {
        body01: ["24px", { lineHeight: "1.5" }],
        body02: ["24px", { lineHeight: "1.5", fontWeight: "600" }],
        body03: ["16px", { lineHeight: "1.4" }],
        body04: ["16px", { lineHeight: "1.4", fontWeight: "600" }],
        btn01: ["28px", { fontWeight: "500" }],
        btn02: ["20px", { fontWeight: "600" }],
        time01: ["24px", { fontFamily: "var(--font-electrolize)", lineHeight: "1.3" }],
        time02: ["42px", { fontFamily: "var(--font-electrolize)", lineHeight: "1.1" }],
        time03: ["60px", { fontFamily: "var(--font-electrolize)", lineHeight: "1" }],
        selectInput: ["20px", { fontWeight: "600" }],
        info: ["16px", { fontFamily: "var(--font-electrolize)", lineHeight: "1.4" }],
        days: ["26px", { fontWeight: "500" }],
        charCount: ["12px", { lineHeight: "1.2" }],
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
