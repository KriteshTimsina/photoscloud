import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import GithubButton from "@/components/GithubButton";
import { floatingImages } from "@/assets/images";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-black to-gray-900">
      <div className="absolute inset-0 z-0">
        {floatingImages.map((photo, index) => (
          <div
            key={index}
            className="absolute animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${index * 0.5}s`,
            }}
          >
            <Image
              src={photo || "/placeholder.svg"}
              alt={`Floating photo ${index + 1}`}
              width={250}
              height={170}
              className="rounded-lg opacity-30 shadow-lg transition-opacity duration-300 hover:opacity-80"
            />
          </div>
        ))}
      </div>
      <div className="relative z-10 px-4 text-center">
        <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-8xl">
          Secure Your Memories, <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Anytime, Anywhere
          </span>
        </h1>
        <Link href="/photos">
          <Button
            size="lg"
            className="transform bg-gradient-to-br from-blue-500 to-purple-600 text-lg text-white shadow-lg shadow-blue-500/50 transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl hover:shadow-purple-600/50"
          >
            Get started
          </Button>
        </Link>
      </div>

      <GithubButton repo="kriteshtimsina/photoscloud" />
    </main>
  );
}
