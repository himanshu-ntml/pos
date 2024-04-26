import { integer, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { tables } from "./table";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const reservationStatusEnum = pgEnum("reservation_status", [
  "Scheduled",
  "In Progress",
  "Expired",
  "Finished",
  "Cancelled",
]);

export const reservations = pgTable("reservations", {
  id: serial("id").primaryKey().notNull(),
  tableId: integer("table_id").references(() => tables.id),
  customerName: text("customer_name").notNull(),
  customerPhoneNumber: text("customer_phone_number"),
  customerEmail: text("customer_email"),
  guestsPredictedNumber: integer("guest_predicted_number"),
  specialRequests: text("special_requests"),
  notes: text("notes"),
  status: reservationStatusEnum("status").default("Scheduled").notNull(),
  scheduledAt: varchar("scheduled_at", { length: 255 }).notNull(),
  expireAt: varchar("expire_at", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
});

export const tablesRelations = relations(tables, ({ many }) => ({
  reservations: many(reservations),
}));

export const reservationsRelations = relations(reservations, ({ one }) => ({
  table: one(tables, {
    fields: [reservations.id],
    references: [tables.id],
  }),
}));

export type Reservation = typeof reservations.$inferSelect;
export type NewReservation = typeof reservations.$inferInsert;
export const reservationSchema = createSelectSchema(reservations);
export const newReservationSchema = createInsertSchema(reservations, {
  tableId: z.coerce.number().optional(),
  customerName: z.string().min(1, "Required").max(30),
  customerEmail: z
    .string()
    .email({ message: "Incorrect Email" })
    .optional()
    .or(z.literal("").transform(() => undefined)),
  customerPhoneNumber: z
    .string()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  guestsPredictedNumber: z.coerce.number().min(1),
  specialRequests: z
    .string()
    .min(2)
    .max(255)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  notes: z
    .string()
    .min(2)
    .max(255)
    .optional()
    .or(z.literal("").transform(() => undefined)),
});

export const getTimeSlotSchema = z.object({ tableId: z.number().optional(), date: z.string() });
export type GetTimeSlot = z.infer<typeof getTimeSlotSchema>;
