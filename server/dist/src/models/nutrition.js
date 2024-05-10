"use strict";
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../db");
const schemas_1 = require("../schemas");
const getOne = async (id) => {
    try {
        return await db_1.db.query.nutritions.findFirst({
            where: (0, drizzle_orm_1.eq)(schemas_1.nutritions.id, id),
        });
    }
    catch (error) {
        console.log(error);
        return { error: "[db:getOneNutrition] Went wrong.." };
    }
};
const getAll = async () => {
    try {
        return await db_1.db.query.nutritions.findMany();
    }
    catch (error) {
        console.log(error);
        return { error: "[db:getManyNutrition] Went wrong.." };
    }
};
const update = async (id, body) => {
    try {
        return await db_1.db
            .update(schemas_1.nutritions)
            .set(body)
            .where((0, drizzle_orm_1.eq)(schemas_1.nutritions.id, id))
            .returning();
    }
    catch (error) {
        console.log(error);
        return { error: "[db:getManyNutrition] Went wrong.." };
    }
};
const create = async (body) => {
    try {
        return await db_1.db.insert(schemas_1.nutritions).values(body).returning();
    }
    catch (error) {
        console.log(error);
        return { error: "[db:createNutrition] Went wrong.." };
    }
};
const deleteOne = async (id) => {
    try {
        const result = await db_1.db.delete(schemas_1.nutritions).where((0, drizzle_orm_1.eq)(schemas_1.nutritions.id, id));
        return result;
    }
    catch (error) {
        console.log(error);
        return { error: "[db:deleteNutrition] Went wrong.." };
    }
};
module.exports = {
    getOne,
    getAll,
    update,
    create,
    deleteOne,
};
