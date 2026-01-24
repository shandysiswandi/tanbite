import { createFileRoute } from "@tanstack/react-router";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { PageBase } from "@/features/console/components/page-base";
import {
  isDensity,
  isThemePreset,
  themePresets,
  useAppearance,
} from "@/features/console/hooks/use-appearance";
import {
  getLocale,
  type Locale,
  setLocale,
} from "@/libraries/paraglide/runtime";
import { seo } from "@/libraries/utils/seo";

const languagesMap = [
  { value: "en", label: "English" },
  { value: "id", label: "Bahasa Indonesia" },
] as const;

const themePresetsMap = themePresets.map((preset) => ({
  value: preset,
  label:
    preset === "default"
      ? "Default"
      : preset
          .split("-")
          .map((word) => word[0]?.toUpperCase() + word.slice(1))
          .join(" "),
}));

export const Route = createFileRoute("/console/me/settings/appearance")({
  head: () => ({
    meta: seo({
      path: "/console/me/settings/appearance",
      title: "Appearance settings",
      description:
        "Personalize your workspace visuals, density, and language preferences.",
    }),
  }),
  component: () => {
    const { theme, setTheme } = useTheme();
    const { density, setDensity, themePreset, setThemePreset } =
      useAppearance();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    const handleContentDensityChange = (value: string) => {
      if (!isDensity(value)) {
        return;
      }

      setDensity(value);
    };

    const handleThemePresetChange = (value: string) => {
      if (!isThemePreset(value)) {
        return;
      }

      setThemePreset(value);
    };

    return (
      <PageBase
        subtitle="Personalize your workspace visuals, density, and language preferences."
        title="Appearance settings"
      >
        <Card>
          <CardHeader>
            <CardTitle>Theme and display</CardTitle>
            <CardDescription>
              Choose how the interface looks across this device.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <Field className="space-y-2">
                <FieldLabel htmlFor="theme-mode">Theme mode</FieldLabel>
                {isMounted ? (
                  <Select
                    onValueChange={(value) => setTheme(value)}
                    value={theme ?? "system"}
                  >
                    <SelectTrigger className="w-full" id="theme-mode">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system">
                        <span className="inline-flex items-center gap-2">
                          <Monitor className="size-4" />
                          System
                        </span>
                      </SelectItem>
                      <SelectItem value="light">
                        <span className="inline-flex items-center gap-2">
                          <Sun className="size-4" />
                          Light
                        </span>
                      </SelectItem>
                      <SelectItem value="dark">
                        <span className="inline-flex items-center gap-2">
                          <Moon className="size-4" />
                          Dark
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Skeleton className="h-9 w-full" />
                )}
              </Field>

              <Field className="space-y-2">
                <FieldLabel htmlFor="theme-preset">Theme preset</FieldLabel>
                {isMounted ? (
                  <Select
                    onValueChange={handleThemePresetChange}
                    value={themePreset}
                  >
                    <SelectTrigger className="w-full" id="theme-preset">
                      <SelectValue placeholder="Select preset" />
                    </SelectTrigger>
                    <SelectContent>
                      {themePresetsMap.map((preset) => (
                        <SelectItem key={preset.value} value={preset.value}>
                          {preset.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Skeleton className="h-9 w-full" />
                )}
              </Field>

              <Field className="space-y-2">
                <FieldLabel htmlFor="content-density">
                  Content density
                </FieldLabel>
                {isMounted ? (
                  <Select
                    onValueChange={handleContentDensityChange}
                    value={density}
                  >
                    <SelectTrigger className="w-full" id="content-density">
                      <SelectValue placeholder="Select density" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="comfortable">Comfortable</SelectItem>
                      <SelectItem value="spacious">Spacious</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Skeleton className="h-9 w-full" />
                )}
              </Field>

              <Field className="space-y-2">
                <FieldLabel htmlFor="language">Language</FieldLabel>
                {isMounted ? (
                  <Select
                    defaultValue={getLocale()}
                    onValueChange={(value) => setLocale(value as Locale)}
                  >
                    <SelectTrigger className="w-full" id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languagesMap.map((language) => (
                        <SelectItem key={language.value} value={language.value}>
                          {language.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Skeleton className="h-9 w-full" />
                )}
              </Field>
            </div>
          </CardContent>

          <CardFooter>
            <p className="text-muted-foreground text-xs">
              Appearance changes are saved for this browser and device only, so
              they will not affect your settings on other devices or accounts.
            </p>
          </CardFooter>
        </Card>
      </PageBase>
    );
  },
});
