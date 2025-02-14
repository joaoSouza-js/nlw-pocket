import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "../env";
import * as schema from "./schema";

export const pgClient = postgres(env.DATABASE_URL);

export const db = drizzle(pgClient, {
	schema: schema,
	logger: true,
});
