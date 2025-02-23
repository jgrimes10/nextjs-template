/**
 * Initializes and exports the database connection using drizzle-orm and postgres-js.
 *
 * This module imports the necessary environment variables and initializes the
 * PostgreSQL client using the provided database URL. It then creates a drizzle
 * ORM instance with the PostgreSQL client and exports it for use in other parts
 * of the application.
 *
 * @module db
 * @requires @/env/server
 * @requires drizzle-orm/postgres-js
 * @requires postgres
 *
 * @example
 * import db from "@/db";
 *
 * // Use the db instance to perform database operations
 * const result = await db.query("SELECT * FROM users");
 */
import { PostgresJsDatabase, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/env/server";

/**
 * Initializes the PostgreSQL client using the provided database URL from the environment variables.
 *
 * @constant
 * @type {postgres.Sql}
 * @default
 * @see {@link https://github.com/porsager/postgres}
 */
export const client: postgres.Sql = postgres(env.DATABASE_URL, {
  max: env.DB_MIGRATING ? 1 : undefined,
});

/**
 * Creates a drizzle ORM instance with the initialized PostgreSQL client.
 *
 * @constant
 * @type {PostgresJsDatabase}
 * @default
 * @see {@link https://github.com/drizzle-team/drizzle-orm}
 */
const db: PostgresJsDatabase = drizzle({ client: client });

export default db;
