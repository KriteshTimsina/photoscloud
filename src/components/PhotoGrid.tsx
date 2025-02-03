"use client";

import Image from "next/image";
import type { IPhoto } from "@/server/db/schema";
import UploadDropzone from "@/components/UploadDropzone";
import Link from "next/link";

export default function PhotoGrid({ photos }: { photos: IPhoto[] }) {
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
              <Link
                href={`/photos/${photo.id}`}
                key={photo.id}
                className="relative aspect-square cursor-pointer overflow-hidden rounded-lg shadow-md"
              >
                <Image
                  src={photo.url ?? ""}
                  alt={`Photo ${photo.id}`}
                  layout="fill"
                  objectFit="cover"
                />
              </Link>
            ))
          : null}
      </div>
    </>
  );
}
