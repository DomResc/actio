import Database from "better-sqlite3";
import "dotenv/config";
import { drizzle } from "drizzle-orm/better-sqlite3";

import * as schema from "./schema";

const database = new Database(process.env.DATABASE_URL);

export const db = drizzle(database, { schema });
