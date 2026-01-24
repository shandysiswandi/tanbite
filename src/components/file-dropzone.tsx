import { CloudUpload } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { type Accept, useDropzone } from "react-dropzone";
import { cn } from "@/libraries/utils/tailwind";

interface FileDropzoneProps {
  accept?: Accept;
  className?: string;
  description?: string;
  disabled?: boolean;
  maxFiles?: number;
  onFilesSelected?: (files: File[]) => void;
  subTitle?: string;
  title?: string;
}

export function FileDropzone({
  accept,
  className,
  description = "Drag and drop your file here, or pick from your device.",
  disabled = false,
  maxFiles = 1,
  onFilesSelected,
  subTitle = "Click anywhere to choose file",
  title = "Upload file",
}: FileDropzoneProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setSelectedFiles(acceptedFiles);
      onFilesSelected?.(acceptedFiles);
    },
    [onFilesSelected]
  );

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept,
    disabled,
    maxFiles,
    multiple: maxFiles > 1,
    onDrop,
  });

  const activeDescription = useMemo(() => {
    if (selectedFiles.length === 0) {
      return description;
    }

    return selectedFiles
      .map(
        (selectedFile) =>
          `${selectedFile.name} (${Math.max(1, Math.round(selectedFile.size / 1024))} KB)`
      )
      .join(", ");
  }, [description, selectedFiles]);

  return (
    <div
      {...getRootProps()}
      className={cn(
        "rounded-xl border border-dashed bg-muted/40 p-6",
        "transition-colors duration-150",
        isDragActive && "border-primary bg-primary/5",
        disabled && "pointer-events-none opacity-60",
        className
      )}
    >
      <input {...getInputProps()} />

      <div className="flex flex-col items-center justify-center gap-3 text-center">
        <div className="flex size-10 items-center justify-center rounded-full bg-background shadow-sm">
          <CloudUpload className="size-5 text-muted-foreground" />
        </div>

        <div className="space-y-1">
          <p className="font-medium text-sm">
            {isDragActive ? "Drop file here" : title}
          </p>
          <p className="text-muted-foreground text-sm">{activeDescription}</p>
          {selectedFiles.length === 0 && (
            <p className="text-muted-foreground text-xs">{subTitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}
