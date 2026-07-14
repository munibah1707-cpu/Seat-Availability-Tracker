import React, { createContext, useState, useContext } from "react";

// 1. Create Context with a defensive null placeholder
const ThemeContext = createContext(null);

// 2. Build the Provider component that controls the state
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light"); // State is either "light" or "dark"

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Broadcast BOTH the theme string and toggle handler together as an object
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Custom hook for ultra-safe, clean consumer usage
export function useTheme() {
  const context = useContext(ThemeContext);
  
  // Defensive guard clause: Crash explicitly if hook is used out-of-bounds
  if (!context) {
    throw new Error("useTheme must be used inside a nested <ThemeProvider>");
  }
  
  return context;
}
