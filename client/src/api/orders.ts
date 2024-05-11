import type { OrderWithItems } from "@server/src/models/order";
import type {
  OrderStatus,
  NewOrderWithItems,
  OrderItem,
  OrderItemsWithOrderAndItems,
} from "@server/src/schemas/order";
import $api from ".";

const BASE_URL = "/order";

export const getAll = async (status?: OrderStatus[number]) => {
  const url = `${BASE_URL}` + (status ? `?status=${status}` : "");
  const { data } = await $api.get(url);
  return data;
};
export const getPending = async (): Promise<OrderWithItems[]> => {
  const res = await $api.get(`${BASE_URL}/pending`);
  return await res.data;
};
export const getOrderItems = async (): Promise<
  OrderItemsWithOrderAndItems[]
> => {
  const res = await $api.get(`${BASE_URL}/orderItems`);
  return await res.data;
};
export const getOne = async (id: number) => {
  const res = await $api.get(`${BASE_URL}/${id}`);
  return await res.data;
};

export const getOneByTableId = async (tableId: number) => {
  const res = await $api.get(`${BASE_URL}/byTableId/${tableId}`);
  return await res.data;
};
export const deleteOne = async (id: number) => {
  const res = await $api.delete(`${BASE_URL}/${id}`);
  return await res.data;
};

export const create = async (data: NewOrderWithItems) => {
  const res = await $api.post(BASE_URL, data);
  return await res.data;
};

export const serve = async (id: number) => {
  const res = await $api.post(`${BASE_URL}/serve/${id}`);
  return await res.data;
};
export const complete = async (id: number) => {
  const res = await $api.post(`${BASE_URL}/complete/${id}`);
  return await res.data;
};
export const leave = async (id: number) => {
  const res = await $api.post(`${BASE_URL}/leave/${id}`);
  return await res.data;
};
export const recentCompletedOrders = async (tableId: number) => {
  const res = await $api.get(`${BASE_URL}/recent/${tableId}`);
  return await res.data;
};
export const addSpecailRequest = async (orderId: number) => {
  const res = await $api.post(`${BASE_URL}/addSpecialRequest/${orderId}`);
  return await res.data;
};
export const addMoreItems = async ({
  id,
  data,
}: {
  id: number;
  data: OrderItem[];
}) => {
  const res = await $api.put(`${BASE_URL}/addMore/${id}`, data);
  return await res.data;
};
export const makeReady = async (orderId: number, itemId: number) => {
  const res = await $api.post(`${BASE_URL}/ready`, { itemId, orderId });
  return await res.data;
};

export const recentOrders = async () => {
  const res = await $api.get(`${BASE_URL}/recent-orders`);
  return await res.data;
};
