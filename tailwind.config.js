/** @type {import('tailwindcss').Config} */
import tailwindcssAnimated from "tailwindcss-animated";
import fluid, { extract, screens, fontSize } from "fluid-tailwind";
import { extendTailwindMerge } from "tailwind-merge";
import { withFluid } from "@fluid-tailwind/tailwind-merge";

export const twMerge = extendTailwindMerge(withFluid);
export default {
  content: {
    files: [("./index.html", "./src/**/*.{js,ts,jsx,tsx}")],
    extract,
  },
  theme: {
    screens,
    fontSize,
    extend: {
      colors: {
        custom_orange: "#F6682B",
        custom_yellow: "#FFC600",

        custom_bg_one: "var(--custom_bg_one)",
        custom_bg_two: "var(--custom_bg_two)",
        custom_bg_three: "var(--custom_bg_three)",
        custom_bg_four: "var(--custom_bg_four)",
        custom_bg_five: "var(--custom_bg_five)",
        custom_bg_six: "var(--custom_bg_six)",
        custom_bg_seven: "var(--custom_bg_seven)",
        custom_bg_eight: "var(--custom_bg_eight)",
        custom_bg_nine: "var(--custom_bg_nine)",
        custom_bg_ten: "var(--custom_bg_ten)",
        custom_bg_eleven: "var(--custom_bg_eleven)",
        custom_bg_twelve: "var(--custom_bg_twelve)",
        custom_bg_thirteen: "var(--custom_bg_thirteen)",

        custom_text_one: "var(--custom_text_one)",
        custom_text_two: "var(--custom_text_two)",
        custom_text_three: "var(--custom_text_three)",
        custom_text_four: "var(--custom_text_four)",
        custom_text_five: "var(--custom_text_five)",
        custom_text_six: "var(--custom_text_six)",
        custom_text_seven: "var(--custom_text_seven)",
        custom_text_eight: "var(--custom_text_eight)",
        custom_text_nine: "var(--custom_text_nine)",
        custom_text_ten: "var(--custom_text_ten)",
        custom_text_eleven: "var(--custom_text_eleven)",
        custom_text_twelve: "var(--custom_text_twelve)",

        custom_line_one: "var(--custom_line_one)",
        custom_line_two: "var(--custom_line_two)",
        custom_line_three: "var(--custom_line_three)",
        custom_line_four: "var(--custom_line_four)",
        custom_line_five: "var(--custom_line_five)",
        custom_line_six: "var(--custom_line_six)",
        custom_line_seven: "var(--custom_line_seven)",
        custom_line_eight: "var(--custom_line_eight)",
        custom_line_nine: "var(--custom_line_nine)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "serif"],
        eiMessiri: ["El Messiri", "serif"],
      },
      // screens: {
      //   xs: "20rem",
      // },
    },
  },
  plugins: [fluid, tailwindcssAnimated],
};
