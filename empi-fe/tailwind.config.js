/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: "#7bbd1e",
        beginer: "#D9EAD3",
        intermediate: "#FFF2CC",
        advanced: "#F9CB9C",
      },
    },
  },
  plugins: [],
};
