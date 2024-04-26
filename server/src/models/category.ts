import { eq } from "drizzle-orm";

import { db } from "../db";
import { Category, NewCategory, categories } from "../schemas";

const getOne = async (id: number) => {
  try {
    return await db.query.categories.findFirst({
      where: eq(categories.id, id),
    });
  } catch (error) {
    console.log(error);
    return { error: "[db:getOneCategory] Went wrong.." };
  }
};
const getAll = async () => {
  try {
    return await db.query.categories.findMany();
  } catch (error) {
    console.log(error);
    return { error: "[db:getManyCategory] Went wrong.." };
  }
};
const update = async (id: number, body: Category) => {
  try {
    return await db
      .update(categories)
      .set(body)
      .where(eq(categories.id, id))
      .returning();
  } catch (error) {
    console.log(error);
    return { error: "[db:getManyCategory] Went wrong.." };
  }
};

const create = async (body: NewCategory) => {
  try {
    return await db.insert(categories).values(body).returning();
  } catch (error) {
    console.log(error);
    return { error: "[db:createCategory] Went wrong.." };
  }
};

const deleteOne = async (id: number) => {
  try {
    const result = await db.delete(categories).where(eq(categories.id, id));
    return result;
  } catch (error) {
    console.log(error);
    return { error: "[db:deleteCategory] Went wrong.." };
  }
};

export = {
  getOne,
  getAll,
  update,
  create,
  deleteOne,
};
