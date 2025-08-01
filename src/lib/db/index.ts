import Database from "better-sqlite3";
import "dotenv/config";
import { drizzle } from "drizzle-orm/better-sqlite3";

import * as schema from "./schema";

const sqlite = new Database(process.env.DATABASE_URL!);

const db = drizzle({ client: sqlite, schema });

export { db, schema };
