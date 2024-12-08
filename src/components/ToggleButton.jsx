import React, { useState } from "react";
import MoonIcon from "../assets/icons/MoonIcon";
import SunIcon from "../assets/icons/SunIcon";

const ToggleButton = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={toggleTheme}
        className="relative  justify-center p-2 w-24 gap-4 transition-colors duration-300 bg-[#313639] rounded-xl "
      >
        <div
          className={`rounded-lg bg-gray-300 size-10 shadow-md transform transition-transform duration-300 p-2 ${
            darkMode ? "translate-x-10" : "translate-x-0"
          }`}
        >
          <div className="relative text-[#21272B]">
            <MoonIcon
              className={`absolute transition-all duration-300 ${
                darkMode ? "opacity-100" : "opacity-0"
              }`}
            />
            <SunIcon
              className={`absolute transition-all duration-300 ${
                darkMode ? "opacity-0" : "opacity-100"
              }`}
            />
          </div>
        </div>
      </button>
    </div>
  );
};

export default ToggleButton;
