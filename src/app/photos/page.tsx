import { Suspense } from "react";
import PhotoGrid from "@/components/PhotoGrid";
import AddPhotoButton from "@/components/AddPhotoButton";

export default function Photos() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold text-white">Your Photos</h1>
      <AddPhotoButton />
      <Suspense fallback={<div>Loading photos...</div>}>
        <PhotoGrid />
      </Suspense>
    </div>
  );
}
