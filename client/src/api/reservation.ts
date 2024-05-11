import type { NewReservation, Reservation } from "@server/src/schemas";
import $api from ".";
const BASE_URL = "/reservation";

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

export const create = async (data: NewReservation) => {
  const res = await $api.post(`${BASE_URL}`, data);
  return await res.data;
};

export const fetchTimeSlots = async (date: string, tableId?: number | null) => {
  const res = await $api.post(`${BASE_URL}/get-slots`, { tableId, date });
  return await res.data;
};

export const getUnassignedReservations = async (): Promise<Reservation[]> => {
  return await $api.get(`${BASE_URL}/not-assigned`).then((res) => res.data);
};
