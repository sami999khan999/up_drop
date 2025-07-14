import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import "dotenv/config";

const pool = neon(process.env.DATABASE_URL!);
export const db = drizzle(pool, { logger: true, schema: schema });
