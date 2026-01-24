import { createContext, use } from "react";
import type { Theme } from "@/app/servers/cookies";

interface ThemeContext {
  theme: Theme;
  setTheme: (val: Theme) => void;
}

export const ThemeContext = createContext<ThemeContext | null>(null);

export function useTheme() {
  const context = use(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider!");
  }
  return context;
}
