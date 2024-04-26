import { eq } from "drizzle-orm";

import { db } from "../db";
import { FileType, NewFile, files } from "../schemas";

const getOne = async (id: number) => {
  try {
    return await db.query.files.findFirst({
      where: eq(files.id, id),
    });
  } catch (error) {
    console.log(error);
    return { error: "[db:getOneFile] Went wrong.." };
  }
};
const getAll = async () => {
  try {
    return await db.query.files.findMany();
  } catch (error) {
    console.log(error);
    return { error: "[db:getManyFile] Went wrong.." };
  }
};
const update = async (id: number, body: FileType) => {
  try {
    return await db.update(files).set(body).where(eq(files.id, id)).returning();
  } catch (error) {
    console.log(error);
    return { error: "[db:getManyFile] Went wrong.." };
  }
};

const create = async (body: NewFile) => {
  try {
    return await db.insert(files).values(body).returning();
  } catch (error) {
    console.log(error);
    return { error: "[db:createFile] Went wrong.." };
  }
};

const deleteOne = async (id: number) => {
  try {
    const result = await db.delete(files).where(eq(files.id, id));
    return result;
  } catch (error) {
    console.log(error);
    return { error: "[db:deleteFile] Went wrong.." };
  }
};

export = {
  getOne,
  getAll,
  update,
  create,
  deleteOne,
};
