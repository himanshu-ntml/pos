const BASE_URL = "/table";
import type { NewTable, TableStatus } from "@server/src/schemas";
import $api from ".";

export const getAll = async (status?: TableStatus) => {
  const URL = `${BASE_URL}` + (status ? `?status=${status}` : "");
  const res = await $api.get(URL);
  return res.data;
};

export const getOne = async (id: string) => {
  const res = await $api.get(`${BASE_URL}/${id}`);
  return await res.data;
};
export const deleteOne = async (id: string) => {
  const res = await $api.delete(BASE_URL, { data: { id } });
  return await res.data;
};
export const create = async (data: NewTable) => {
  try {
    const res = await $api.post(BASE_URL, data);
    console.log("Create table : ", res);
    return res;
  } catch (error) {
    throw error;
  }
};
export const updateStatus = async (id: string, status: TableStatus) => {
  const res = await $api.put(`${BASE_URL}/${id}`, { status });
  return await res.data;
};

export const markClean = async (id: number) => {
  const res = await $api.put(`${BASE_URL}/clean/${id}`);
  return await res.data;
};
