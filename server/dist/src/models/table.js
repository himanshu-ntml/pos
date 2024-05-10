"use strict";
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../db");
const schemas_1 = require("../schemas");
const getOne = async (id) => {
    try {
        return await db_1.db.query.tables.findFirst({ where: (0, drizzle_orm_1.eq)(schemas_1.tables.id, id) });
    }
    catch (error_1) {
        console.error(error_1);
        throw new Error("Internal [db] server error");
    }
};
const getAllByStatus = async (status) => {
    try {
        return await db_1.db.query.tables.findMany({
            where: (0, drizzle_orm_1.eq)(schemas_1.tables.status, status),
            with: {
                reservations: {
                    where: (0, drizzle_orm_1.eq)(schemas_1.reservations.tableId, schemas_1.tables.id),
                },
            },
        });
    }
    catch (error) {
        console.error(error);
        throw new Error("Internal server error");
    }
};
const getAll = async () => {
    const date = new Date().toLocaleDateString(undefined, { day: "2-digit", month: "2-digit", year: "numeric" });
    try {
        const result = await db_1.db.query.tables.findMany({
            with: {
                reservations: {
                    where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schemas_1.reservations.tableId, schemas_1.tables.id), (0, drizzle_orm_1.eq)(schemas_1.reservations.scheduledAt, date)),
                },
            },
        });
        return result;
    }
    catch (error_1) {
        console.error(error_1);
        throw new Error("Internal server error");
    }
};
const create = async (body) => {
    try {
        const isExist = await db_1.db.query.tables.findFirst({
            where: (0, drizzle_orm_1.eq)(schemas_1.tables.number, body.number),
        });
        if (isExist)
            return { error: "Table number already exist" };
        return await db_1.db.insert(schemas_1.tables).values(body).returning();
    }
    catch (error) {
        console.error(error);
        throw new Error("Internal server error");
        // return { error: "[db:createTable] Went wrong.." };
    }
};
//delete a tables
const deleteOne = async (id) => {
    try {
        return await db_1.db.delete(schemas_1.tables).where((0, drizzle_orm_1.eq)(schemas_1.tables.id, id));
    }
    catch (error) {
        console.log(error);
        return { error: "[db:deleteTable] Went wrong.." };
    }
};
//update a tables record
const update = async (id, body) => {
    try {
        return await db_1.db.update(schemas_1.tables).set(body).where((0, drizzle_orm_1.eq)(schemas_1.tables.id, id)).returning();
    }
    catch (error) {
        console.error(error);
        return { error: "[db:updateTable] Went wrong.." };
    }
};
const updateStatus = async (id, status) => {
    try {
        return await db_1.db.update(schemas_1.tables).set({ status }).where((0, drizzle_orm_1.eq)(schemas_1.tables.id, id)).returning();
    }
    catch (error) {
        console.error(error);
        return { error: "[db:updateStatus] Went wrong.." };
    }
};
const markClean = async (id) => {
    try {
        console.log("MARK AS CLEAN >>>> ", id);
        return await db_1.db.update(schemas_1.tables).set({ requireCleaning: false }).where((0, drizzle_orm_1.eq)(schemas_1.tables.id, id)).returning();
    }
    catch (error) {
        console.error(error);
        return { error: "[db:markClean] Went wrong.." };
    }
};
module.exports = {
    getOne,
    getAll,
    create,
    deleteOne,
    update,
    updateStatus,
    markClean,
    getAllByStatus,
};
