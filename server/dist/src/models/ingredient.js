"use strict";
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../db");
const schemas_1 = require("../schemas");
const getOne = async (id) => {
    try {
        return await db_1.db.query.ingredients.findFirst({
            where: (0, drizzle_orm_1.eq)(schemas_1.ingredients.id, id),
        });
    }
    catch (error) {
        console.log(error);
        return { error: "[db:getOneingredients] Went wrong.." };
    }
};
const getAll = async () => {
    try {
        return await db_1.db.query.ingredients.findMany();
    }
    catch (error) {
        console.log(error);
        return { error: "[db:getManyIngredient] Went wrong.." };
    }
};
const update = async (id, body) => {
    try {
        return await db_1.db.update(schemas_1.ingredients).set(body).where((0, drizzle_orm_1.eq)(schemas_1.ingredients.id, id)).returning();
    }
    catch (error) {
        console.log(error);
        return { error: "[db:getManyIngredient] Went wrong.." };
    }
};
const create = async (body) => {
    try {
        return await db_1.db.insert(schemas_1.ingredients).values(body).returning();
    }
    catch (error) {
        console.log(error);
        return { error: "[db:createIngredient] Went wrong.." };
    }
};
const deleteOne = async (id) => {
    try {
        const result = await db_1.db.delete(schemas_1.ingredients).where((0, drizzle_orm_1.eq)(schemas_1.ingredients.id, id));
        return result;
    }
    catch (error) {
        console.log(error);
        return { error: "[db:deleteIngredient] Went wrong.." };
    }
};
module.exports = {
    getOne,
    getAll,
    update,
    create,
    deleteOne,
};
