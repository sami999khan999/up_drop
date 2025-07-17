import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  clerkId: text("clerk_id").notNull(),
  name: text("name"),
  email: text("email").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAp: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
