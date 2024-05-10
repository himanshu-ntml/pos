"use strict";
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../db");
const schemas_1 = require("../schemas");
const getOne = async (id) => {
    try {
        return await db_1.db.query.categories.findFirst({
            where: (0, drizzle_orm_1.eq)(schemas_1.categories.id, id),
        });
    }
    catch (error) {
        console.log(error);
        return { error: "[db:getOneCategory] Went wrong.." };
    }
};
const getAll = async () => {
    try {
        return await db_1.db.query.categories.findMany();
    }
    catch (error) {
        console.log(error);
        return { error: "[db:getManyCategory] Went wrong.." };
    }
};
const update = async (id, body) => {
    try {
        return await db_1.db
            .update(schemas_1.categories)
            .set(body)
            .where((0, drizzle_orm_1.eq)(schemas_1.categories.id, id))
            .returning();
    }
    catch (error) {
        console.log(error);
        return { error: "[db:getManyCategory] Went wrong.." };
    }
};
const create = async (body) => {
    try {
        return await db_1.db.insert(schemas_1.categories).values(body).returning();
    }
    catch (error) {
        console.log(error);
        return { error: "[db:createCategory] Went wrong.." };
    }
};
const deleteOne = async (id) => {
    try {
        const result = await db_1.db.delete(schemas_1.categories).where((0, drizzle_orm_1.eq)(schemas_1.categories.id, id));
        return result;
    }
    catch (error) {
        console.log(error);
        return { error: "[db:deleteCategory] Went wrong.." };
    }
};
module.exports = {
    getOne,
    getAll,
    update,
    create,
    deleteOne,
};
