"use strict";
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../db");
const user_1 = require("../schemas/user");
const getOne = async (id) => {
    try {
        return await db_1.db.query.users.findFirst({
            where: (0, drizzle_orm_1.eq)(user_1.users.id, id),
            with: { profileInfo: true },
        });
    }
    catch (error) {
        console.log(error);
        return { error: "[db:getOneUser] Went wrong.." };
    }
};
const getAll = async () => {
    try {
        return await db_1.db.query.users.findMany();
    }
    catch (error) {
        console.log(error);
        return { error: "[db:getManyUser] Went wrong.." };
    }
};
const update = async (id, body) => {
    try {
        const result = await db_1.db
            .update(user_1.users)
            .set(body)
            .where((0, drizzle_orm_1.eq)(user_1.users.id, id))
            .returning();
        return result;
    }
    catch (error) {
        console.log(error);
        return { error: "[db:getManyUser] Went wrong.." };
    }
};
const create = async (body) => {
    try {
        return await db_1.db.insert(user_1.users).values(body).returning();
    }
    catch (error) {
        console.log(error);
        return { error: "[db:createUser] Went wrong.." };
    }
};
const deleteOne = async (id) => {
    try {
        const result = await db_1.db.delete(user_1.users).where((0, drizzle_orm_1.eq)(user_1.users.id, id));
        return result;
    }
    catch (error) {
        console.log(error);
        return { error: "[db:deleteUser] Went wrong.." };
    }
};
module.exports = { getOne, getAll, update, create, deleteOne };
