/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        custom_orange: "#F6682B",

        custom_bg_one: "var(--custom_bg_one)",
        custom_bg_two: "var(--custom_bg_two)",
        custom_bg_three: "var(--custom_bg_three)",
        custom_bg_four: "var(--custom_bg_four)",
        custom_bg_five: "var(--custom_bg_five)",
        custom_bg_six: "var(--custom_bg_six)",
        custom_bg_seven: "var(--custom_bg_seven)",
        custom_bg_eight: "var(--custom_bg_eight)",

        custom_text_one: "var(--custom_text_one)",
        custom_text_two: "var(--custom_text_two)",
        custom_text_three: "var(--custom_text_three)",
        custom_text_four: "var(--custom_text_four)",
        custom_text_five: "var(--custom_text_five)",
        custom_text_six: "var(--custom_text_six)",

        custom_line_one: "var(--custom_line_one)",
        custom_line_two: "var(--custom_line_two)",
        custom_line_three: "var(--custom_line_three)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
