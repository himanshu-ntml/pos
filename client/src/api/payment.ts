import { NewPayment } from "../../../server/src/schemas";

const BASE_URL = import.meta.env.VITE_API_URL + "/payment";

export const pay = async (data: NewPayment) => {
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
};
