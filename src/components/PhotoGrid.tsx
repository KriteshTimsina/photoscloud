"use client";

import Image from "next/image";
import type { IPhoto } from "@/server/db/schema";
import { UploadDropzone } from "@/components/uploadthing";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PhotoGrid({ photos }: { photos: IPhoto[] }) {
  const router = useRouter();

  const onUploadComplete = () => router.refresh();

  if (photos.length === 0) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="h-96 w-96 rounded-full bg-slate-700/10">
          <UploadDropzone
            onClientUploadComplete={onUploadComplete}
            endpoint="imageUploader"
            className="h-96 w-96 rounded-full border-none"
            appearance={{
              button: { backgroundColor: "black" },
              label: { color: "white" },
              allowedContent: { color: "#CAD5E2" },
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {photos
          ? photos.map((photo) => (
              <Link
                prefetch
                href={`/photos/${photo.id}`}
                key={photo.id}
                className="relative aspect-square cursor-pointer overflow-hidden rounded-lg shadow-md shadow-slate-700"
              >
                <Image
                  loading="eager"
                  src={photo.url}
                  alt={photo.name}
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
