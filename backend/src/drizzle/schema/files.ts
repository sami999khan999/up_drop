import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { usersTable } from "./users";

// Define the files table structure
const files = {
  id: uuid("id").defaultRandom().notNull().primaryKey(), // Unique file/folder ID

  name: text("name").notNull(), // File or folder name
  path: text("path").notNull(), // Full path in virtual storage
  size: integer("size").notNull(), // File size in bytes
  type: text("type").notNull(), // MIME type (e.g., image/png)

  userId: uuid("user_id") // Owner (FK to users table)
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  parentId: uuid("parent_id"), // Parent folder ID (self-FK)

  fileUrl: text("file_url").notNull(), // Direct file access URL
  thumbnailUrl: text("thumbnail_url"), // Optional preview URL

  isFolder: boolean("is_folder").default(false).notNull(), // True if folder
  isStared: boolean("is_stared").default(false).notNull(), // Marked as favorite
  isTrashed: boolean("is_trashed").default(false).notNull(), // Moved to trash

  createdAt: timestamp("created_at").defaultNow().notNull(), // Creation time
  updatedAt: timestamp("updated_at").defaultNow().notNull(), // Last updated
};

// Define parent-child folder relationship
files.parentId.references(() => filesTable.id, { onDelete: "no action" });
export const filesTable = pgTable("files", files);

export const FilesType = typeof filesTable.$inferSelect; // used while retrieving data
export const NewFileType = typeof filesTable.$inferInsert; // used while inserting data
