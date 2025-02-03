"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImageNavigationButtons } from "@/components/ImageNavigationButtons";

import { deletePhoto } from "@/actions/photoActions";
import type { IPhoto } from "@/server/db/schema";

export default function ImageModal({
  photo,
  isOpen,
}: {
  photo: IPhoto;
  isOpen: boolean;
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  const handleFavorite = () => setIsFavorite(!isFavorite);
  const handleZoom = () => {
    /* TODO: Implement zoom functionality */
  };
  const handleDetails = () => {
    /* TODO: Implement details functionality */
  };
  const onClose = () => router.back();

  const handleDelete = async () => {
    await deletePhoto(photo.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogHeader hidden>
        <DialogTitle hidden></DialogTitle>
      </DialogHeader>
      <DialogContent className="m-0 h-screen max-h-[100vh] w-screen max-w-[100vw] p-0">
        <ImageNavigationButtons
          isFavorite={isFavorite}
          onClose={onClose}
          onFavorite={handleFavorite}
          onZoom={handleZoom}
          onDetails={handleDetails}
          onDeleteTrigger={handleDelete}
        />
        <div className="flex h-full flex-col bg-black">
          <div className="relative flex flex-grow items-center justify-center">
            <Image
              src={photo.url ?? "/placeholder.svg"}
              alt={`Photo ${photo.id}`}
              layout="fill"
              objectFit="contain"
              className="select-none"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
