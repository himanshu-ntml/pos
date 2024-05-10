"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newCategoriesSchema = exports.categoriesSchema = exports.categories = void 0;
// import { relations } from "drizzle-orm";
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
exports.categories = (0, pg_core_1.pgTable)("category", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
});
exports.categoriesSchema = (0, drizzle_zod_1.createSelectSchema)(exports.categories);
exports.newCategoriesSchema = (0, drizzle_zod_1.createInsertSchema)(exports.categories);
