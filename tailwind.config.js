const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "custom-green": "0px 5px 0px rgba(57, 181, 74, 1)",
        "custom-black": "0px 5px 0px rgba(25,26,35,1)",
        "custom-white": "0px 5px 0px #f3f3f3",
        "dashboard-button": "0px 2px 0px rgba(25,26,35,1)",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
