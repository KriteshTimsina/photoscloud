"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Cloud, File } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadDropzoneProps {
  onUpload: (files: File[]) => void;
}

export default function UploadDropzone({ onUpload }: UploadDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onUpload(acceptedFiles);
    },
    [onUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer rounded-lg border-2 border-dashed p-12 text-center transition-all duration-300 ease-in-out ${
        isDragActive
          ? "border-blue-500 bg-blue-500/10"
          : "border-gray-300 hover:border-gray-400 hover:bg-gray-100/10"
      } `}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center text-gray-400">
        <Cloud className="mb-4 h-16 w-16" />
        <h3 className="mb-2 text-xl font-semibold">No photos uploaded yet</h3>
        <p className="mb-4">
          Drag & drop photos here, or click to select files
        </p>
        <Button
          variant="outline"
          className="bg-white/10 transition-colors hover:bg-white/20"
        >
          <File className="mr-2 h-4 w-4" />
          Select Files
        </Button>
      </div>
    </div>
  );
}
