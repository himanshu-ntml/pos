import { text, pgTable, serial } from "drizzle-orm/pg-core";

export const allergens = pgTable("allergens", {
  id: serial("id").primaryKey(),
  name: text("name"),
});

export type Allergens = typeof allergens.$inferSelect;
export type NewAllergens = typeof allergens.$inferInsert;
