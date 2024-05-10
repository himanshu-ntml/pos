"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeSlotSchema = exports.newReservationSchema = exports.reservationSchema = exports.reservationsRelations = exports.tablesRelations = exports.reservations = exports.reservationStatusEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
const table_1 = require("./table");
const zod_1 = require("zod");
const drizzle_orm_1 = require("drizzle-orm");
exports.reservationStatusEnum = (0, pg_core_1.pgEnum)("reservation_status", [
    "Scheduled",
    "In Progress",
    "Expired",
    "Finished",
    "Cancelled",
]);
exports.reservations = (0, pg_core_1.pgTable)("reservations", {
    id: (0, pg_core_1.serial)("id").primaryKey().notNull(),
    tableId: (0, pg_core_1.integer)("table_id").references(() => table_1.tables.id),
    customerName: (0, pg_core_1.text)("customer_name").notNull(),
    customerPhoneNumber: (0, pg_core_1.text)("customer_phone_number"),
    customerEmail: (0, pg_core_1.text)("customer_email"),
    guestsPredictedNumber: (0, pg_core_1.integer)("guest_predicted_number"),
    specialRequests: (0, pg_core_1.text)("special_requests"),
    notes: (0, pg_core_1.text)("notes"),
    status: (0, exports.reservationStatusEnum)("status").default("Scheduled").notNull(),
    scheduledAt: (0, pg_core_1.varchar)("scheduled_at", { length: 255 }).notNull(),
    expireAt: (0, pg_core_1.varchar)("expire_at", { length: 255 }).notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: "string" }).defaultNow(),
});
exports.tablesRelations = (0, drizzle_orm_1.relations)(table_1.tables, ({ many }) => ({
    reservations: many(exports.reservations),
}));
exports.reservationsRelations = (0, drizzle_orm_1.relations)(exports.reservations, ({ one }) => ({
    table: one(table_1.tables, {
        fields: [exports.reservations.id],
        references: [table_1.tables.id],
    }),
}));
exports.reservationSchema = (0, drizzle_zod_1.createSelectSchema)(exports.reservations);
exports.newReservationSchema = (0, drizzle_zod_1.createInsertSchema)(exports.reservations, {
    tableId: zod_1.z.coerce.number().optional(),
    customerName: zod_1.z.string().min(1, "Required").max(30),
    customerEmail: zod_1.z
        .string()
        .email({ message: "Incorrect Email" })
        .optional()
        .or(zod_1.z.literal("").transform(() => undefined)),
    customerPhoneNumber: zod_1.z
        .string()
        .optional()
        .or(zod_1.z.literal("").transform(() => undefined)),
    guestsPredictedNumber: zod_1.z.coerce.number().min(1),
    specialRequests: zod_1.z
        .string()
        .min(2)
        .max(255)
        .optional()
        .or(zod_1.z.literal("").transform(() => undefined)),
    notes: zod_1.z
        .string()
        .min(2)
        .max(255)
        .optional()
        .or(zod_1.z.literal("").transform(() => undefined)),
});
exports.getTimeSlotSchema = zod_1.z.object({ tableId: zod_1.z.number().optional(), date: zod_1.z.string() });
