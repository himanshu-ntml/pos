import { OrderWithItems } from "@server/src/models/order";
import type {
  OrderStatus,
  NewOrderWithItems,
  OrderItem,
  OrderItemsWithOrderAndItems,
} from "@server/src/schemas/order";

const BASE_URL = import.meta.env.VITE_API_URL + "/order";

export const getAll = async (status?: OrderStatus[number]) => {
  const url = `${BASE_URL}` + (status ? `?status=${status}` : "");
  const res = await fetch(url);
  return await res.json();
};
export const getPending = async (): Promise<OrderWithItems[]> => {
  const res = await fetch(`${BASE_URL}/pending`);
  return await res.json();
};
export const getOrderItems = async (): Promise<
  OrderItemsWithOrderAndItems[]
> => {
  const res = await fetch(`${BASE_URL}/orderItems`);
  return await res.json();
};
export const getOne = async (id: number) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return await res.json();
};

export const getOneByTableId = async (tableId: number) => {
  const res = await fetch(`${BASE_URL}/byTableId/${tableId}`);
  return await res.json();
};
export const deleteOne = async (id: number) => {
  const res = await fetch(BASE_URL, {
    method: "DELETE",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({ id }),
  });
  return await res.json();
};

export const create = async (data: NewOrderWithItems) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const serve = async (id: number) => {
  const res = await fetch(`${BASE_URL}/serve/${id}`, {
    method: "POST",
  });
  return await res.json();
};
export const complete = async (id: number) => {
  const res = await fetch(`${BASE_URL}/complete/${id}`, {
    method: "POST",
  });
  return await res.json();
};
export const leave = async (id: number) => {
  const res = await fetch(`${BASE_URL}/leave/${id}`, {
    method: "POST",
  });
  return await res.json();
};
export const recentCompletedOrders = async (tableId: number) => {
  const res = await fetch(`${BASE_URL}/recent/${tableId}`);
  return await res.json();
};
export const addSpecailRequest = async (orderId: number) => {
  const res = await fetch(`${BASE_URL}/addSpecialRequest/${orderId}`, {
    method: "POST",
  });
  return await res.json();
};
export const addMoreItems = async ({
  id,
  data,
}: {
  id: number;
  data: OrderItem[];
}) => {
  const res = await fetch(`${BASE_URL}/addMore/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(data),
  });
  return await res.json();
};
export const makeReady = async (id: number) => {
  const res = await fetch(`${BASE_URL}/ready/${id}`, {
    method: "POST",
  });
  return await res.json();
};

export const recentOrders = async () => {
  const res = await fetch(`${BASE_URL}/recent-orders`);
  return await res.json();
};
