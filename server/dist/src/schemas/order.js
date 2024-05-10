"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newOrderWithItemsSchema = exports.orderItemsSchema = exports.newOrderSchema = exports.ordersSchema = exports.orderItemsRelations = exports.ordersRelations = exports.orderItems = exports.orders = exports.orderStatus = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
const drizzle_zod_1 = require("drizzle-zod");
const item_1 = require("./item");
const table_1 = require("./table");
const user_1 = require("./user");
const bill_1 = require("./bill");
exports.orderStatus = (0, pg_core_1.pgEnum)("order_status", [
    "Ready",
    "In Progress",
    "Completed",
    "Cancelled",
    "Served",
]);
exports.orders = (0, pg_core_1.pgTable)("orders", {
    id: (0, pg_core_1.serial)("id").primaryKey().notNull(),
    userId: (0, pg_core_1.serial)("user_id").notNull(),
    tableId: (0, pg_core_1.integer)("table_id").references(() => table_1.tables.id),
    isPaid: (0, pg_core_1.boolean)("is_paid").default(false).notNull(),
    status: (0, exports.orderStatus)("order_status").default("In Progress").notNull(),
    specialRequest: (0, pg_core_1.text)("special_request"),
    billId: (0, pg_core_1.integer)("bill_id"),
    createdAt: (0, pg_core_1.timestamp)("created_at", { mode: "string" }).notNull().defaultNow(),
});
exports.orderItems = (0, pg_core_1.pgTable)("order_items", {
    orderId: (0, pg_core_1.integer)("order_id")
        .notNull()
        .references(() => exports.orders.id),
    itemId: (0, pg_core_1.integer)("item_id")
        .notNull()
        .references(() => item_1.items.id),
    quantity: (0, pg_core_1.integer)("quantity").notNull().default(1),
}, (t) => ({
    pk: (0, pg_core_1.primaryKey)({ columns: [t.orderId, t.itemId] }),
}));
exports.ordersRelations = (0, drizzle_orm_1.relations)(exports.orders, ({ one, many }) => ({
    table: one(table_1.tables, {
        fields: [exports.orders.tableId],
        references: [table_1.tables.id],
    }),
    user: one(user_1.users, {
        fields: [exports.orders.userId],
        references: [user_1.users.id],
    }),
    bill: one(bill_1.bills, {
        fields: [exports.orders.billId],
        references: [bill_1.bills.id],
    }),
    orderItems: many(exports.orderItems),
}));
exports.orderItemsRelations = (0, drizzle_orm_1.relations)(exports.orderItems, ({ one }) => ({
    items: one(item_1.items, {
        fields: [exports.orderItems.itemId],
        references: [item_1.items.id],
    }),
    orders: one(exports.orders, {
        fields: [exports.orderItems.orderId],
        references: [exports.orders.id],
    }),
}));
exports.ordersSchema = (0, drizzle_zod_1.createSelectSchema)(exports.orders);
exports.newOrderSchema = (0, drizzle_zod_1.createInsertSchema)(exports.orders);
exports.orderItemsSchema = (0, drizzle_zod_1.createInsertSchema)(exports.orderItems);
exports.newOrderWithItemsSchema = exports.newOrderSchema.extend({
    items: exports.orderItemsSchema.omit({ orderId: true }).array(),
});
