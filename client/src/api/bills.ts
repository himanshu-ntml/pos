import { type NewBill, type Bill } from "../../../server/src/schemas/bill";

const BASE_URL = import.meta.env.VITE_API_URL + "/bill";

export const getAll = async () => {
  const res = await fetch(`${BASE_URL}`);
  return await res.json();
};
export const getAllPaid = async () => {
  const res = await fetch(`${BASE_URL}/paid`);
  return await res.json();
};
export const getAllUnPaid = async () => {
  const res = await fetch(`${BASE_URL}/unpaid`);
  return await res.json();
};
export const getOneByOrderId = async (orderId: number) => {
  const res = await fetch(`${BASE_URL}/${orderId}`);
  return await res.json();
};
export const deleteOne = async (id: string) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json;charset=utf-8" },
  });
  return await res.json();
};
export const create = async (data: NewBill) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(data),
  });
  return await res.json();
};
export const update = async (data: Bill) => {
  const res = await fetch(BASE_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const generateBill = async (orderId: number, tipsAmount: string | null) => {
  const res = await fetch(`${BASE_URL}/generate/${orderId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({ tipsAmount }),
  });
  return await res.json();
};

export const getAllPaidThisWeek = async () => {
  const res = await fetch(`${BASE_URL}/paid/this-week`);
  return await res.json();
};
export const getAllPaidThisMonth = async () => {
  const res = await fetch(`${BASE_URL}/paid/this-month`);
  return await res.json();
};