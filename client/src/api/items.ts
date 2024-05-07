import $api from ".";
import type { OrderItem } from "@server/src/schemas";
import { type NewItem } from "@server/src/schemas/item";

const BASE_URL = import.meta.env.VITE_API_URL + "/item";

export const getAll = async () => {
  const res = await $api.get(`${BASE_URL}`);
  return await res.data;
};

export const getOne = async (id: string) => {
  const res = await $api.get(`${BASE_URL}/${id}`);
  return await res.data;
};
export const deleteOne = async (id: string) => {
  const res = await $api.delete(`${BASE_URL}/${id}`);
  return await res.data;
};
export const create = async (data: NewItem) => {
  const res = await $api.post(BASE_URL, data);
  return await res.data;
};

type UpdateOrder = {
  id: number;
  data: OrderItem[];
};
export const update = async ({ id, data }: UpdateOrder) => {
  const res = await $api.put(`${BASE_URL}/${id}`, data);
  return await res.data;
};

export const getStopItems = async () => {
  const res = await $api.get("/item/stop-items");
  return await res.data;
};

export const addItemToStopList = async (itemId: number) => {
  const res = await $api.put(`/item/add-stop-items/${itemId}`);
  return await res.data;
};
export const removeItemFromStopList = async (itemId: number) => {
  const res = await $api.put(`/item/remove-stop-items/${itemId}`);
  return await res.data;
};
