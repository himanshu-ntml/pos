"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notAssigned = exports.timeSlots = exports.update = exports.deleteOne = exports.create = exports.getOne = exports.getAll = void 0;
const reservation_1 = require("../schemas/reservation");
const db_1 = require("../db");
const drizzle_orm_1 = require("drizzle-orm");
const schemas_1 = require("../schemas");
const utils_1 = require("../utils");
const getAll = async () => {
    try {
        return await db_1.db.select().from(reservation_1.reservations).execute();
    }
    catch (error_1) {
        console.error(error_1);
        return { error: "[db:getAllReservation] Went wrong.." };
    }
};
exports.getAll = getAll;
const getOne = async (id) => {
    try {
        return await db_1.db.select().from(reservation_1.reservations).where((0, drizzle_orm_1.eq)(reservation_1.reservations.id, id));
    }
    catch (error_1) {
        console.error(error_1);
        return { error: "[db:getOneReservation] Went wrong.." };
    }
};
exports.getOne = getOne;
const create = async (body) => {
    try {
        return await db_1.db.insert(reservation_1.reservations).values(body).returning({ id: reservation_1.reservations.id });
    }
    catch (error_1) {
        console.error(error_1);
        return { error: "[db:createReservation] Went wrong.." };
    }
};
exports.create = create;
const deleteOne = async (id) => {
    try {
        return await db_1.db.delete(reservation_1.reservations).where((0, drizzle_orm_1.eq)(reservation_1.reservations.id, id));
    }
    catch (error_1) {
        console.error(error_1);
        return { error: "[db:deleteOneReservation] Went wrong.." };
    }
};
exports.deleteOne = deleteOne;
const update = async (body) => {
    try {
        return await db_1.db
            .update(reservation_1.reservations)
            .set(body)
            .where((0, drizzle_orm_1.eq)(reservation_1.reservations.id, body.id))
            .returning({ id: reservation_1.reservations.id });
    }
    catch (error_1) {
        console.error(error_1);
        return { error: "[db:updateReservation] Went wrong.." };
    }
};
exports.update = update;
const timeSlots = async ({ tableId, date }) => {
    try {
        const settings = await db_1.db
            .select()
            .from(schemas_1.storeSettings)
            .where((0, drizzle_orm_1.eq)(schemas_1.storeSettings.profileName, "default"));
        const bookedReservations = await db_1.db
            .select()
            .from(reservation_1.reservations)
            .where(tableId
            ? (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(reservation_1.reservations.tableId, tableId), (0, drizzle_orm_1.eq)(reservation_1.reservations.scheduledAt, date))
            : (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(reservation_1.reservations.scheduledAt, date), (0, drizzle_orm_1.isNull)(reservation_1.reservations.tableId)));
        const regularSchedule = await db_1.db.select().from(schemas_1.storeRegularSchedule);
        const { openTime, closeTime } = regularSchedule.find((item) => item.number == new Date(date).getDay());
        const interval = settings[0].reservationInterval;
        const duration = settings[0].reservationDuration;
        return (0, utils_1.generateTimeSlots)({ date, openTime, closeTime, interval, duration, reservations: bookedReservations });
    }
    catch (error) {
        console.error(error);
        return { error: "[db:generateTimeSlots] Went wrong.." };
    }
};
exports.timeSlots = timeSlots;
const notAssigned = () => {
    const date = new Date().toLocaleDateString(undefined, { day: "2-digit", month: "2-digit", year: "numeric" });
    try {
        return db_1.db
            .select()
            .from(reservation_1.reservations)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.isNull)(reservation_1.reservations.tableId), (0, drizzle_orm_1.eq)(reservation_1.reservations.scheduledAt, date)));
    }
    catch (error) {
        console.error(error);
        return { error: "[db:notAssigned] Went wrong.." };
    }
};
exports.notAssigned = notAssigned;
