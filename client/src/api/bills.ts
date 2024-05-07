import { type NewBill, type Bill } from "@server/src/schemas/bill";
import $api from ".";

const BASE_URL = import.meta.env.VITE_API_URL + "/bill";

export const getAll = async () => {
  const res = await $api.get(`${BASE_URL}`);
  return await res.data;
};
export const getAllPaid = async () => {
  const res = await $api.get(`${BASE_URL}/paid`);
  return await res.data;
};
export const getAllUnPaid = async () => {
  const res = await $api.get(`${BASE_URL}/unpaid`);
  return await res.data;
};
export const getOneByOrderId = async (orderId: number) => {
  const res = await $api.get(`${BASE_URL}/${orderId}`);
  return await res.data;
};
export const deleteOne = async (id: string) => {
  const res = await $api.delete(`${BASE_URL}/${id}`);
  return await res.data;
};
export const create = async (data: NewBill) => {
  const res = await $api.post(BASE_URL, data);
  return await res.data;
};
export const update = async (data: Bill) => {
  const res = await $api.put(BASE_URL, data);
  return await res.data;
};

export const generateBill = async (
  orderId: number,
  tipsAmount: string | null
) => {
  const res = await $api.post(`${BASE_URL}/generate/${orderId}`, {
    tipsAmount,
  });
  return await res.data;
};

export const getAllPaidThisWeek = async () => {
  const res = await $api.get(`${BASE_URL}/paid/this-week`);
  return await res.data;
};
export const getAllPaidThisMonth = async () => {
  const res = await $api.get(`${BASE_URL}/paid/this-month`);
  return await res.data;
};
