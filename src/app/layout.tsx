import type React from "react";
import "@/globals.css";
import Header from "@/components/header";
import { type Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/server/auth";

export const metadata: Metadata = {
  title: "Photos Cloud - Secure Your Memories, Anytime, Anywhere",
  description:
    "Photos Cloud is your secure and seamless cloud storage for photos and videos. Upload, organize, and access your memories from any device, anywhere.",
  keywords: [
    "Photos Cloud",
    "Photo Storage",
    "Secure Cloud Storage",
    "Photo Backup",
    "Video Storage",
    "Cloud Storage Solutions",
  ],
  openGraph: {
    title: "Photos Cloud - Secure Your Memories",
    description:
      "Store, organize, and access your precious memories on Photos Cloud with secure cloud storage, anytime, anywhere.",
    type: "website",
    url: "https://photoscloud.vercel.app",
    images: [
      {
        url: "https://photoscloud.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Photos Cloud ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photos Cloud - Secure Your Memories",
    description:
      "Photos Cloud offers a secure and convenient solution for storing and organizing your photos and videos.",
    images: ["https://photoscloud.vercel.app/og-image.png"],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <Header />
          <main className="relative z-10">{children}</main>
        </body>
      </html>
    </SessionProvider>
  );
}
