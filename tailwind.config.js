const flowbite = require("flowbite-react/tailwind");
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      goldenSand: "#f2cc8f",
      sageGreen: "#81b29a",
      indigoNight: "#3d405b",
      coralSunset: "#e07a5f",
      ivoryCream: "#f4f1de",
    },
  },
  darkMode: "class",
  plugins: [flowbite.plugin(), nextui()],
};
