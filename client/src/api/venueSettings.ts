const BASE_URL = "/venueSettings";
import type { NewVenueSettings, VenueSettings } from "@server/src/schemas";
import $api from ".";

export const getVenueSettings = async (): Promise<VenueSettings> => {
  const response = await $api.get(BASE_URL);
  return response.data;
};
export const updateVenueSettings = async (data: NewVenueSettings) => {
  const response = await $api.put(BASE_URL, data);
  return response.data;
};
export const createVenueSettings = async (data: NewVenueSettings) => {
  const response = await $api.post(BASE_URL, data);
  return response.data;
};
