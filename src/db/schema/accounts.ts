import { integer, pgTable, primaryKey, text, uuid } from "drizzle-orm/pg-core";
import { AdapterAccount } from "next-auth/adapters";

import users from "./users";

const accounts = pgTable(
  "account",
  {
    /** The unique identifier for the account. Generated automatically. */
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    /** The type of the account. */
    type: text("type").$type<AdapterAccount>().notNull(),

    /** The provider of the account. */
    provider: text("provider").notNull(),

    /** The provider account ID. */
    providerAccountId: text("providerAccountId").notNull(),

    /** Refresh token for the account. */
    refresh_token: text("refresh_token"),

    /** Access token for the account. */
    access_token: text("access_token"),

    /** Access token expiration date */
    expires_at: integer("expires_at"),

    /** The token type. */
    token_type: text("token_type"),

    /** The scope of the account. */
    scope: text("scope"),

    /** The id token. */
    id_token: text("id_token"),

    /** The session state. */
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ],
);

export default accounts;
