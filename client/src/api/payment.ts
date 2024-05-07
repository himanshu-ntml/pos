import type { NewPayment } from "@server/src/schemas";
import $api from ".";

const BASE_URL = import.meta.env.VITE_API_URL + "/payment";

export const pay = async (data: NewPayment) => {
  const res = await $api.post(`${BASE_URL}`, data);
  return await res.data;
};
