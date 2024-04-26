// import { relations } from "drizzle-orm";
import { text, pgTable, serial } from "drizzle-orm/pg-core";
// import { users } from "./user";

export const files = pgTable("files", {
  id: serial("id").primaryKey(),
  name: text("name"),
  url: text("url"),
  uploadedBy: text("uploaded_by"),
});

// export const usersRelations = relations(users, ({ one }) => ({
//   uploadedBy: one(files),
// }));

// export const filesRelations = relations(files, ({ one }) => ({
//   uploader: one(users, {
//     fields: [files.uploadedBy],
//     references: [users.id],
//   }),
// }));

export type FileType = typeof files.$inferSelect;
export type NewFile = typeof files.$inferInsert;
