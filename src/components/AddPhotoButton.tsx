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
import { UploadDropzone } from "@/components/uploadthing";
import { useRouter } from "next/navigation";

export default function AddPhotoButton() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const onUploadComplete = () => {
    setIsOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4">
          Upload <Upload />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-neutral-900 text-white sm:max-w-[425px]">
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={onUploadComplete}
        />
        <DialogHeader hidden>
          <DialogTitle hidden> Photo</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
