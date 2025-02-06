"use client";

import {
  generateUploadDropzone,
  type UploadDropzoneProps,
} from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const Dropzone = generateUploadDropzone<OurFileRouter>();

export const UploadDropzone = (
  props: UploadDropzoneProps<OurFileRouter, "imageUploader">,
) => {
  return (
    <Dropzone
      config={{
        appendOnPaste: true,
        mode: "auto",
      }}
      appearance={{
        button: { backgroundColor: "black" },
        label: { color: "white" },
        allowedContent: { color: "#CAD5E2" },
      }}
      {...props}
    />
  );
};
