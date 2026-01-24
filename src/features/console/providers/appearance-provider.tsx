import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import {
  AppearanceContext,
  type Density,
  isDensity,
  isThemePreset,
  type ThemePreset,
  themePresets,
} from "../hooks/use-appearance";

const DENSITY_STORAGE_KEY = "density";
const THEME_PRESET_STORAGE_KEY = "theme-preset";

export function AppearanceProvider({ children }: { children: ReactNode }) {
  const [density, setDensity] = useState<Density>(() => {
    if (typeof window === "undefined") {
      return "comfortable";
    }

    const storedDensity = window.localStorage.getItem(DENSITY_STORAGE_KEY);
    return storedDensity && isDensity(storedDensity)
      ? storedDensity
      : "comfortable";
  });
  const [themePreset, setThemePreset] = useState<ThemePreset>(() => {
    if (typeof window === "undefined") {
      return "default";
    }

    const storedThemePreset = window.localStorage.getItem(
      THEME_PRESET_STORAGE_KEY
    );
    return storedThemePreset && isThemePreset(storedThemePreset)
      ? storedThemePreset
      : "default";
  });

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (!(event.key && event.newValue)) {
        return;
      }

      if (event.key === DENSITY_STORAGE_KEY && isDensity(event.newValue)) {
        setDensity(event.newValue);
      }

      if (
        event.key === THEME_PRESET_STORAGE_KEY &&
        isThemePreset(event.newValue)
      ) {
        setThemePreset(event.newValue);
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  useEffect(() => {
    window.localStorage.setItem(DENSITY_STORAGE_KEY, density);
  }, [density]);

  useEffect(() => {
    const rootElement = document.documentElement;

    rootElement.classList.remove(
      ...themePresets.filter((preset) => preset !== "default")
    );

    if (themePreset !== "default") {
      rootElement.classList.add(themePreset);
    }

    window.localStorage.setItem(THEME_PRESET_STORAGE_KEY, themePreset);
  }, [themePreset]);

  return (
    <AppearanceContext.Provider
      value={{ density, setDensity, themePreset, setThemePreset }}
    >
      {children}
    </AppearanceContext.Provider>
  );
}
