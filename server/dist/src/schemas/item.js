"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newItemSchema = exports.newItemSchemaRaw = exports.itemsSchema = exports.categoryRelations = exports.itemRelations = exports.items = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const category_1 = require("./category");
const order_1 = require("./order");
const drizzle_zod_1 = require("drizzle-zod");
const zod_1 = require("zod");
exports.items = (0, pg_core_1.pgTable)("items", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    description: (0, pg_core_1.text)("description"),
    price: (0, pg_core_1.decimal)("price").notNull(),
    imageUrl: (0, pg_core_1.varchar)("image_url", { length: 255 }),
    isVegetarian: (0, pg_core_1.boolean)("vegetarian"),
    isVegan: (0, pg_core_1.boolean)("vegan"),
    isGlutenFree: (0, pg_core_1.boolean)("gluten_free"),
    isSpicy: (0, pg_core_1.boolean)("spicy"),
    preparationTime: (0, pg_core_1.numeric)("preparation_time").notNull(),
    categoryId: (0, pg_core_1.integer)("category_id").references(() => category_1.categories.id),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    isAvailable: (0, pg_core_1.boolean)("available").default(true),
});
exports.itemRelations = (0, drizzle_orm_1.relations)(exports.items, ({ one, many }) => ({
    category: one(category_1.categories),
    orderItems: many(order_1.orderItems),
}));
exports.categoryRelations = (0, drizzle_orm_1.relations)(category_1.categories, ({ one }) => ({
    item: one(exports.items, {
        fields: [category_1.categories.id],
        references: [exports.items.categoryId],
    }),
}));
exports.itemsSchema = (0, drizzle_zod_1.createSelectSchema)(exports.items);
exports.newItemSchemaRaw = (0, drizzle_zod_1.createInsertSchema)(exports.items);
exports.newItemSchema = exports.newItemSchemaRaw.extend({
    preparationTime: zod_1.z.string().min(1, { message: "Required" }),
    name: zod_1.z.string().min(1, { message: "Required" }),
    categoryId: zod_1.z.number({ invalid_type_error: "Required" }).min(0),
    price: zod_1.z.coerce.string().min(1, { message: "Required" }),
});
