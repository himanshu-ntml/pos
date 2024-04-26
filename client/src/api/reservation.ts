import { NewReservation, Reservation } from "../../../server/src/schemas";
const BASE_URL = import.meta.env.VITE_API_URL + "/reservation";

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
    body: JSON.stringify({ id }),
  });
  return await res.json();
};

export const create = async (data: NewReservation) => {
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const fetchTimeSlots = async (date: string, tableId?: number | null) => {
  try {
    const res = await fetch(`${BASE_URL}/get-slots`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tableId, date }),
    });
    return await res.json();
  } catch (error) {
    console.error("Error fetching time slots:", error);
  }
};

export const getUnassignedReservations = async (): Promise<Reservation[]> => {
  return await fetch(`${BASE_URL}/not-assigned`).then((res) => res.json());
};