import { and, eq, getTableColumns, gte, ne } from "drizzle-orm";

import { db } from "../db";
import {
  type NewOrder,
  orders,
  orderItems,
  OrderStatus,
  NewOrderWithItems,
  tables,
  NewOrderItem,
  items,
  users,
} from "../schemas";
import { combineItems } from "../utils";
import { subDays } from "date-fns";

export const getOne = async (id: number) => {
  try {
    const result = await db.query.orders.findFirst({
      where: and(eq(orders.id, id)),
      with: {
        orderItems: {
          columns: {
            orderId: false,
          },
          with: {
            items: {
              columns: {
                price: true,
                name: true,
                imageUrl: true,
              },
            },
          },
        },
        bill: true,
      },
    });
    return result || null;
  } catch (error) {
    console.log(error);
    return { error: "[db:getOneOrder] Went wrong.." };
  }
};

export const getOneByTableId = async (tableId: number) => {
  try {
    const result = await db.query.orders.findFirst({
      where: and(eq(orders.tableId, tableId), ne(orders.status, "Completed")),
      with: {
        orderItems: {
          columns: {
            orderId: false,
          },
          with: {
            items: {
              columns: {
                price: true,
                name: true,
                imageUrl: true,
              },
            },
          },
        },
        user: true,
      },
    });
    return result || null;
  } catch (error) {
    console.log(error);
    return { error: "[db:getOneOrder] Went wrong.." };
  }
};
export const getAll = async () => {
  try {
    return await db.query.orders.findMany();
  } catch (error) {
    console.log(error);
    return { error: "[db:getManyOrder] Went wrong.." };
  }
};
type Unpromisify<T> = T extends Promise<infer U> ? U : T;
export type OrderWithItems = Unpromisify<
  ReturnType<typeof getOrdersWithItems>
>[0];

export const getOrdersWithItems = async (status?: OrderStatus[number]) => {
  try {
    const result = await db.query.orders.findMany({
      where: status ? eq(orders.status, status) : undefined,
      orderBy: (orders, { asc }) => [asc(orders.id)],
      with: {
        bill: true,
        orderItems: {
          columns: {
            orderId: false,
          },
          with: {
            items: {
              columns: {
                price: true,
                name: true,
                imageUrl: true,
              },
            },
          },
        },
      },
    });
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("[db:getManyOrder] Went wrong..");
  }
};

export const update = async (id: number, body: NewOrder) => {
  try {
    const result = await db.update(orders).set(body).where(eq(orders.id, id));
    return result;
  } catch (error) {
    console.log(error);
    return { error: "[db:updateOrder] Went wrong.." };
  }
};

export const create = async (values: NewOrderWithItems) => {
  try {
    const insertedOrder = await db
      .insert(orders)
      .values({ tableId: values.tableId, userId: values.userId })
      .returning();
    const orderId = insertedOrder[0].id;
    await db
      .insert(orderItems)
      .values(values.items.map((item) => ({ ...item, orderId })));

    return {
      success: true,
      orderId,
      items: values.items,
      tableId: values.tableId,
    };
  } catch (error) {
    console.log(error);
    return { error: "[db:createOrder] Went wrong.." };
  }
};

export const deleteOne = async (id: number) => {
  try {
    const result = await db.delete(orders).where(eq(orders.id, id));
    return result;
  } catch (error) {
    console.log(error);
    return { error: "[db:deleteOrder] Went wrong.." };
  }
};

export const pay = async (id: number) => {
  try {
    // TODO: do something ALL about this crap...
    return { id };
    // const orderId = await db.query.orders.findFirst({
    //   where: eq(orders.id, id),
    //   columns: { id: true },
    // });

    // if (!orderId) throw new Error("Order not found");

    // const totalAmoutPaid = await db.query.orderItems.findMany({
    //   where: eq(orderItems.orderId, id),
    //   with: {
    //     items: {
    //       columns: {
    //         price: true,
    //       },
    //     },
    //   },
    // });
    // const totalPrice = totalAmoutPaid?.reduce((cur, item) => cur + item.quantity * Number(item.items.price), 0);

    // await db.update(orders).set({ totalPrice: totalPrice.toString() }).where(eq(orders.id, id));

    // const result = await db.update(orders).set({ isPaid: true }).where(eq(orders.id, orderId.id));
    // return result;
  } catch (error) {
    console.log(error);
    return { error: "[db:payOrder] Went wrong.." };
  }
};

