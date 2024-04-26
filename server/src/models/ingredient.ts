import { eq } from "drizzle-orm";

import { db } from "../db";
import { NewIngredient, ingredients } from "../schemas";

const getOne = async (id: number) => {
  try {
    return await db.query.ingredients.findFirst({
      where: eq(ingredients.id, id),
    });
  } catch (error) {
    console.log(error);
    return { error: "[db:getOneingredients] Went wrong.." };
  }
};
const getAll = async () => {
  try {
    return await db.query.ingredients.findMany();
  } catch (error) {
    console.log(error);
    return { error: "[db:getManyIngredient] Went wrong.." };
  }
};
const update = async (id: number, body: NewIngredient) => {
  try {
    return await db.update(ingredients).set(body).where(eq(ingredients.id, id)).returning();
  } catch (error) {
    console.log(error);
    return { error: "[db:getManyIngredient] Went wrong.." };
  }
};

const create = async (body: NewIngredient) => {
  try {
    return await db.insert(ingredients).values(body).returning();
  } catch (error) {
    console.log(error);
    return { error: "[db:createIngredient] Went wrong.." };
  }
};

const deleteOne = async (id: number) => {
  try {
    const result = await db.delete(ingredients).where(eq(ingredients.id, id));
    return result;
  } catch (error) {
    console.log(error);
    return { error: "[db:deleteIngredient] Went wrong.." };
  }
};

export = {
  getOne,
  getAll,
  update,
  create,
  deleteOne,
};
