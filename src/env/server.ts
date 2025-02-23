/**
 * @fileOverview Environment configuration for the server.
 * This file initializes the environment variables using createEnv from @t3-oss/env-nextjs.
 */
import { StandardSchemaV1 } from "@t3-oss/env-core";
import { createEnv } from "@t3-oss/env-nextjs";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";

expand(config());

/**
 * Environment configuration exported for server use.
 * @constant {Object} env
 */
export const env = createEnv({
  server: {
    /** PostgreSQL database connection URL. */
    DATABASE_URL: z.string().url(),
    /** Database host address. */
    DB_HOST: z.string(),
    /** Database migration status. */
    DB_MIGRATING: z
      .string()
      .refine((s) => s === "true" || s === "false")
      .transform((s) => s === "true")
      .optional(),
    /** Database name. */
    DB_NAME: z.string(),
    /** Database user password. */
    DB_PASSWORD: z.string(),
    /** Database port number. */
    DB_PORT: z.coerce.number(),
    /** Database user name. */
    DB_USERNAME: z.string(),
    /** Google OAuth client ID. */
    GOOGLE_CLIENT_ID: z.string(),
    /** Google OAuth client secret. */
    GOOGLE_CLIENT_SECRET: z.string(),
    /** NextAuth.js secret key for session encryption. */
    NEXTAUTH_SECRET: z.string(),
    /** NextAuth.js base URL. */
    NEXTAUTH_URL: z.string().url(),
    /** Node environment (development or production). */
    NODE_ENV: z.enum(["development", "production"]),
  },
  /**
   * Callback invoked when environment variable validation fails.
   * @param {readonly StandardSchemaV1.Issue[]} issues - Array of validation issues.
   */
  onValidationError: (issues: readonly StandardSchemaV1.Issue[]) => {
    console.error("❌ Environment variable validation failed!\n", issues);
    console.error(
      "💡 Hint: Make sure to check your environment variables in the .env file.",
    );

    process.exit(1);
  },
  emptyStringAsUndefined: true,
  // This should be the only place where you access process.env.
  // eslint-disable-next-line n/no-process-env
  experimental__runtimeEnv: process.env,
});
