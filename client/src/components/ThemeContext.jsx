import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [nightMode, setNightMode] = useState(() => {
    const saved = localStorage.getItem("nightMode");
    return saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("nightMode", nightMode);
  }, [nightMode]);

  return (
    <ThemeContext.Provider value={{ nightMode, setNightMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
