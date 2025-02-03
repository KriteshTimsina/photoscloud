"use client";

import { useState } from "react";
import Image from "next/image";
import type { IPhotos } from "@/server/db/schema";
import ImageModal from "@/components/ImageModal";
import UploadDropzone from "@/components/UploadDropzone";

export default function PhotoGrid({ photos }: { photos: IPhotos[] }) {
  const [selectedPhoto, setSelectedPhoto] = useState<IPhotos | null>(null);

  const handlePhotoClick = (photo: IPhotos) => {
    setSelectedPhoto(photo);
  };

  const handleCloseModal = () => {
    setSelectedPhoto(null);
  };

  if (photos.length === 0) {
    return (
      <UploadDropzone
        onUpload={() => {
          console.log("UPloaded");
        }}
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {photos
          ? photos.map((photo) => (
              <div
                key={photo.id}
                className="relative aspect-square cursor-pointer overflow-hidden rounded-lg shadow-md"
                onClick={() => handlePhotoClick(photo)}
              >
                <Image
                  src={photo.url ?? ""}
                  alt={`Photo ${photo.id}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))
          : null}
      </div>
      {selectedPhoto && (
        <ImageModal
          photo={{ id: selectedPhoto.id, url: selectedPhoto.url! }}
          isOpen={!!selectedPhoto}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
