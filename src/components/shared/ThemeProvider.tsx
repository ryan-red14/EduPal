"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = 
  | "scholar" 
  | "midnight" 
  | "heritage" 
  | "horizon" 
  | "forest" 
  | "classic-light";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  fontFamily: string;
  setFontFamily: (font: string) => void;
  fontSize: "small" | "default" | "large" | "extra-large";
  setFontSize: (size: "small" | "default" | "large" | "extra-large") => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>("scholar");
  const [fontFamily, setFontFamilyState] = useState<string>("inter");
  const [fontSize, setFontSizeState] = useState<"small" | "default" | "large" | "extra-large">("default");

  useEffect(() => {
    // Read from localStorage on mount
    const savedTheme = localStorage.getItem("edupal-theme") as Theme;
    if (savedTheme) {
      setThemeState(savedTheme);
      applyThemeClass(savedTheme);
    } else {
      applyThemeClass("scholar");
    }

    const savedFont = localStorage.getItem("edupal-font");
    if (savedFont) setFontFamilyState(savedFont);

    const savedFontSize = localStorage.getItem("edupal-font-size") as any;
    if (savedFontSize) setFontSizeState(savedFontSize);
  }, []);

  const applyThemeClass = (newTheme: Theme) => {
    const root = document.documentElement;
    // Remove other theme classes
    root.classList.remove(
      "theme-scholar",
      "theme-midnight",
      "theme-heritage",
      "theme-horizon",
      "theme-forest",
      "theme-classic-light"
    );
    // Add new theme class
    root.classList.add(`theme-${newTheme}`);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("edupal-theme", newTheme);
    applyThemeClass(newTheme);
  };

  const setFontFamily = (font: string) => {
    setFontFamilyState(font);
    localStorage.setItem("edupal-font", font);
  };

  const setFontSize = (size: "small" | "default" | "large" | "extra-large") => {
    setFontSizeState(size);
    localStorage.setItem("edupal-font-size", size);
  };

  // Get CSS font size scale
  const getFontSizeClass = () => {
    switch (fontSize) {
      case "small": return "text-[13px]";
      case "large": return "text-[16px]";
      case "extra-large": return "text-[18px]";
      default: return "text-[14px]";
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, fontFamily, setFontFamily, fontSize, setFontSize }}>
      <div 
        className={getFontSizeClass()} 
        style={{ fontFamily: `var(--font-${fontFamily}), sans-serif` }}
      >
        {children}
      </div>
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
