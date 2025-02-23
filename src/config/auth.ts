import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import db from "@/db";
import { env } from "@/env/server";

/** The configuration options for the NextAuth module. */
const options: NextAuthOptions = {
  pages: {
    signIn: "/",
  },
  adapter: DrizzleAdapter(db),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

export default options;
