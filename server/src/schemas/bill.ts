import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, serial, timestamp, decimal, boolean, unique } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { orders } from "./order";
import { users } from "./user";

export const paymentMethod = pgEnum("payment_method", ["Card", "Cash"]);

export const bills = pgTable(
  "bills",
  {
    id: serial("id").primaryKey().notNull(),
    totalAmount: decimal("total_amount").notNull(),
    serviceFee: decimal("service_fee"),
    tax: decimal("tax"),
    paid: boolean("paid").default(false),
    userId: integer("user_id").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    orderId: integer("order_id")
      .notNull()
      .references(() => orders.id),
  },
  (t) => ({ unq: unique().on(t.userId, t.orderId).nullsNotDistinct() }),
);

export const payments = pgTable("payments", {
  id: serial("id").primaryKey().notNull(),
  billId: integer("bill_id")
    .references(() => bills.id)
    .notNull(),
  paymentMethod: paymentMethod("payment_method").notNull(),
  chargedAmount: decimal("charged_amount").notNull(),
  tipAmount: decimal("tip_amount"),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
});

export const billsRelations = relations(bills, ({ one, many }) => ({
  payments: many(payments),
  orders: one(orders, {
    fields: [bills.orderId],
    references: [orders.id],
  }),
  user: one(users, {
    fields: [bills.userId],
    references: [users.id],
  }),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  bill: one(bills, {
    fields: [payments.billId],
    references: [bills.id],
  }),
  user: one(users, {
    fields: [payments.userId],
    references: [users.id],
  }),
}));

export type Bill = typeof bills.$inferSelect;
export type NewBill = typeof bills.$inferInsert;
export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;

export type BillWithPayments = Bill & { payments: Payment[] };

export const billSchema = createSelectSchema(bills);
export const newBillSchema = createInsertSchema(bills);
export const paymentSchema = createSelectSchema(payments);
export const newPaymentSchema = createInsertSchema(payments);
