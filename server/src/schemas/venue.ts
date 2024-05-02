import { text, pgTable, integer, date, serial } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";

export const venueSettings = pgTable("venue_settings", {
  id: serial("id").primaryKey(),
  address: text("address").notNull(),
  phone: text("phone"),
  email: text("email"),
  website: text("website"),
  managerName: text("manager_name"),
  description: text("description"),
  capacity: integer("capacity"),
  amenities: text("amenities"),
  accessibilityInformation: text("accessibility_information"),
  images: text("images"),
  createdAt: date("created_at").default("now()").notNull(),
  updatedAt: date("updated_at").default("now()").notNull(),
});

export const venueSettingsSchema = createSelectSchema(venueSettings);
export const newVenueSettingsSchema = createSelectSchema(venueSettings);

export type VenueSettings = typeof venueSettings.$inferSelect;
export type NewVenueSettings = typeof venueSettings.$inferInsert;
