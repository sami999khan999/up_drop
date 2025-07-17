import { relations } from "drizzle-orm";
import { filesTable } from "./files";
import { usersTable } from "./users";

export const filesRelations = relations(filesTable, ({ one, many }) => ({
  parent: one(filesTable, {
    fields: [filesTable.parentId],
    references: [filesTable.id],
  }),

  children: many(filesTable),
}));

export const userRelations = relations(usersTable, ({ many }) => ({
  files: many(filesTable),
}));
