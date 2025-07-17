import { defineConfig } from "drizzle-kit";
import { CustomError } from "./src/utils/customError";

if (!process.env.DATABASE_URL) {
  throw new CustomError({
    message: "DATABASE_URL is not defined",
    statusCode: 700,
  });
}

export default defineConfig({
  schema: "./src/drizzle/schema/**/*.ts",
  out: "./src/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
