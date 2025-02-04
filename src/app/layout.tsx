import type React from "react";
import "@/styles/globals.css";
import Header from "@/components/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Header />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
