/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#d9e6ff",
          500: "#4361ee",
          600: "#3651d4",
          700: "#2a3fa8",
        },
      },
    },
  },
  plugins: [],
};
