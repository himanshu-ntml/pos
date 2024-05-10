"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineItems = exports.generateTimeSlots = void 0;
const date_fns_1 = require("date-fns");
function generateTimeSlots({ openTime, closeTime, duration, interval, date, reservations, }) {
    const timeSlots = [];
    const [openTimeHours, openTimeMinutes] = openTime.split(":").map(Number);
    const [closeTimeHours, closeTimeMinutes] = closeTime.split(":").map(Number);
    const openTimeTotalMinutes = openTimeHours * 60 + openTimeMinutes;
    const closeTimeTotalMinutes = closeTimeHours * 60 + closeTimeMinutes;
    for (let minutes = openTimeTotalMinutes; minutes + duration <= closeTimeTotalMinutes; minutes += interval) {
        const hour = Math.floor(minutes / 60);
        const minute = minutes % 60;
        const start = new Date(new Date(date).setHours(hour, minute, 0));
        const finish = new Date(new Date(date).setHours(hour, minute + duration, 0));
        const startTime = (0, date_fns_1.format)(start, "HH:mm");
        const finishTime = (0, date_fns_1.format)(finish, "HH:mm");
        const isAvailable = !reservations.some((reservation) => {
            return reservation.expireAt === finishTime;
        });
        timeSlots.push({ startTime, finishTime, isAvailable });
    }
    return timeSlots;
}
exports.generateTimeSlots = generateTimeSlots;
function combineItems(existingOrderItems, addMoreItems) {
    const itemMap = new Map();
    existingOrderItems.forEach((item) => {
        const key = `${item.orderId}-${item.itemId}`;
        if (itemMap.has(key)) {
            itemMap.get(key).quantity += item.quantity;
        }
        else {
            itemMap.set(key, { ...item });
        }
    });
    if (addMoreItems) {
        addMoreItems.forEach((item) => {
            const key = `${item.orderId}-${item.itemId}`;
            if (itemMap.has(key)) {
                itemMap.get(key).quantity += item.quantity || 0;
            }
            else {
                itemMap.set(key, {
                    orderId: item?.orderId,
                    itemId: item.itemId,
                    quantity: item.quantity || 0,
                });
            }
        });
    }
    const combinedOrderItems = Array.from(itemMap.values());
    return combinedOrderItems;
}
exports.combineItems = combineItems;
