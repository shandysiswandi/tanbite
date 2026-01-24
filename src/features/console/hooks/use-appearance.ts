import { createContext, useContext } from "react";

export type Density = "compact" | "comfortable" | "spacious";
export type ThemePreset = (typeof themePresets)[number];

const densities = ["compact", "comfortable", "spacious"] as const;
export const themePresets = [
  "default",
  "modern-minimal",
  "violet-bloom",
  "t3-chat",
  "twitter",
  "mocha-mousse",
  "bubblegum",
  "amethyst-haze",
  "notebook",
  "doom-64",
  "catppuccin",
  "graphite",
  "perpetuity",
  "kodama-grove",
  "cosmic-night",
  "tangerine",
  "quantum-rose",
  "nature",
  "bold-tech",
  "elegant-luxury",
  "amber-minimal",
  "supabase",
  "neo-brutalism",
  "solar-dusk",
  "claymorphism",
  "cyberpunk",
  "pastel-dreams",
  "clean-slate",
  "caffeine",
  "ocean-breeze",
  "retro-arcade",
  "midnight-bloom",
  "candyland",
  "northern-lights",
  "vintage-paper",
  "sunset-horizon",
  "starry-night",
  "claude",
  "vercel",
  "darkmatter",
  "mono",
  "soft-pop",
  "sage-garden",
] as const;

export function isDensity(value: string): value is Density {
  return densities.includes(value as Density);
}

export function isThemePreset(value: string): value is ThemePreset {
  return themePresets.includes(value as ThemePreset);
}

interface AppearanceContextValue {
  density: Density;
  setDensity: (density: Density) => void;
  themePreset: ThemePreset;
  setThemePreset: (themePreset: ThemePreset) => void;
}

export const AppearanceContext = createContext<AppearanceContextValue | null>(
  null
);

export function useAppearance() {
  const context = useContext(AppearanceContext);
  if (!context) {
    throw new Error("useAppearance must be used within AppearanceProvider");
  }
  return context;
}
