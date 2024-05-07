import $api from ".";

const BASE_URL = import.meta.env.VITE_API_URL + "/store";

export const getStoreSettings = async () => {
  const res = await $api.get(`${BASE_URL}/settings`);
  return await res.data;
};
