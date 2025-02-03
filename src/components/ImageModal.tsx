"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Heart, ZoomIn, Info, Trash2, ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deletePhoto } from "@/actions/photoActions";

interface ImageModalProps {
  photo: { id: number; url: string };
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageModal({
  photo,
  isOpen,
  onClose,
}: ImageModalProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Implement favorite functionality
  };

  const handleZoom = () => {
    // TODO: Implement zoom functionality
  };

  const handleDetails = () => {
    // TODO: Implement details functionality
  };

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
        <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between bg-opacity-50 p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFavorite}
              className="text-white"
            >
              <Heart
                className={`h-6 w-6 ${isFavorite ? "fill-red-500" : ""}`}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleZoom}
              className="text-white"
            >
              <ZoomIn className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDetails}
              className="text-white"
            >
              <Info className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleDelete}
              className="text-white"
            >
              <Trash2 className="h-6 w-6" />
            </Button>
          </div>
        </div>
        <div className="flex h-full flex-col bg-black">
          <div className="relative flex flex-grow items-center justify-center">
            <Image
              src={photo.url || "/placeholder.svg"}
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
