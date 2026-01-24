import { createFileRoute, Link } from "@tanstack/react-router";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PageBase } from "@/features/console/components/page-base";
import { useProfile } from "@/features/console/hooks/use-profile";
import { getLocale } from "@/libraries/paraglide/runtime";
import { seo } from "@/libraries/utils/seo";

export const Route = createFileRoute("/console/me/")({
  head: () => ({
    meta: seo({
      path: "/console/me/",
      title: "Your personal details",
      description: "Review the information tied to your console account.",
    }),
  }),
  component: () => {
    const { profile, isProfileLoading } = useProfile();
    const name = profile?.name ?? "Sasha Cullen";
    const email = profile?.email ?? "sasha@gobite.com";
    const initials = name.trim().charAt(0) || "U";
    const [timezoneLabel, setTimezoneLabel] = useState("-");

    useEffect(() => {
      setTimezoneLabel(Intl.DateTimeFormat().resolvedOptions().timeZone);
    }, []);

    const languageLabel = getLocale() === "id" ? "Bahasa Indonesia" : "English";

    const stats = [
      { label: "Member since", value: "Jan 2022" },
      { label: "Last sign-in", value: "Today, 9:12 AM" },
      { label: "Language", value: languageLabel },
      { label: "Timezone", value: timezoneLabel },
    ];

    if (isProfileLoading) {
      return (
        <PageBase
          subtitle="Review the information tied to your console account."
          title="Your personal details"
        >
          <div className="overflow-hidden rounded-xl border">
            <div className="relative h-48 bg-muted/60 sm:h-64">
              <Skeleton className="absolute inset-0 size-full rounded-none" />
            </div>

            <div className="space-y-4 px-4 pb-5 sm:px-6">
              <div className="-mt-10 flex flex-col items-center gap-3">
                <Skeleton className="size-20 rounded-full border-4 border-background sm:size-24" />
                <div className="space-y-2 text-center">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="mx-auto h-4 w-52" />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                {stats.map((item) => (
                  <div className="min-w-36 space-y-2" key={item.label}>
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </PageBase>
      );
    }

    return (
      <PageBase
        subtitle="Review the information tied to your console account."
        title="Your personal details"
      >
        <div className="overflow-hidden rounded-xl border">
          <div className="relative h-48 bg-muted/60 sm:h-64">
            <div className="absolute top-3 right-3 z-10 sm:top-4 sm:right-4">
              <Button
                aria-label="Edit profile"
                asChild
                className="group"
                size="xs"
                variant="secondary"
              >
                <Link to="/console/me/settings" viewTransition>
                  <Edit />
                  <span className="hidden group-hover:inline group-focus-visible:inline">
                    Edit profile
                  </span>
                </Link>
              </Button>
            </div>
            <img
              alt="Profile cover"
              className="pointer-events-none absolute inset-0 size-full object-cover"
              height="256"
              src="/profile-cover.jpg"
              width="1600"
            />
          </div>

          <div className="space-y-4 px-4 pb-5 sm:px-6">
            <div className="-mt-10 flex flex-col items-center gap-3">
              <Avatar className="size-20 border-4 border-background sm:size-24">
                <AvatarImage alt={name} src="/client-1.jpg" />
                <AvatarFallback className="text-lg">{initials}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <p className="font-semibold text-lg">{name}</p>
                <p className="text-muted-foreground text-sm">{email}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              {stats.map((item) => (
                <div className="min-w-36" key={item.label}>
                  <p className="text-muted-foreground text-xs uppercase tracking-wide">
                    {item.label}
                  </p>
                  <p className="font-medium text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageBase>
    );
  },
});
