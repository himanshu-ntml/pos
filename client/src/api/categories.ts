import $api from ".";

const BASE_URL = "/category";

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
export const create = async (data: any) => {
  const res = await $api.post(BASE_URL, data);
  return await res.data;
};
