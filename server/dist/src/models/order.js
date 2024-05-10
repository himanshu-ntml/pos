"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecentOrders = exports.ready = exports.getOrderItems = exports.getPending = exports.addMoreItemsToOrder = exports.addSpecailRequest = exports.recentCompletedOrders = exports.reinstand = exports.leave = exports.serve = exports.cancelOrder = exports.complete = exports.pay = exports.deleteOne = exports.create = exports.update = exports.getOrdersWithItems = exports.getAll = exports.getOneByTableId = exports.getOne = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../db");
const schemas_1 = require("../schemas");
const utils_1 = require("../utils");
const date_fns_1 = require("date-fns");
const getOne = async (id) => {
    try {
        const result = await db_1.db.query.orders.findFirst({
            where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schemas_1.orders.id, id)),
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
    }
    catch (error) {
        console.log(error);
        return { error: "[db:getOneOrder] Went wrong.." };
    }
};
exports.getOne = getOne;
const getOneByTableId = async (tableId) => {
    try {
        const result = await db_1.db.query.orders.findFirst({
            where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schemas_1.orders.tableId, tableId), (0, drizzle_orm_1.ne)(schemas_1.orders.status, "Completed")),
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
    }
    catch (error) {
        console.log(error);
        return { error: "[db:getOneOrder] Went wrong.." };
    }
};
exports.getOneByTableId = getOneByTableId;
const getAll = async () => {
    try {
        return await db_1.db.query.orders.findMany();
    }
    catch (error) {
        console.log(error);
        return { error: "[db:getManyOrder] Went wrong.." };
    }
};
exports.getAll = getAll;
const getOrdersWithItems = async (status) => {
    try {
        const result = await db_1.db.query.orders.findMany({
            where: status ? (0, drizzle_orm_1.eq)(schemas_1.orders.status, status) : undefined,
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
    }
    catch (error) {
        console.log(error);
        throw new Error("[db:getManyOrder] Went wrong..");
    }
};
exports.getOrdersWithItems = getOrdersWithItems;
const update = async (id, body) => {
    try {
        const result = await db_1.db.update(schemas_1.orders).set(body).where((0, drizzle_orm_1.eq)(schemas_1.orders.id, id));
        return result;
    }
    catch (error) {
        console.log(error);
        return { error: "[db:updateOrder] Went wrong.." };
    }
};
exports.update = update;
const create = async (values) => {
    try {
        const insertedOrder = await db_1.db
            .insert(schemas_1.orders)
            .values({ tableId: values.tableId, userId: values.userId })
            .returning();
        const orderId = insertedOrder[0].id;
        await db_1.db
            .insert(schemas_1.orderItems)
            .values(values.items.map((item) => ({ ...item, orderId })));
        return {
            success: true,
            orderId,
            items: values.items,
            tableId: values.tableId,
        };
    }
    catch (error) {
        console.log(error);
        return { error: "[db:createOrder] Went wrong.." };
    }
};
exports.create = create;
const deleteOne = async (id) => {
    try {
        const result = await db_1.db.delete(schemas_1.orders).where((0, drizzle_orm_1.eq)(schemas_1.orders.id, id));
        return result;
    }
    catch (error) {
        console.log(error);
        return { error: "[db:deleteOrder] Went wrong.." };
    }
};
exports.deleteOne = deleteOne;
const pay = async (id) => {
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
    }
    catch (error) {
        console.log(error);
        return { error: "[db:payOrder] Went wrong.." };
    }
};
exports.pay = pay;
const complete = async (id) => {
    try {
        const result = await db_1.db
            .update(schemas_1.orders)
            .set({ status: "Completed" })
            .where((0, drizzle_orm_1.eq)(schemas_1.orders.id, id));
        db_1.db.update(schemas_1.tables)
            .set({ requireCleaning: true })
            .where((0, drizzle_orm_1.eq)(schemas_1.tables.id, schemas_1.orders.tableId));
        return result;
    }
    catch (error) {
        console.log(error);
        return { error: "[db:completeOrder] Went wrong.." };
    }
};
exports.complete = complete;
const cancelOrder = async (id) => {
    try {
        const result = await db_1.db
            .update(schemas_1.orders)
            .set({ status: "Cancelled" })
            .where((0, drizzle_orm_1.eq)(schemas_1.orders.id, id));
        return result;
    }
    catch (error) {
        console.log(error);
        return { error: "[db:cancelOrder] Went wrong.." };
    }
};
exports.cancelOrder = cancelOrder;
const serve = async (id) => {
    try {
        const result = await db_1.db
            .update(schemas_1.orders)
            .set({ status: "Served" })
            .where((0, drizzle_orm_1.eq)(schemas_1.orders.id, id));
        return result;
    }
    catch (error) {
        console.log(error);
        return { error: "[db:serverOrder] Went wrong.." };
    }
};
exports.serve = serve;
const leave = async (id) => {
    try {
        const order = await db_1.db.select().from(schemas_1.orders).where((0, drizzle_orm_1.eq)(schemas_1.orders.id, id));
        const { tableId } = order[0];
        if (!tableId)
            return;
        const result = await db_1.db
            .update(schemas_1.tables)
            .set({ status: "available" })
            .where((0, drizzle_orm_1.eq)(schemas_1.tables.id, tableId));
        return result;
    }
    catch (error) {
        console.log(error);
        return { error: "[db:closeOrder] Went wrong.." };
    }
};
exports.leave = leave;
const reinstand = async (id) => {
    try {
        const result = await db_1.db
            .update(schemas_1.orders)
            .set({ status: "In Progress" })
            .where((0, drizzle_orm_1.eq)(schemas_1.orders.id, id));
        return result;
    }
    catch (error) {
        console.log(error);
        return { error: "[db:reinstandOrder] Went wrong.." };
    }
};
exports.reinstand = reinstand;
const recentCompletedOrders = async (tableId) => {
    try {
        return db_1.db.query.orders.findMany({
            where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schemas_1.orders.tableId, tableId), (0, drizzle_orm_1.eq)(schemas_1.orders.status, "Completed")),
            with: {
                bill: true,
                user: { columns: { name: true, role: true, id: true } },
            },
        });
    }
    catch (error) {
        console.log(error);
        return { error: "[db:recentCompletedOrders] Went wrong.." };
    }
};
exports.recentCompletedOrders = recentCompletedOrders;
const addSpecailRequest = async (id, request) => {
    try {
        const result = await db_1.db
            .update(schemas_1.orders)
            .set({ specialRequest: request })
            .where((0, drizzle_orm_1.eq)(schemas_1.orders.id, id));
        return result;
    }
    catch (error) {
        console.log(error);
        return { error: "[db:addSpecialRequest] Went wrong.." };
    }
};
exports.addSpecailRequest = addSpecailRequest;
const addMoreItemsToOrder = async (moreItems) => {
    try {
        const orderId = moreItems[0].orderId;
        const existingOrderItems = await db_1.db
            .select()
            .from(schemas_1.orderItems)
            .where((0, drizzle_orm_1.eq)(schemas_1.orderItems.orderId, orderId));
        const combinedOrderItems = (0, utils_1.combineItems)(existingOrderItems, moreItems);
        await db_1.db.delete(schemas_1.orderItems).where((0, drizzle_orm_1.eq)(schemas_1.orderItems.orderId, orderId));
        await db_1.db.insert(schemas_1.orderItems).values(combinedOrderItems);
        return { orderId };
    }
    catch (error) {
        console.log(error);
        return { error: "[db:addMore] Went wrong.." };
    }
};
exports.addMoreItemsToOrder = addMoreItemsToOrder;
const getPending = async () => {
    try {
        const pendingOrders = await (0, exports.getOrdersWithItems)("In Progress");
        return pendingOrders;
    }
    catch (error) {
        console.log(error);
        return { error: "[db:getPendingOrders] Went wrong.." };
    }
};
exports.getPending = getPending;
const getOrderItems = async () => {
    try {
        const { password, ...rest } = (0, drizzle_orm_1.getTableColumns)(schemas_1.users);
        return await db_1.db
            .select({
            order_items: schemas_1.orderItems,
            orders: schemas_1.orders,
            items: schemas_1.items,
            users: rest,
            tables: schemas_1.tables,
        })
            .from(schemas_1.orderItems)
            .where((0, drizzle_orm_1.eq)(schemas_1.orders.status, "In Progress"))
            .leftJoin(schemas_1.orders, (0, drizzle_orm_1.eq)(schemas_1.orderItems.orderId, schemas_1.orders.id))
            .leftJoin(schemas_1.items, (0, drizzle_orm_1.eq)(schemas_1.orderItems.itemId, schemas_1.items.id))
            .leftJoin(schemas_1.users, (0, drizzle_orm_1.eq)(schemas_1.orders.userId, schemas_1.users.id))
            .leftJoin(schemas_1.tables, (0, drizzle_orm_1.eq)(schemas_1.orders.tableId, schemas_1.tables.id));
    }
    catch (error) {
        console.log(error);
        return { error: "[db:getOrderItems] Went wrong.." };
    }
};
exports.getOrderItems = getOrderItems;
const ready = async ({ orderId }) => {
    try {
        const order = await db_1.db.query.orders.findFirst({
            where: (0, drizzle_orm_1.eq)(schemas_1.orders.id, orderId),
            with: {
                orderItems: true,
            },
        });
        console.log("REady ? , ", order);
        const result = await db_1.db
            .update(schemas_1.orders)
            .set({ status: "Ready" })
            .where((0, drizzle_orm_1.eq)(schemas_1.orders.id, orderId));
        return result;
        return;
    }
    catch (error) {
        console.log(error);
        return { error: "[db:readyOrder] Went wrong.." };
    }
};
exports.ready = ready;
const getRecentOrders = async () => {
    try {
        const today = new Date();
        const result = await db_1.db.query.orders.findMany({
            where: (0, drizzle_orm_1.gte)(schemas_1.orders.createdAt, (0, date_fns_1.subDays)(today, 7).toDateString()),
            with: { user: { columns: { name: true, role: true } }, bill: true },
        });
        return result;
    }
    catch (error) {
        console.log(error);
        return { error: "[db:recentOrders] Went wrong.." };
    }
};
exports.getRecentOrders = getRecentOrders;
