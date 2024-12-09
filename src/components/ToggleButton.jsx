import React, { useState } from "react";
import MoonIcon from "../assets/icons/MoonIcon";
import SunIcon from "../assets/icons/SunIcon";

const ToggleButton = ({ darkMode, setDarkMode }) => {
  // const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((oldValue) => !oldValue);
  };

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={toggleTheme}
        className="relative justify-center w-24 gap-4 p-2 transition-colors duration-300 bg-custom_bg_two rounded-xl "
      >
        <div
          className={`rounded-lg bg-gray-300 size-10 shadow-md transform transition-transform duration-300 p-2 ${
            darkMode ? "translate-x-10" : "translate-x-0"
          }`}
        >
          <div className="relative text-custom_bg_one">
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
