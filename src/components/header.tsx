import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth, signIn } from "@/server/auth";
import Image from "next/image";
import { NavUser } from "@/components/nav-user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { images } from "@/assets/images";

const Header = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <div className="container mx-auto px-4">
        <div className="my-4 flex items-center justify-between rounded-full bg-white/10 px-6 py-3 backdrop-blur-md">
          <Link href="/" className="flex items-center space-x-2">
            <Image height={40} src={images.logo} alt="Photos Cloud" />
            <span className="text-base font-bold text-white md:text-xl">
              Photos Cloud
            </span>
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
                  target="_blank"
                  href="https://kriteshtimsina.com.np"
                  className="transition-colors hover:text-white"
                >
                  Developer
                </Link>
              </li>
            </ul>
          </nav>
          {user && <NavUser user={user} />}
          {!user && (
            <form
              action={async () => {
                "use server";
                await signIn("google", { redirectTo: DEFAULT_LOGIN_REDIRECT });
              }}
            >
              <Button
                type="submit"
                size="lg"
                className="transform bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50 transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl hover:shadow-purple-600/50"
              >
                Get started
              </Button>
            </form>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
