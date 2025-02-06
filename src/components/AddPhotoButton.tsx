"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import UploadDropzone from "@/components/UploadDropzone";
// import { uploadPhotos } from "@/actions/photoActions";

export default function AddPhotoButton() {
  const [isOpen, setIsOpen] = useState(false);

  // const handlePhotoUpload = async () => {
  //   try {
  //     await uploadPhotos();
  //     setIsOpen(false);
  //   } catch (error) {
  //     console.log("Error uploading photo", error);
  //   }
  // };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4">
          Upload Photo <Upload />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-neutral-900 text-white sm:max-w-[425px]">
        <UploadDropzone onUpload={() => setIsOpen(false)} />
        <DialogHeader hidden>
          <DialogTitle hidden>Photo</DialogTitle>
        </DialogHeader>
        {/*<PhotoUpload onUploadComplete={handlePhotoUpload} /> */}
      </DialogContent>
    </Dialog>
  );
}
