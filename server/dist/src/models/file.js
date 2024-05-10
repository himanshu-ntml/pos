"use strict";
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../db");
const schemas_1 = require("../schemas");
const getOne = async (id) => {
    try {
        return await db_1.db.query.files.findFirst({
            where: (0, drizzle_orm_1.eq)(schemas_1.files.id, id),
        });
    }
    catch (error) {
        console.log(error);
        return { error: "[db:getOneFile] Went wrong.." };
    }
};
const getAll = async () => {
    try {
        return await db_1.db.query.files.findMany();
    }
    catch (error) {
        console.log(error);
        return { error: "[db:getManyFile] Went wrong.." };
    }
};
const update = async (id, body) => {
    try {
        return await db_1.db.update(schemas_1.files).set(body).where((0, drizzle_orm_1.eq)(schemas_1.files.id, id)).returning();
    }
    catch (error) {
        console.log(error);
        return { error: "[db:getManyFile] Went wrong.." };
    }
};
const create = async (body) => {
    try {
        return await db_1.db.insert(schemas_1.files).values(body).returning();
    }
    catch (error) {
        console.log(error);
        return { error: "[db:createFile] Went wrong.." };
    }
};
const deleteOne = async (id) => {
    try {
        const result = await db_1.db.delete(schemas_1.files).where((0, drizzle_orm_1.eq)(schemas_1.files.id, id));
        return result;
    }
    catch (error) {
        console.log(error);
        return { error: "[db:deleteFile] Went wrong.." };
    }
};
module.exports = {
    getOne,
    getAll,
    update,
    create,
    deleteOne,
};
