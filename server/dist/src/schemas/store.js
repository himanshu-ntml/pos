"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeCustomSchedule = exports.storeRegularSchedule = exports.storeSettings = exports.dayOfWeek = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.dayOfWeek = (0, pg_core_1.pgEnum)("day_of_week", [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
]);
exports.storeSettings = (0, pg_core_1.pgTable)("store_settings", {
    profileName: (0, pg_core_1.text)("profile_name").default("default").primaryKey().notNull(),
    storeForceClose: (0, pg_core_1.boolean)("store_force_close").default(false).notNull(),
    reservationInterval: (0, pg_core_1.integer)("reservation_interval"),
    reservationDuration: (0, pg_core_1.integer)("reservation_duration"),
    reservationNotArrivalExpirationTime: (0, pg_core_1.integer)("reservation_not_arrival_expiration_time"),
    tableNumberLeadingZeros: (0, pg_core_1.boolean)("table_leading_zeros").default(false).notNull(),
    leadingZerosQuantity: (0, pg_core_1.integer)("leading_zeros_quantity").default(1).notNull(),
    serviceFee: (0, pg_core_1.decimal)("service_fee"),
});
exports.storeRegularSchedule = (0, pg_core_1.pgTable)("store_regular_working_times", {
    number: (0, pg_core_1.integer)("number").primaryKey().notNull(),
    day: (0, exports.dayOfWeek)("day").notNull(),
    openTime: (0, pg_core_1.time)("open_time", { withTimezone: false }).notNull(),
    closeTime: (0, pg_core_1.time)("close_time", { withTimezone: false }).notNull(),
    isActive: (0, pg_core_1.boolean)("is_active").default(true).notNull(),
});
exports.storeCustomSchedule = (0, pg_core_1.pgTable)("store_custom_working_times", {
    date: (0, pg_core_1.date)("date").primaryKey().notNull(),
    name: (0, pg_core_1.text)("name").notNull(),
    openTime: (0, pg_core_1.time)("open_time", { withTimezone: false }).notNull(),
    closeTime: (0, pg_core_1.time)("close_time", { withTimezone: false }).notNull(),
    isActive: (0, pg_core_1.boolean)("is_active").default(true).notNull(),
});
