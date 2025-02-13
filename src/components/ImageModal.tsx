"use client";

import { startTransition, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImageNavigationButtons } from "@/components/ImageNavigationButtons";
import { deletePhoto, toggleFavourite } from "@/actions/photoActions";
import { type IPhoto } from "@/server/db/schema";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ImageModal({ photo }: { photo: IPhoto }) {
  const [isFavorite, setIsFavorite] = useState(photo.favourite);
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  const handleFavorite = async () => {
    setIsFavorite((prev) => !prev);

    try {
      startTransition(async () => {
        await toggleFavourite(photo.id, !isFavorite);
        router.refresh();
      });
    } catch (error) {
      console.log(error, "Failed to toggle favorite");
      setIsFavorite((prev) => !prev);
    }
  };
  const handleZoom = () => {
    /* TODO: Implement zoom functionality */
  };

  const handleClose = () => {
    setIsOpen(false);
    router.back();
  };

  const handleDelete = async () => {
    try {
      const result = await deletePhoto(photo.id);
      if (result.success) {
        router.push(result.redirectTo);
      }
    } catch (error) {
      console.error("Failed to delete photo", error);
    } finally {
      router.back();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogHeader hidden>
        <DialogTitle hidden></DialogTitle>
      </DialogHeader>
      <DialogContent className="m-0 h-screen max-h-[100vh] w-screen max-w-[100vw] p-0">
        <ImageNavigationButtons
          isFavorite={isFavorite}
          onClose={handleClose}
          onFavorite={handleFavorite}
          onZoom={handleZoom}
          onDeleteTrigger={handleDelete}
          photo={photo}
        />
        <div className="flex h-full flex-col bg-black">
          <div className="relative flex flex-grow items-center justify-center">
            <Button
              variant="unstyled"
              className="group absolute bottom-0 left-5 top-0 z-10 h-full w-1/3 items-center justify-start"
            >
              <ChevronLeft className="hidden h-24 w-24 text-white opacity-0 transition-opacity group-hover:block group-hover:opacity-100" />
            </Button>
            <Image
              src={photo.url ?? "/placeholder.svg"}
              alt={`Photo ${photo.id}`}
              layout="fill"
              objectFit="contain"
              className="select-none"
            />
            <Button
              variant="unstyled"
              className="group absolute bottom-0 right-5 top-0 h-full w-1/3 items-center justify-end"
            >
              <ChevronRight className="hidden h-24 w-24 text-white opacity-0 transition-opacity group-hover:block group-hover:opacity-100" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
