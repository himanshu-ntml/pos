"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nutritionsRelations = exports.nutritions = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const ingredient_1 = require("./ingredient");
const drizzle_orm_1 = require("drizzle-orm");
// nutrion for 100gm
exports.nutritions = (0, pg_core_1.pgTable)("nutrition", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    calories: (0, pg_core_1.decimal)("calories"),
    carbohydrates: (0, pg_core_1.decimal)("carbohydrates"),
    proteins: (0, pg_core_1.decimal)("proteins"),
    fat: (0, pg_core_1.decimal)("fat"),
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
exports.nutritionsRelations = (0, drizzle_orm_1.relations)(exports.nutritions, ({ one }) => ({
    ignredients: one(ingredient_1.ingredients),
}));
