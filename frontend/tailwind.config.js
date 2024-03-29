/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        yellow: {
          light: "#ebbc3d",
          default: "#E0B313",
          dark: "#CAAA37",
        },
        blue: {
          light: "#8AA9C7",
          default: "#8AA9C7",
          dark: "#8AA9C7",
        }
      },
      screens: {
        xs: { max: "475px" },
      },
    },
  },
  plugins: [],
};
