import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

/**
 * This module defines the schema for the `users` table in the database.
 */
const users = pgTable("user", {
  /** The unique identifier for the user. Generated automatically. */
  id: uuid("id").primaryKey().defaultRandom(),

  /** The name of the user. Max length is 255 characters. */
  name: varchar("name", { length: 255 }),

  /** The email address of the user. Must be unique. */
  email: varchar("email", { length: 320 }).notNull().unique(),

  /** Timestamp when the email was verified. */
  emailVerified: timestamp("emailVerified", { mode: "date" }),

  /** The user's image URL. Max length is 2048 characters. */
  image: varchar("image", { length: 2048 }).notNull(),
});

export default users;
