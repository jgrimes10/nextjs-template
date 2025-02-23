import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import users from "./users";

const sessions = pgTable("session", {
  /** The session token. Also used as the primary key. */
  sessionToken: text("sessionToken").primaryKey(),

  /** The user ID. */
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  /** The expiration timestamp for the session. */
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export default sessions;
