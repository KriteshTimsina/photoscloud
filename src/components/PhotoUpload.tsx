"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { usePhotoUpload } from "@/context/PhotosContext";

interface PhotoUploadProps {
  onUploadComplete: () => void;
}

export default function PhotoUpload({ onUploadComplete }: PhotoUploadProps) {
  const [uploading, setUploading] = useState(false);
  const { onUpload } = usePhotoUpload();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      console.log(acceptedFiles, "ACCEPTED");
      // Handle file upload here
      setUploading(true);
      // Simulating upload process
      setTimeout(() => {
        setUploading(false);
        onUpload(acceptedFiles);
        onUploadComplete();
      }, 2000);
    },
    [onUploadComplete],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center ${
        isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} />
      {uploading ? (
        <p>Uploading...</p>
      ) : isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <div>
          <p className="mb-4">
            {"Drag 'n' drop some files here, or click to select files"}
          </p>
          <Button className="bg-black shadow-sm shadow-white" type="button">
            Select Files
          </Button>
        </div>
      )}
    </div>
  );
}
