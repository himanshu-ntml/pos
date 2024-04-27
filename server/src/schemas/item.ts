import { relations } from "drizzle-orm";
import {
  timestamp,
  pgTable,
  serial,
  varchar,
  integer,
  boolean,
  text,
  numeric,
  decimal,
} from "drizzle-orm/pg-core";
import { categories } from "./category";
import { orderItems } from "./order";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  price: decimal("price").notNull(),
  imageUrl: varchar("image_url", { length: 255 }),
  isVegetarian: boolean("vegetarian"),
  isVegan: boolean("vegan"),
  isGlutenFree: boolean("gluten_free"),
  isSpicy: boolean("spicy"),
  preparationTime: numeric("preparation_time").notNull(),
  categoryId: integer("category_id").references(() => categories.id),
  createdAt: timestamp("created_at").defaultNow(),
  isAvailable: boolean("available").default(true),
});

export const itemRelations = relations(items, ({ one, many }) => ({
  category: one(categories),
  orderItems: many(orderItems),
}));

export const categoryRelations = relations(categories, ({ one }) => ({
  item: one(items, {
    fields: [categories.id],
    references: [items.categoryId],
  }),
}));

export const itemsSchema = createSelectSchema(items);
export const newItemSchemaRaw = createInsertSchema(items);

export const newItemSchema = newItemSchemaRaw.extend({
  preparationTime: z.string().min(1, { message: "Required" }),
  name: z.string().min(1, { message: "Required" }),
  categoryId: z.number({ invalid_type_error: "Required" }).min(0),
  price: z.coerce.string().min(1, { message: "Required" }),
});
export type NewItemSchemaType = z.infer<typeof newItemSchema>;
export type Item = typeof items.$inferSelect;
export type NewItem = typeof items.$inferInsert;