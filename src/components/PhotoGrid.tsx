"use client";

import type { StaticImageData } from "next/image";
import { useState } from "react";
import container from "@/assets/images/container.png";
import flyer from "@/assets/images/flyer-portrait.jpg";
import Image from "next/image";
import { usePhotoUpload } from "@/context/PhotosContext";

export default function PhotoGrid() {
  const [photos, setPhotos] = useState<StaticImageData[]>([
    container,
    flyer,
    container,
  ]);

  const { images } = usePhotoUpload();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {images.map((photo, index) => (
        <div
          key={index}
          className="relative aspect-square overflow-hidden rounded-lg shadow-md"
        >
          <Image
            src={photo ?? ""}
            alt={`Photo ${index + 1}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
      ))}
    </div>
  );
}
