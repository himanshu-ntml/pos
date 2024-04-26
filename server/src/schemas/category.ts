// import { relations } from "drizzle-orm";
import { timestamp, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const categories = pgTable("category", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const categoriesSchema = createSelectSchema(categories);
export const newCategoriesSchema = createInsertSchema(categories);
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
