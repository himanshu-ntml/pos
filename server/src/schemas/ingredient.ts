import { text, pgTable, serial, integer, boolean } from "drizzle-orm/pg-core";
import { nutritions } from "./nutritions";
import { relations } from "drizzle-orm";

export const ingredients = pgTable("ingredients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  stock: integer("stock").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  nutritionId: integer("nutrition_id").references(() => nutritions.id),
});

export const ingredientsRelations = relations(ingredients, ({ one }) => ({
  nutrition: one(nutritions, {
    fields: [ingredients.nutritionId],
    references: [nutritions.id],
  }),
}));

export type Ingredient = typeof ingredients.$inferSelect;
export type NewIngredient = typeof ingredients.$inferInsert;
