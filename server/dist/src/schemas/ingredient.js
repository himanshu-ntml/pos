"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ingredientsRelations = exports.ingredients = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const nutritions_1 = require("./nutritions");
const drizzle_orm_1 = require("drizzle-orm");
exports.ingredients = (0, pg_core_1.pgTable)("ingredients", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    stock: (0, pg_core_1.integer)("stock").default(0).notNull(),
    isActive: (0, pg_core_1.boolean)("is_active").default(true).notNull(),
    nutritionId: (0, pg_core_1.integer)("nutrition_id").references(() => nutritions_1.nutritions.id),
});
exports.ingredientsRelations = (0, drizzle_orm_1.relations)(exports.ingredients, ({ one }) => ({
    nutrition: one(nutritions_1.nutritions, {
        fields: [exports.ingredients.nutritionId],
        references: [nutritions_1.nutritions.id],
    }),
}));
