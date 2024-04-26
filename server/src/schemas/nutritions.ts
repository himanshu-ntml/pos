import { pgTable, serial, decimal } from "drizzle-orm/pg-core";
import { ingredients } from "./ingredient";
import { relations } from "drizzle-orm";

// nutrion for 100gm
export const nutritions = pgTable("nutrition", {
  id: serial("id").primaryKey(),
  calories: decimal("calories"),
  carbohydrates: decimal("carbohydrates"),
  proteins: decimal("proteins"),
  fat: decimal("fat"),

  // totalFat: varchar('total_fat', {length: 255}),
  // saturatedFat: decimal('saturated_fat'),
  // transFat: decimal('trans_fat'),
  // cholesterol: decimal('cholesterol'),
  // sodium: decimal('sodium'),
  // iron: decimal('iron'),
  // vitamins: varchar('vitamins', {length: 255}),
  // minerals: varchar('minerals', {length: 255}),
  // dietaryFibre: varchar('dietary_fiber', {length: 255}),
  // other: varchar('other'),
  // sugars: decimal('sugars')
});

export const nutritionsRelations = relations(nutritions, ({ one }) => ({
  ignredients: one(ingredients),
}));

export type Nutrition = typeof nutritions.$inferSelect;
export type NewNutrition = typeof nutritions.$inferInsert;
