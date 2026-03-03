import { createFileRoute } from "@tanstack/react-router";
import { Save } from "lucide-react";
import { useState } from "react";
import { FileDropzone } from "@/components/file-dropzone";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { PageBase } from "@/features/console/components/page-base";
import { useProfile } from "@/features/console/hooks/use-profile";
import { seo } from "@/libraries/utils/seo";

export const Route = createFileRoute("/console/me/settings/")({
  head: () => ({
    meta: seo({
      path: "/console/me/settings/",
      title: "Account settings",
      description:
        "Manage your personal profile information used across your account.",
    }),
  }),
  component: () => {
    const { profile, isProfileLoading } = useProfile();
    const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);

    return (
      <PageBase
        subtitle="Manage your personal profile information used across your account."
        title="Account settings"
      >
        <Card>
          <CardHeader>
            <CardTitle>Personal details</CardTitle>
            <CardDescription>
              Update your core account information shown in your profile.
            </CardDescription>
          </CardHeader>

          {isProfileLoading ? (
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-4 rounded-lg border bg-muted/20 p-4">
                <Skeleton className="size-16 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-40" />
                </div>
                <Skeleton className="ml-auto h-8 w-28" />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Skeleton className="h-16 md:col-span-2" />
                <Skeleton className="h-16 md:col-span-2" />
              </div>
            </CardContent>
          ) : (
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-4 rounded-lg border bg-muted/20 p-4">
                <Avatar className="size-16 border" size="lg">
                  <AvatarImage alt="Profile" src={profile?.avatar} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 space-y-1">
                  <p className="font-medium text-sm">Profile photo</p>
                  <p className="text-muted-foreground text-xs">
                    JPG or PNG, up to 2MB.
                  </p>
                </div>

                <div className="w-full md:ml-auto md:max-w-sm">
                  <FileDropzone
                    accept={{
                      "image/jpeg": [".jpg", ".jpeg"],
                      "image/png": [".png"],
                    }}
                    description="Drag and drop your profile photo, or browse from your device."
                    maxFiles={1}
                    onFilesSelected={(acceptedFiles) => {
                      const [firstAcceptedFile] = acceptedFiles;
                      setSelectedPhoto(firstAcceptedFile ?? null);
                    }}
                    subTitle="Only 1 file allowed. JPG or PNG, up to 2MB."
                    title="Upload photo"
                  />
                  {selectedPhoto && (
                    <p className="mt-2 text-muted-foreground text-xs">
                      Selected: {selectedPhoto.name}
                    </p>
                  )}
                </div>
              </div>

              <form
                className="grid gap-5 md:grid-cols-2"
                key={profile?.id ?? "profile-form"}
              >
                <Field className="space-y-2 md:col-span-2">
                  <FieldLabel htmlFor="full-name">Full name</FieldLabel>
                  <Input defaultValue={profile?.name} id="full-name" />
                </Field>

                <Field className="space-y-2 md:col-span-2">
                  <FieldLabel htmlFor="email-address">Email address</FieldLabel>
                  <Input
                    defaultValue={profile?.email}
                    id="email-address"
                    readOnly
                    type="email"
                  />
                </Field>
              </form>
            </CardContent>
          )}

          <CardFooter className="justify-end gap-2">
            {isProfileLoading ? (
              <div className="flex items-center gap-2">
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-9 w-32" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="button">
                  <Save />
                  Save changes
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      </PageBase>
    );
  },
});
