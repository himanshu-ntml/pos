"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeItemFromStopList = exports.addItemToStopList = exports.deleteOne = exports.create = exports.update = exports.getStopItems = exports.getAll = exports.getOne = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../db");
const schemas_1 = require("../schemas");
const getOne = async (id) => {
    try {
        return await db_1.db.query.items.findFirst({
            where: (0, drizzle_orm_1.eq)(schemas_1.items.id, id),
        });
    }
    catch (error) {
        console.log(error);
        return { error: "[db:getOneitem] Went wrong.." };
    }
};
exports.getOne = getOne;
const getAll = async () => {
    try {
        return await db_1.db.query.items.findMany();
    }
    catch (error) {
        console.log(error);
        return { error: "[db:getManyitem] Went wrong.." };
    }
};
exports.getAll = getAll;
const getStopItems = async () => {
    try {
        return await db_1.db.query.items.findMany({
            where: (0, drizzle_orm_1.eq)(schemas_1.items.isAvailable, false),
        });
    }
    catch (error) {
        console.log(error);
        return { error: "[db:getStopitems] Went wrong.." };
    }
};
exports.getStopItems = getStopItems;
const update = async (id, body) => {
    try {
        return await db_1.db.update(schemas_1.items).set(body).where((0, drizzle_orm_1.eq)(schemas_1.items.id, id)).returning();
    }
    catch (error) {
        console.log(error);
        return { error: "[db:getManyitem] Went wrong.." };
    }
};
exports.update = update;
const create = async (body) => {
    try {
        return await db_1.db.insert(schemas_1.items).values(body).returning();
    }
    catch (error) {
        console.log(error);
        return { error: "[db:createitem] Went wrong.." };
    }
};
exports.create = create;
const deleteOne = async (id) => {
    try {
        const result = await db_1.db.delete(schemas_1.items).where((0, drizzle_orm_1.eq)(schemas_1.items.id, id));
        return result;
    }
    catch (error) {
        console.log(error);
        return { error: "[db:deleteitem] Went wrong.." };
    }
};
exports.deleteOne = deleteOne;
const addItemToStopList = async (id) => {
    try {
        return await db_1.db
            .update(schemas_1.items)
            .set({ isAvailable: false })
            .where((0, drizzle_orm_1.eq)(schemas_1.items.id, Number(id)));
    }
    catch (error) {
        console.log(error);
        return { error: "[db:additemstoplist] Went wrong.." };
    }
};
exports.addItemToStopList = addItemToStopList;
const removeItemFromStopList = async (id) => {
    try {
        return await db_1.db
            .update(schemas_1.items)
            .set({ isAvailable: true })
            .where((0, drizzle_orm_1.eq)(schemas_1.items.id, Number(id)));
    }
    catch (error) {
        console.log(error);
        return { error: "[db:removeitemstoplist] Went wrong.." };
    }
};
exports.removeItemFromStopList = removeItemFromStopList;
