import $api from ".";

const BASE_URL = "/store";

export const getStoreSettings = async () => {
  const res = await $api.get(`${BASE_URL}/settings`);
  return await res.data;
};
