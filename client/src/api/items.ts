import $api from ".";
import { OrderItem } from "../../../server/src/schemas";
import { type NewItem } from "../../../server/src/schemas/item";

const BASE_URL = import.meta.env.VITE_API_URL + "/item";

export const getAll = async () => {
  const res = await fetch(`${BASE_URL}`);
  return await res.json();
};

export const getOne = async (id: string) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return await res.json();
};
export const deleteOne = async (id: string) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json;charset=utf-8" },
  });
  return await res.json();
};
export const create = async (data: NewItem) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(data),
  });
  return await res.json();
};

type UpdateOrder = {
  id: number;
  data: OrderItem[];
};
export const update = async ({ id, data }: UpdateOrder) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(data),
  });
  return await res.json();
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
