import { DefaultSession } from "next-auth";

declare module "next-auth" {
  // Override session to include the user id.
  interface Session {
    user: {
      id: string;
      // But also include the default fields from the session.
    } & DefaultSession["user"];
  }
}
