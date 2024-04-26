import {
  text,
  pgTable,
  integer,
  serial,
  boolean,
  pgEnum,
  timestamp,
  varchar,
  unique,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { Reservation } from "./reservation";
import { User } from "./user";

export const tableStatusEnum = pgEnum("table_status", ["available", "occupied", "reserved", "closed"]);
export const tables = pgTable(
  "tables",
  {
    id: serial("id").primaryKey().notNull(),
    number: integer("number").notNull(),
    prefix: varchar("prefix", { length: 5 }),
    description: text("description"),
    seats: integer("seats").notNull(),
    requireCleaning: boolean("require_cleaning").default(false).notNull(),
    status: tableStatusEnum("status").default("available").notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  },
  (t) => ({
    unq: unique().on(t.number, t.prefix).nullsNotDistinct(),
  }),
);

export const selectTableSchema = createSelectSchema(tables);
export const insertTableSchema = createInsertSchema(tables, {
  number: z.coerce.number(),
  prefix: z.string().trim().max(5, { message: "The prefix must contain up to 5 letters" }),
  // .transform((v) => v ? v.replace(/\s+/g, '') : v),
  description: z
    .string()
    .max(100)
    .or(z.literal("").transform(() => undefined)),
  seats: z.coerce
    .number({ invalid_type_error: "Required" })
    .min(1, { message: "At least one seat must be presented" })
    .max(50, { message: "The maximum quantity of the seats is 50" }),
});

export type Table = z.infer<typeof selectTableSchema>;
export type NewTable = z.infer<typeof insertTableSchema>;
export type TableStatus = (typeof tableStatusEnum.enumValues)[number];

export type TableWithReservation = Table & { reservations: Reservation[]; user: User };

