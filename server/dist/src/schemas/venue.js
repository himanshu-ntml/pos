"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newVenueSettingsSchema = exports.venueSettingsSchema = exports.venueSettings = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
const zod_1 = require("zod");
exports.venueSettings = (0, pg_core_1.pgTable)("venue_settings", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    address: (0, pg_core_1.text)("address").notNull(),
    phone: (0, pg_core_1.text)("phone"),
    email: (0, pg_core_1.text)("email"),
    website: (0, pg_core_1.text)("website"),
    managerName: (0, pg_core_1.text)("manager_name"),
    description: (0, pg_core_1.text)("description"),
    capacity: (0, pg_core_1.integer)("capacity"),
    amenities: (0, pg_core_1.text)("amenities"),
    accessibilityInformation: (0, pg_core_1.text)("accessibility_information"),
    logo: (0, pg_core_1.text)("logo"),
    acceptCash: (0, pg_core_1.boolean)("accept_cash"),
    acceptCredit: (0, pg_core_1.boolean)("accept_credit"),
    acceptMobilePayment: (0, pg_core_1.boolean)("accept_mobile_payment"),
    alloweManagerToEditMenu: (0, pg_core_1.boolean)("allow_manager_to_edit_menu"),
    allowedChashierToRefund: (0, pg_core_1.boolean)("allowed_cashier_to_refund"),
    allowedServersToModifyOrder: (0, pg_core_1.boolean)("allowed_servers_to_modify_order"),
    serviceFee: (0, pg_core_1.integer)("service_fee"),
    createdAt: (0, pg_core_1.date)("created_at").default("now()").notNull(),
    updatedAt: (0, pg_core_1.date)("updated_at").default("now()").notNull(),
});
exports.venueSettingsSchema = (0, drizzle_zod_1.createSelectSchema)(exports.venueSettings).extend({
    serviceFee: zod_1.z.coerce.number(),
    capacity: zod_1.z.coerce.number(),
});
exports.newVenueSettingsSchema = (0, drizzle_zod_1.createSelectSchema)(exports.venueSettings);
