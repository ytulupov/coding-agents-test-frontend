"use client";

import type { ReactNode } from "react";
import { useTheme as useThemeHook } from "@/hooks/useTheme";
import { createContext, useContext } from "react";

const ThemeContext = createContext<ReturnType<typeof useThemeHook> | null>(null);

export interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useThemeHook();

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}