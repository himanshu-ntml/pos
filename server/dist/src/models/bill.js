"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paidThisMonth = exports.paidThisWeek = exports.generateBill = exports.deleteOne = exports.create = exports.update = exports.getAll = exports.getAllPaid = exports.getOneByOrderId = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../db");
const schemas_1 = require("../schemas");
const order_1 = require("./order");
const date_fns_1 = require("date-fns");
const getOneByOrderId = async (orderId) => {
    try {
        // const bill = await db.select().from(bills).where(eq(bills.orderId, id));
        const bill = await db_1.db.query.bills.findFirst({
            where: (0, drizzle_orm_1.eq)(schemas_1.bills.orderId, orderId),
            with: { payments: true, user: { columns: { name: true, role: true } } },
        });
        return bill;
    }
    catch (error) {
        console.log(error);
        return { error: "[db:getOneBill] Went wrong.." };
    }
};
exports.getOneByOrderId = getOneByOrderId;
const getAllPaid = async ({ paid }) => {
    try {
        return await db_1.db.query.bills.findMany({
            where: (0, drizzle_orm_1.eq)(schemas_1.bills.paid, paid),
        });
    }
    catch (error) {
        console.log(error);
        return { error: "[db:getManyBills] Went wrong.." };
    }
};
exports.getAllPaid = getAllPaid;
const getAll = async () => {
    try {
        const bills = await db_1.db.query.bills.findMany({
            orderBy: (bills, { asc }) => [asc(bills.id)],
            with: { payments: true },
        });
        // return await db.query.bills.findMany({ with: { payments: true } });
        return bills;
    }
    catch (error) {
        console.log(error);
        return { error: "[db:getManyBills] Went wrong.." };
    }
};
exports.getAll = getAll;
const update = async (data) => {
    try {
        if (!data.id)
            return { error: "Bill id is required" };
        return await db_1.db.update(schemas_1.bills).set(data).where((0, drizzle_orm_1.eq)(schemas_1.bills.id, data.id)).returning();
    }
    catch (error) {
        console.log(error);
        return { error: "[db:getManyBills] Went wrong.." };
    }
};
exports.update = update;
const create = async (data) => {
    try {
        const [billId] = await db_1.db.insert(schemas_1.bills).values(data).returning();
        return await db_1.db.update(schemas_1.orders).set({ billId: billId.id }).where((0, drizzle_orm_1.eq)(schemas_1.orders.id, data.orderId));
    }
    catch (error) {
        console.log(error);
        return { error: "[db:createBill] Went wrong.." };
    }
};
exports.create = create;
const deleteOne = async (id) => {
    try {
        const result = await db_1.db.delete(schemas_1.bills).where((0, drizzle_orm_1.eq)(schemas_1.bills.id, id));
        return result;
    }
    catch (error) {
        console.log(error);
        return { error: "[db:deleteBill] Went wrong.." };
    }
};
exports.deleteOne = deleteOne;
const generateBill = async (orderId, tipsAmount) => {
    try {
        const order = await (0, order_1.getOne)(orderId);
        if (!order || !("orderItems" in order))
            return { error: "Order not found" };
        const tipsAmountNumber = tipsAmount ? tipsAmount : 0;
        let totalAmount = 0;
        for (const orderItem of order.orderItems) {
            totalAmount += orderItem.quantity * Number(orderItem.items.price);
        }
        const total = (totalAmount + tipsAmountNumber).toFixed(2).toString();
        if (order.billId) {
            return await db_1.db
                .update(schemas_1.bills)
                .set({ totalAmount: totalAmount.toFixed(2).toString() })
                .where((0, drizzle_orm_1.eq)(schemas_1.bills.id, order.billId))
                .returning();
        }
        return await (0, exports.create)({ orderId, totalAmount: total, userId: 1 });
    }
    catch (error) {
        console.error(error);
        return { error: "[db:generateBill] Went wrong.." };
    }
};
exports.generateBill = generateBill;
const paidThisWeek = async () => {
    const today = new Date();
    const result = await db_1.db
        .select()
        .from(schemas_1.bills)
        .where((0, drizzle_orm_1.gte)(schemas_1.bills.createdAt, (0, date_fns_1.subDays)(today, 7)));
    return (result &&
        result
            .reduce((acc, cur) => {
            return acc + Number(cur.totalAmount);
        }, 0)
            .toFixed(2));
};
exports.paidThisWeek = paidThisWeek;
const paidThisMonth = async () => {
    const today = new Date();
    const result = await db_1.db
        .select()
        .from(schemas_1.bills)
        .where((0, drizzle_orm_1.gte)(schemas_1.bills.createdAt, (0, date_fns_1.subDays)(today, 30)));
    return result
        .reduce((acc, cur) => {
        return acc + Number(cur.totalAmount);
    }, 0)
        .toFixed(2);
};
exports.paidThisMonth = paidThisMonth;
