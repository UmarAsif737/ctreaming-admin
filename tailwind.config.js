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
    colors: {
      // Example custom colors
      primary2: "#E01616",
      secondary: "#0C111D",
      tertiary: "#475467",
      gray1: "#F2F4F7",
      gray2: "#F5F7FA",
      gray3: "#F9FAFB",
      gray4: "#101828",
      gray5: "#F1F5F9",
      blackText: "#182230",
      borderGray: "#EAECF0",
      borderGray2: "#D0D5DD",
      borderGray3: "#B0B0B0",
      green1: "#079455",
      slate: "#344054",
      muted: "#64748B",
      quaternary: "#667085",
      quaternary2: "#98A2B3"
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
