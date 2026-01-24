import { useTheme } from "next-themes";
import type { MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ModeSwitcher() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = (event: MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    root.style.setProperty("--x", `${event.clientX}px`);
    root.style.setProperty("--y", `${event.clientY}px`);

    if (!document.startViewTransition) {
      setTheme(theme === "dark" ? "light" : "dark");
      return;
    }

    root.classList.add("theme-reveal-transition");

    const transition = document.startViewTransition(() => {
      setTheme(theme === "dark" ? "light" : "dark");
    });

    transition.finished.finally(() => {
      root.classList.remove("theme-reveal-transition");
    });
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className="group/toggle extend-touch-target size-8"
          onClick={toggleTheme}
          size="icon"
          variant="ghost"
        >
          <svg
            className="size-4.5"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Toggle theme</title>
            <path d="M0 0h24v24H0z" fill="none" stroke="none" />
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M12 3l0 18" />
            <path d="M12 9l4.65 -4.65" />
            <path d="M12 14.3l7.37 -7.37" />
            <path d="M12 19.6l8.85 -8.85" />
          </svg>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Toggle Mode</p>
      </TooltipContent>
    </Tooltip>
  );
}
