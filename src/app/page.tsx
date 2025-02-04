import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  const photos = [
    "https://images.unsplash.com/photo-1738316849598-8cbe1e5ca3f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1738316849598-8cbe1e5ca3f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1738316849598-8cbe1e5ca3f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1738316849598-8cbe1e5ca3f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1738316849598-8cbe1e5ca3f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
  ];

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-black to-gray-900">
      <div className="absolute inset-0 z-0">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="animate-float absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${index * 0.5}s`,
            }}
          >
            <Image
              src={photo || "/placeholder.svg"}
              alt={`Floating photo ${index + 1}`}
              width={200}
              height={150}
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
            className="transform rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6 text-lg text-white shadow-lg shadow-blue-500/50 transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl hover:shadow-purple-600/50"
          >
            Get Started
          </Button>
        </Link>
      </div>
    </main>
  );
}
