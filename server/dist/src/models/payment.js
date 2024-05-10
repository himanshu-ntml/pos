"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.deleteOne = exports.create = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../db");
const schemas_1 = require("../schemas");
const create = async (data) => {
    try {
        const payment = await db_1.db.insert(schemas_1.payments).values(data).returning();
        await db_1.db.update(schemas_1.orders).set({ isPaid: true }).where((0, drizzle_orm_1.eq)(schemas_1.orders.billId, data.billId));
        await db_1.db.update(schemas_1.bills).set({ paid: true }).where((0, drizzle_orm_1.eq)(schemas_1.bills.id, data.billId));
        return payment;
    }
    catch (error) {
        console.log(error);
        return { error: "[db:createPayment] Went wrong.." };
    }
};
exports.create = create;
const deleteOne = async (id) => {
    try {
        return await db_1.db.delete(schemas_1.payments).where((0, drizzle_orm_1.eq)(schemas_1.payments.id, id));
    }
    catch (error) {
        console.log(error);
        return { error: "[db:deletePayment] Went wrong.." };
    }
};
exports.deleteOne = deleteOne;
const update = async (body) => {
    try {
        return await db_1.db.update(schemas_1.payments).set(body).where((0, drizzle_orm_1.eq)(schemas_1.payments.id, body.id)).returning();
    }
    catch (error) {
        console.error(error);
        return { error: "[db:updatePayment] Went wrong.." };
    }
};
exports.update = update;
