const BASE_URL = import.meta.env.VITE_API_URL + "/table";
import { NewTable, TableStatus } from "../../../server/src/schemas";

export const getAll = async (status?: TableStatus) => {
  const URL = `${BASE_URL}` + (status ? `?status=${status}` : "");
  const res = await fetch(URL);
  return await res.json();
};

export const getOne = async (id: string) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return await res.json();
};
export const deleteOne = async (id: string) => {
  const res = await fetch(BASE_URL, {
    method: "DELETE",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({ id }),
  });
  return await res.json();
};
export const create = async (data: NewTable) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      if (res.status === 409) throw new Error("Table already exists");
      throw new Error(`HTTP error ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    throw error;
  }
};
export const updateStatus = async (id: string, status: TableStatus) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify({ status }),
  });
  return await res.json();
};

export const markClean = async (id: number) => {
  const res = await fetch(`${BASE_URL}/clean/${id}`, {
    method: "PUT",
  });
  return await res.json();
};