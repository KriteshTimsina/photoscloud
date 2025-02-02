"use client";

import type React from "react";
import "@/styles/globals.css";
import PhotosProvider from "@/context/PhotosContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PhotosProvider>
      <div> {children}</div>
    </PhotosProvider>
  );
}
