import { useRouter } from "@tanstack/react-router";
import { type PropsWithChildren, useEffect } from "react";
import { ThemeContext } from "@/app/hooks/use-theme";
import { setThemeServerFn, type Theme } from "@/app/servers/cookies";

export function ThemeProvider({
  children,
  theme,
}: PropsWithChildren<{ theme: Theme }>) {
  const router = useRouter();

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      let resolvedTheme = theme;

      if (theme === "system") {
        resolvedTheme = media.matches ? "dark" : "light";
        setThemeServerFn({ data: resolvedTheme });
      }

      root.classList.remove("light", "dark", "system");
      root.classList.add(resolvedTheme);
    };

    applyTheme();

    if (theme === "system") {
      media.addEventListener("change", applyTheme);
      return () => media.removeEventListener("change", applyTheme);
    }
  }, [theme]);

  function setTheme(theme: Theme) {
    setThemeServerFn({ data: theme }).then(() => router.invalidate());
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
