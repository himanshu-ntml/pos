import { eq } from "drizzle-orm";

import { db } from "../db";
import { type User, users } from "../schemas/user";

const getOne = async (id: number) => {
  try {
    return await db.query.users.findFirst({
      where: eq(users.id, id),
      with: { profileInfo: true },
    });
  } catch (error) {
    console.log(error);
    return { error: "[db:getOneUser] Went wrong.." };
  }
};
const getAll = async () => {
  try {
    return await db.query.users.findMany();
  } catch (error) {
    console.log(error);
    return { error: "[db:getManyUser] Went wrong.." };
  }
};
const update = async (id: number, body: User) => {
  try {
    const result = await db
      .update(users)
      .set(body)
      .where(eq(users.id, id))
      .returning();
    return result;
  } catch (error) {
    console.log(error);
    return { error: "[db:getManyUser] Went wrong.." };
  }
};

const create = async (body: User) => {
  try {
    return await db.insert(users).values(body).returning();
  } catch (error) {
    console.log(error);
    return { error: "[db:createUser] Went wrong.." };
  }
};

const deleteOne = async (id: number) => {
  try {
    const result = await db.delete(users).where(eq(users.id, id));
    return result;
  } catch (error) {
    console.log(error);
    return { error: "[db:deleteUser] Went wrong.." };
  }
};

export = { getOne, getAll, update, create, deleteOne };
