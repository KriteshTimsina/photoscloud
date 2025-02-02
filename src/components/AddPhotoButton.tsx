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
import PhotoUpload from "./PhotoUpload";
import { Plus, Upload } from "lucide-react";

export default function AddPhotoButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4">
          Upload Photo <Upload />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-neutral-900 text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Photo</DialogTitle>
        </DialogHeader>
        <PhotoUpload onUploadComplete={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
