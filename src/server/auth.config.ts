import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { env } from "@/env";

export default {
  providers: [
    Google({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    }),
  ],
} satisfies NextAuthConfig;
