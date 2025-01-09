import React, { createContext, useContext, useState, useEffect } from "react";
import { useMemo } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage for saved theme, default to light
    return localStorage.getItem("active_theme") || "dark";
  });

  const isDark = useMemo(() => (theme == "dark" ? true : false), [theme]);
  useEffect(() => {
    // Save theme to localStorage whenever it changes
    localStorage.setItem("active_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme }}>
      <div className={`${theme} h-svh overflow-hidden`}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
