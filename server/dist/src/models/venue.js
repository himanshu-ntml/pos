"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSettings = exports.updateSettings = exports.getSettings = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../db");
const schemas_1 = require("../schemas");
const getSettings = async () => {
    try {
        return await db_1.db.query.venueSettings.findFirst();
    }
    catch (error) {
        console.log(error);
        return { error: "[db:getVenueSettings] Went wrong.." };
    }
};
exports.getSettings = getSettings;
const updateSettings = async (data) => {
    try {
        return await db_1.db
            .update(schemas_1.venueSettings)
            .set({ ...data, updatedAt: new Date().toDateString() })
            .where((0, drizzle_orm_1.eq)(schemas_1.venueSettings.id, data.id))
            .returning();
    }
    catch (error) {
        console.log(error);
        return { error: "[db:updateVenueSettings] Went wrong.." };
    }
};
exports.updateSettings = updateSettings;
const createSettings = async (data) => {
    try {
        return await db_1.db.insert(schemas_1.venueSettings).values(data).returning();
    }
    catch (error) {
        console.log(error);
        return { error: "[db:createVenueSettings] Went wrong.." };
    }
};
exports.createSettings = createSettings;
