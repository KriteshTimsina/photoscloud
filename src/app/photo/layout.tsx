import type React from "react";

export default function PhotosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="pt-24">{children}</main>;
}
