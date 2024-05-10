"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newPaymentSchema = exports.paymentSchema = exports.newBillSchema = exports.billSchema = exports.paymentsRelations = exports.billsRelations = exports.payments = exports.bills = exports.paymentMethod = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
const order_1 = require("./order");
const user_1 = require("./user");
exports.paymentMethod = (0, pg_core_1.pgEnum)("payment_method", ["Card", "Cash"]);
exports.bills = (0, pg_core_1.pgTable)("bills", {
    id: (0, pg_core_1.serial)("id").primaryKey().notNull(),
    totalAmount: (0, pg_core_1.decimal)("total_amount").notNull(),
    serviceFee: (0, pg_core_1.decimal)("service_fee"),
    tax: (0, pg_core_1.decimal)("tax"),
    paid: (0, pg_core_1.boolean)("paid").default(false),
    userId: (0, pg_core_1.integer)("user_id").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    orderId: (0, pg_core_1.integer)("order_id")
        .notNull()
        .references(() => order_1.orders.id),
}, (t) => ({ unq: (0, pg_core_1.unique)().on(t.userId, t.orderId).nullsNotDistinct() }));
exports.payments = (0, pg_core_1.pgTable)("payments", {
    id: (0, pg_core_1.serial)("id").primaryKey().notNull(),
    billId: (0, pg_core_1.integer)("bill_id")
        .references(() => exports.bills.id)
        .notNull(),
    paymentMethod: (0, exports.paymentMethod)("payment_method").notNull(),
    chargedAmount: (0, pg_core_1.decimal)("charged_amount").notNull(),
    tipAmount: (0, pg_core_1.decimal)("tip_amount"),
    userId: (0, pg_core_1.integer)("user_id")
        .notNull()
        .references(() => user_1.users.id),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: "string" }).notNull().defaultNow(),
});
exports.billsRelations = (0, drizzle_orm_1.relations)(exports.bills, ({ one, many }) => ({
    payments: many(exports.payments),
    orders: one(order_1.orders, {
        fields: [exports.bills.orderId],
        references: [order_1.orders.id],
    }),
    user: one(user_1.users, {
        fields: [exports.bills.userId],
        references: [user_1.users.id],
    }),
}));
exports.paymentsRelations = (0, drizzle_orm_1.relations)(exports.payments, ({ one }) => ({
    bill: one(exports.bills, {
        fields: [exports.payments.billId],
        references: [exports.bills.id],
    }),
    user: one(user_1.users, {
        fields: [exports.payments.userId],
        references: [user_1.users.id],
    }),
}));
exports.billSchema = (0, drizzle_zod_1.createSelectSchema)(exports.bills);
exports.newBillSchema = (0, drizzle_zod_1.createInsertSchema)(exports.bills);
exports.paymentSchema = (0, drizzle_zod_1.createSelectSchema)(exports.payments);
exports.newPaymentSchema = (0, drizzle_zod_1.createInsertSchema)(exports.payments);
