import { text, pgTable, integer, boolean, pgEnum, time, date, decimal } from "drizzle-orm/pg-core";

export const dayOfWeek = pgEnum("day_of_week", [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]);

export const storeSettings = pgTable("store_settings", {
  profileName: text("profile_name").default("default").primaryKey().notNull(),
  storeForceClose: boolean("store_force_close").default(false).notNull(),
  reservationInterval: integer("reservation_interval"),
  reservationDuration: integer("reservation_duration"),
  reservationNotArrivalExpirationTime: integer("reservation_not_arrival_expiration_time"),
  tableNumberLeadingZeros: boolean("table_leading_zeros").default(false).notNull(),
  leadingZerosQuantity: integer("leading_zeros_quantity").default(1).notNull(),
  serviceFee: decimal("service_fee"),
});

export const storeRegularSchedule = pgTable("store_regular_working_times", {
  number: integer("number").primaryKey().notNull(),
  day: dayOfWeek("day").notNull(),
  openTime: time("open_time", { withTimezone: false }).notNull(),
  closeTime: time("close_time", { withTimezone: false }).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});

export const storeCustomSchedule = pgTable("store_custom_working_times", {
  date: date("date").primaryKey().notNull(),
  name: text("name").notNull(),
  openTime: time("open_time", { withTimezone: false }).notNull(),
  closeTime: time("close_time", { withTimezone: false }).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});

export type StoreSettings = typeof storeSettings.$inferSelect;
export type NewStoreSettings = typeof storeSettings.$inferInsert;

export type StoreRegularSchedule = typeof storeRegularSchedule.$inferSelect;
export type NewStoreRegularSchedule = typeof storeRegularSchedule.$inferInsert;

export type StoreCustomSchedule = typeof storeCustomSchedule.$inferSelect;
export type NewStoreCustomSchedule = typeof storeCustomSchedule.$inferInsert;
