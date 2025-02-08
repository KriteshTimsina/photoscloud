"use client";

import { useRouter } from "next/navigation";

type NotFoundProps = {
  title?: string;
  description?: string;
};

export default function Custom404({
  title = "The page you're looking for doesn't exist",
  description = "You may have mistyped the address or the page may have moved.",
}: NotFoundProps) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4 text-white">
      <div className="animate-glitch relative">
        <div className="relative mb-4 text-9xl font-bold">
          <span className="absolute left-0 top-0 -translate-y-1 translate-x-1 transform text-red-500 opacity-70">
            404
          </span>
          <span className="absolute left-0 top-0 -translate-x-1 translate-y-1 transform text-blue-500 opacity-70">
            404
          </span>
          <span>404</span>
        </div>
      </div>
      <h1 className="mb-4 text-center text-4xl font-bold">{title}</h1>
      <p className="mb-8 max-w-md text-center text-xl">{description}</p>
      <button
        onClick={() => router.back()}
        className="rounded-full bg-gradient-to-r from-blue-400 to-purple-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-opacity duration-300 hover:opacity-90"
      >
        Go Back
      </button>
    </div>
  );
}
