const BASE_URL = import.meta.env.VITE_API_URL + "/category";

export const getAll = async () => {
  const res = await fetch(`${BASE_URL}`);
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
export const create = async (data: any) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(data),
  });
  return await res.json();
};
