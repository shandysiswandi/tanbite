import { createFileRoute, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Download, Users } from "lucide-react";
import { useState } from "react";
import { FileDropzone } from "@/components/file-dropzone";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { PageBase } from "@/features/console/components/page-base";
import { requirePermission } from "@/features/console/libraries/permission";
import { ACTIONS, PERMISSIONS } from "@/libraries/constants/permission";
import { seo } from "@/libraries/utils/seo";

export const Route = createFileRoute("/console/managements/users/import")({
  head: () => ({
    meta: seo({
      path: "/console/managements/users/import",
      title: "Import users",
      description: "Upload a CSV file to bulk create users and invite members.",
    }),
  }),
  loader: async ({ context, location }) => {
    await requirePermission({
      queryClient: context.queryClient,
      permission: PERMISSIONS.management.users,
      action: ACTIONS.import,
      locationHref: location.href,
    });
  },
  component: () => {
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    return (
      <PageBase
        subtitle="Upload a CSV file to bulk create users and invite members."
        title="Import users"
      >
        <Card>
          <CardHeader className="flex items-center justify-start">
            <Button type="button" variant="outline">
              <Download />
              Download template
            </Button>
          </CardHeader>
          <CardContent>
            <FileDropzone
              accept={{ "text/csv": [".csv"] }}
              description="Drag and drop your CSV here, or browse from your device."
              onFilesSelected={(acceptedFiles) => {
                const [firstAcceptedFile] = acceptedFiles;
                setSelectedFile(firstAcceptedFile ?? null);
              }}
              subTitle="Only 1 file allowed, max size 1 MB."
              title="Upload CSV"
            />
          </CardContent>
          <CardFooter className="w-full justify-between border-t">
            <Button
              onClick={() => router.history.back()}
              type="button"
              variant="outline"
            >
              <ArrowLeft />
              Back
            </Button>

            <Button disabled={!selectedFile} type="button">
              <Users />
              Start import
            </Button>
          </CardFooter>
        </Card>
      </PageBase>
    );
  },
});
