import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import "dotenv/config";
import { CustomError } from "../errors/customError";

if (!process.env.DATABASE_URL) {
  throw new CustomError({
    message: "DATABASE_URL is not defined",
    statusCode: 700,
  });
}

const pool = neon(process.env.DATABASE_URL!);
export const db = drizzle(pool, { logger: true, schema: schema });
