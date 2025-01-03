import React, { useMemo, useState } from "react";
import MoonIcon from "@/assets/icons/MoonIcon";
import SunIcon from "@/assets/icons/SunIcon";
import { useTheme } from "@/context/ThemeProvider";

const ButtonToggleTheme = () => {
  // const [darkMode, setDarkMode] = useState(false);
  const { theme, toggleTheme } = useTheme()
  const darkMode = useMemo(() => {
    return theme === 'dark' ? true : false
  }, [theme])
  // const toggleTheme = () => {
  //   setDarkMode((oldValue) => !oldValue);
  // };

  return (
    <button
      onClick={toggleTheme}
      className="relative justify-center w-20 h-12 gap-4 p-2 transition-colors duration-300 border outline-none bg-custom_bg_two rounded-xl border-custom_line_three"
    >
      <div
        className={`relative rounded-md bg-custom_bg_three text-custom_text_three w-9 h-full shadow-md transform transition-transform duration-300 ${darkMode ? "translate-x-0" : "translate-x-7"
          }`}
      >
        <MoonIcon
          className={`absolute size-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${darkMode ? "opacity-100" : "opacity-0"
            }`}
        />
        <SunIcon
          className={`absolute size-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${darkMode ? "opacity-0" : "opacity-100"
            }`}
        />
      </div>
    </button>
  );
};

export default ButtonToggleTheme;
