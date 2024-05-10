"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertTableSchema = exports.selectTableSchema = exports.tables = exports.tableStatusEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
const zod_1 = require("zod");
exports.tableStatusEnum = (0, pg_core_1.pgEnum)("table_status", ["available", "occupied", "reserved", "closed"]);
exports.tables = (0, pg_core_1.pgTable)("tables", {
    id: (0, pg_core_1.serial)("id").primaryKey().notNull(),
    number: (0, pg_core_1.integer)("number").notNull(),
    prefix: (0, pg_core_1.varchar)("prefix", { length: 5 }),
    description: (0, pg_core_1.text)("description"),
    seats: (0, pg_core_1.integer)("seats").notNull(),
    requireCleaning: (0, pg_core_1.boolean)("require_cleaning").default(false).notNull(),
    status: (0, exports.tableStatusEnum)("status").default("available").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: "string" }).defaultNow().notNull(),
}, (t) => ({
    unq: (0, pg_core_1.unique)().on(t.number, t.prefix).nullsNotDistinct(),
}));
exports.selectTableSchema = (0, drizzle_zod_1.createSelectSchema)(exports.tables);
exports.insertTableSchema = (0, drizzle_zod_1.createInsertSchema)(exports.tables, {
    number: zod_1.z.coerce.number(),
    prefix: zod_1.z.string().trim().max(5, { message: "The prefix must contain up to 5 letters" }),
    // .transform((v) => v ? v.replace(/\s+/g, '') : v),
    description: zod_1.z
        .string()
        .max(100)
        .or(zod_1.z.literal("").transform(() => undefined)),
    seats: zod_1.z.coerce
        .number({ invalid_type_error: "Required" })
        .min(1, { message: "At least one seat must be presented" })
        .max(50, { message: "The maximum quantity of the seats is 50" }),
});
