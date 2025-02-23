import { relations } from "drizzle-orm";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

import users from "./users";

const guestbookEntries = pgTable("guestbook_entries", {
  /** The unique identifier for the guestbook entry. Generated automatically. */
  id: uuid("id").primaryKey().defaultRandom(),

  /** The id of the user who left the message. */
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  /** The message of the guestbook entry. */
  message: text("message").notNull(),

  /** The created at timestamp for the guestbook entry. */
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export const guestbookEntriesRelations = relations(
  guestbookEntries,
  ({ one }) => ({
    user: one(users, {
      fields: [guestbookEntries.userId],
      references: [users.id],
    }),
  }),
);

export const InsertGuestbookEntrySchema = createInsertSchema(
  guestbookEntries,
).omit({
  userId: true,
  createdAt: true,
});

export default guestbookEntries;
