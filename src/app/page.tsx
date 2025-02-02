import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-8 text-4xl font-extrabold uppercase leading-tight text-white md:text-7xl">
        <span className="block">
          Store{" "}
          <span className="bg-gradient-to-b from-pink-400 to-rose-200 bg-clip-text text-transparent">
            photos{" "}
          </span>
          with <br />{" "}
          <span className="bg-gradient-to-b from-orange-400 to-yellow-200 bg-clip-text text-transparent">
            ease
          </span>
        </span>
        <span className="mt-2 block">
          Never lose them <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            again
          </span>
        </span>
      </h1>
      <Link href="/dashboard">
        <Button
          size="lg"
          className="transform rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6 text-lg text-white shadow-lg shadow-blue-500/50 transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl hover:shadow-purple-600/50"
        >
          Get Started
        </Button>
      </Link>
    </div>
  );
}
