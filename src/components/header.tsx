import React from "react";
import Link from "next/link";
import { Camera } from "lucide-react";

import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <div className="container mx-auto px-4">
        <div className="my-4 flex items-center justify-between rounded-full bg-white/10 px-6 py-3 backdrop-blur-md">
          <Link href="/" className="flex items-center space-x-2">
            <div className="rounded-full bg-white/20 p-2">
              <Camera className="h-6 w-6 text-blue-300" />
            </div>
            <span className="text-xl font-bold text-white">Photo Store</span>
          </Link>
          <nav>
            <ul className="hidden space-x-6 text-gray-300 md:flex">
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-white"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="transition-colors hover:text-white"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <Link href="/photos">
            <Button
              size="lg"
              className="transform bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50 transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl hover:shadow-purple-600/50"
            >
              Get started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
