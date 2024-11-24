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
        sans: ['Poppins', 'sans-serif'], 
        barrio: ["Barrio", "sans-serif"],
      },
      backgroundImage: {
        "bg-gradient": "url('/assets/header-bg.png')", 
      },
    },
  },
};
