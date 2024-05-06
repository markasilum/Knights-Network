/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        TrajanRegular: ["Trajan-Regular", "serif"],
        sans: ["Gotham-Book", "sans-serif"],
        gothamMedium: ["Gotham-Medium", "sans-serif"],
        gothamLight: ["Gotham-Light", "sans-serif"],
        palatino:['"Palatino-Normal Regular"', "serif"],
      },
    },
  },daisyui: {
    themes: [
      {
        mytheme: {
        "primary": "#2F3590",
        "secondary": "#444444",
        "accent": "#1EAEEC",
        "neutral": "#F8F8F8",
        "base-100": "#ffffff",
        "info": "#CCCCCC",
        "success": "#19A554",
        "warning": "#FDF036",
        "error": "#E9222E",
        },
      },
      
    ],
  },
  plugins: [
    require("daisyui"),
  ],

}

