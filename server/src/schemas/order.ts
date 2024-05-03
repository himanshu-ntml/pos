import {
  integer,
  pgEnum,
  pgTable,
  serial,
  boolean,
  primaryKey,
  timestamp,
  text,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { Item, items } from "./item";
import { Table, tables } from "./table";
import { User, users } from "./user";
import { z } from "zod";
import { Bill, bills } from "./bill";

export const orderStatus = pgEnum("order_status", [
  "Ready",
  "In Progress",
  "Completed",
  "Cancelled",
  "Served",
]);

export const orders = pgTable("orders", {
  id: serial("id").primaryKey().notNull(),
  userId: serial("user_id").notNull(),
  tableId: integer("table_id").references(() => tables.id),
  isPaid: boolean("is_paid").default(false).notNull(),
  status: orderStatus("order_status").default("In Progress").notNull(),
  specialRequest: text("special_request"),
  billId: integer("bill_id"),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
});

export const orderItems = pgTable(
  "order_items",
  {
    orderId: integer("order_id")
      .notNull()
      .references(() => orders.id),
    itemId: integer("item_id")
      .notNull()
      .references(() => items.id),
    quantity: integer("quantity").notNull().default(1),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.orderId, t.itemId] }),
  })
);

export const ordersRelations = relations(orders, ({ one, many }) => ({
  table: one(tables, {
    fields: [orders.tableId],
    references: [tables.id],
  }),
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  bill: one(bills, {
    fields: [orders.billId],
    references: [bills.id],
  }),
  orderItems: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  items: one(items, {
    fields: [orderItems.itemId],
    references: [items.id],
  }),
  orders: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
}));

export const ordersSchema = createSelectSchema(orders);
export const newOrderSchema = createInsertSchema(orders);
export const orderItemsSchema = createInsertSchema(orderItems);

export const newOrderWithItemsSchema = newOrderSchema.extend({
  items: orderItemsSchema.omit({ orderId: true }).array(),
});

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;

export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;

export type NewOrderWithItems = z.infer<typeof newOrderWithItemsSchema>;

export type OrderStatus = typeof orderStatus.enumValues;

export type OrderItemsWithOrderAndItems = {
  orders: Order;
  items: Item;
  order_items: OrderItem;
  users: User;
  tables: Table;
};
export type OrderWithUser = Order & { user: User };
export type OrderWithUserAndBill = OrderWithUser & { bill: Bill; user: User };