/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        custom_bg_one: "var(--custom_bg_one)",
        custom_bg_two: "var(--custom_bg_two)",
      },
    },
  },
  plugins: [],
};
