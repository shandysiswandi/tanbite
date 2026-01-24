import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { m } from "@/libraries/paraglide/messages";
import {
  getLocale,
  type Locale,
  setLocale,
} from "@/libraries/paraglide/runtime";

const languages = [
  { value: "en", label: "English", short: "EN" },
  { value: "id", label: "Bahasa Indonesia", short: "ID" },
] as const;

export function AppNavLanguage() {
  const activeLanguage =
    languages.find((lang) => lang.value === getLocale()) || languages[0];

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              className="hidden rounded-full lg:inline-flex"
              size="icon"
              variant="ghost"
            >
              <Globe className="size-4" />
              <span className="sr-only">{m["language.switch"]()}</span>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>{m["language.switch"]()}</TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end" className="min-w-44">
        <DropdownMenuLabel>{m["language.label"]()}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          onValueChange={(value) => setLocale(value as Locale)}
          value={activeLanguage.value}
        >
          {languages.map((option) => (
            <DropdownMenuRadioItem
              className="justify-between"
              key={option.value}
              value={option.value}
            >
              <span>{option.label}</span>
              <span className="ml-auto text-muted-foreground text-xs">
                {option.short}
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
