// tailwind.config.js
const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
  plugins: [flowbite.plugin()], 
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Helvetica", "sans-serif"], // Set Barrio as the default font
        barrio: ["Barrio", "sans-serif"], // Set Barrio as the default font
      },
      backgroundImage: {
        "bg-gradient": "url('/assets/header-bg.png')", 
      },
    },
  },
};
