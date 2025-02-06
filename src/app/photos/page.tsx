import { Suspense } from "react";
import PhotoGrid from "@/components/PhotoGrid";
import { getPhotos } from "@/actions/photoActions";
import AddPhotoButton from "@/components/AddPhotoButton";

export default async function Photos() {
  const photos = await getPhotos();

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between">
        <h1 className="mb-4 text-2xl font-bold text-white">Your Photos</h1>
        <AddPhotoButton />
      </div>
      <Suspense fallback={<div>Loading photos...</div>}>
        <PhotoGrid photos={photos} />
      </Suspense>
    </div>
  );
}
