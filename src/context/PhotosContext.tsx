import React, { createContext, useContext, useState } from "react";

type PhotosContextProps = {
  images: string[];
  onUpload: (files: File[]) => void;
};

export const PhotosContext = createContext<PhotosContextProps | null>(null);

const PhotosProvider = ({ children }: { children: React.ReactElement }) => {
  const [images, setImages] = useState<string[]>([]);

  const onUpload = (files: File[]) => {
    if (files) {
      files.map((file) => {
        const imageUrl = URL.createObjectURL(file);
        setImages((prev) => [...prev, imageUrl]);
      });
    }
  };

  return (
    <PhotosContext.Provider value={{ images, onUpload }}>
      {children}
    </PhotosContext.Provider>
  );
};

export default PhotosProvider;

export const usePhotoUpload = () => {
  const context = useContext(PhotosContext);

  if (context === null) {
    throw new Error("Cannot find photo context");
  }

  return context;
};