export const complete = async (id: number) => {
  try {
    const result = await db
      .update(orders)
      .set({ status: "Completed" })
      .where(eq(orders.id, id));
    db.update(tables)
      .set({ requireCleaning: true })
      .where(eq(tables.id, orders.tableId));
    return result;
  } catch (error) {
    console.log(error);
    return { error: "[db:completeOrder] Went wrong.." };
  }
};
export const cancelOrder = async (id: number) => {
  try {
    const result = await db
      .update(orders)
      .set({ status: "Cancelled" })
      .where(eq(orders.id, id));
    return result;
  } catch (error) {
    console.log(error);
    return { error: "[db:cancelOrder] Went wrong.." };
  }
};

export const serve = async (id: number) => {
  try {
    const result = await db
      .update(orders)
      .set({ status: "Served" })
      .where(eq(orders.id, id));
    return result;
  } catch (error) {
    console.log(error);
    return { error: "[db:serverOrder] Went wrong.." };
  }
};

export const leave = async (id: number) => {
  try {
    const order = await db.select().from(orders).where(eq(orders.id, id));
    const { tableId } = order[0];
    if (!tableId) return;
    const result = await db
      .update(tables)
      .set({ status: "available" })
      .where(eq(tables.id, tableId));
    return result;
  } catch (error) {
    console.log(error);
    return { error: "[db:closeOrder] Went wrong.." };
  }
};
export const reinstand = async (id: number) => {
  try {
    const result = await db
      .update(orders)
      .set({ status: "In Progress" })
      .where(eq(orders.id, id));
    return result;
  } catch (error) {
    console.log(error);
    return { error: "[db:reinstandOrder] Went wrong.." };
  }
};

export const recentCompletedOrders = async (tableId: number) => {
  try {
    return db.query.orders.findMany({
      where: and(eq(orders.tableId, tableId), eq(orders.status, "Completed")),
      with: {
        bill: true,
        user: { columns: { name: true, role: true, id: true } },
      },
    });
  } catch (error) {
    console.log(error);
    return { error: "[db:recentCompletedOrders] Went wrong.." };
  }
};

export const addSpecailRequest = async (id: number, request: string) => {
  try {
    const result = await db
      .update(orders)
      .set({ specialRequest: request })
      .where(eq(orders.id, id));
    return result;
  } catch (error) {
    console.log(error);
    return { error: "[db:addSpecialRequest] Went wrong.." };
  }
};

export const addMoreItemsToOrder = async (moreItems: NewOrderItem[]) => {
  try {
    const orderId = moreItems[0].orderId;
    const existingOrderItems = await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, orderId));

    const combinedOrderItems = combineItems(existingOrderItems, moreItems);

    await db.delete(orderItems).where(eq(orderItems.orderId, orderId));
    await db.insert(orderItems).values(combinedOrderItems);
    return { orderId };
  } catch (error) {
    console.log(error);
    return { error: "[db:addMore] Went wrong.." };
  }
};

export const getPending = async () => {
  try {
    const pendingOrders = await getOrdersWithItems("In Progress");
    return pendingOrders;
  } catch (error) {
    console.log(error);
    return { error: "[db:getPendingOrders] Went wrong.." };
  }
};

export const getOrderItems = async () => {
  try {
    const { password, ...rest } = getTableColumns(users);
    return await db
      .select({
        order_items: orderItems,
        orders: orders,
        items: items,
        users: rest,
        tables: tables,
      })
      .from(orderItems)
      .where(eq(orders.status, "In Progress"))
      .leftJoin(orders, eq(orderItems.orderId, orders.id))
      .leftJoin(items, eq(orderItems.itemId, items.id))
      .leftJoin(users, eq(orders.userId, users.id))
      .leftJoin(tables, eq(orders.tableId, tables.id));
  } catch (error) {
    console.log(error);
    return { error: "[db:getOrderItems] Went wrong.." };
  }
};

export const ready = async ({
  orderId,
  itemId,
}: {
  orderId: number;
  itemId: number;
}) => {
  try {
    const order = await db.query.orders.findFirst({
      where: eq(orders.id, orderId),
      with: {
        orderItems: true,
      },
    });

    console.log("REady ? , ", order);
    // const result = await db.update(orders).set({ status: "Ready" }).where(eq(orders.id, id));
    // return result;
    return;
  } catch (error) {
    console.log(error);
    return { error: "[db:readyOrder] Went wrong.." };
  }
};

export const getRecentOrders = async () => {
  try {
    const today = new Date();
    const result = await db.query.orders.findMany({
      where: gte(orders.createdAt, subDays(today, 7).toDateString()),
      with: { user: { columns: { name: true, role: true } }, bill: true },
    });

    return result;
  } catch (error) {
    console.log(error);
    return { error: "[db:recentOrders] Went wrong.." };
  }
};
