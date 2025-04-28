const defaultTheme = require("tailwindcss/defaultTheme");
const svgToDataUri = require("mini-svg-data-uri");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
        },
        background: {
          light: "#f5f5f5",
          dark: "#1a1a1a",
        },
      },
    },
  },
  plugins: [
    addVariablesForColors,
    function ({ matchUtilities, theme }) {
      const createSvgPattern = (svg, color) =>
        `url("${svgToDataUri(svg.replace(/\$COLOR/g, color))}")`;

      matchUtilities(
        {
          "bg-grid": (value) => ({
            backgroundImage: createSvgPattern(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="$COLOR">
                <path d="M0 .5H31.5V32"/>
              </svg>`,
              value
            ),
          }),
          "bg-grid-small": (value) => ({
            backgroundImage: createSvgPattern(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" width="8" height="8" fill="none" stroke="$COLOR">
                <path d="M0 .5H31.5V32"/>
              </svg>`,
              value
            ),
          }),
          "bg-dot": (value) => ({
            backgroundImage: createSvgPattern(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="none">
                <circle fill="$COLOR" cx="8" cy="8" r="2"/>
              </svg>`,
              value
            ),
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
};

// Adds Tailwind color variables to :root
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

  addBase({
    ":root": newVars,
  });
}
