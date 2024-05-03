import { format } from "date-fns";
import { SignJWT, jwtVerify } from "jose";

import { NewOrderItem, OrderItem, Reservation } from "./schemas";
export type ReservationTimeSlot = {
  startTime: string;
  finishTime: string;
  isAvailable: boolean;
};

type GenerateTimeSlots = {
  openTime: string;
  closeTime: string;
  duration: number;
  interval: number;
  date: string;
  reservations: Reservation[];
};
export function generateTimeSlots({ openTime, closeTime, duration, interval, date, reservations }: GenerateTimeSlots) {
  const timeSlots: ReservationTimeSlot[] = [];

  const [openTimeHours, openTimeMinutes] = openTime.split(":").map(Number);
  const [closeTimeHours, closeTimeMinutes] = closeTime.split(":").map(Number);

  const openTimeTotalMinutes = openTimeHours * 60 + openTimeMinutes;
  const closeTimeTotalMinutes = closeTimeHours * 60 + closeTimeMinutes;

  for (let minutes = openTimeTotalMinutes; minutes + duration <= closeTimeTotalMinutes; minutes += interval) {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    const start = new Date(new Date(date).setHours(hour, minute, 0));
    const finish = new Date(new Date(date).setHours(hour, minute + duration, 0));
    const startTime = format(start, "HH:mm");
    const finishTime = format(finish, "HH:mm");

    const isAvailable = !reservations.some((reservation) => {
      return reservation.expireAt === finishTime;
    });

    timeSlots.push({ startTime, finishTime, isAvailable });
  }

  return timeSlots;
}

export function combineItems(existingOrderItems: OrderItem[], addMoreItems?: NewOrderItem[]): OrderItem[] {
  const itemMap = new Map<string, OrderItem>();

  existingOrderItems.forEach((item) => {
    const key = `${item.orderId}-${item.itemId}`;
    if (itemMap.has(key)) {
      itemMap.get(key)!.quantity += item.quantity;
    } else {
      itemMap.set(key, { ...item });
    }
  });

  if (addMoreItems) {
    addMoreItems.forEach((item) => {
      const key = `${item.orderId}-${item.itemId}`;
      if (itemMap.has(key)) {
        itemMap.get(key)!.quantity += item.quantity || 0;
      } else {
        itemMap.set(key, { orderId: item.orderId, itemId: item.itemId, quantity: item.quantity || 0 });
      }
    });
  }
  const combinedOrderItems = Array.from(itemMap.values());

  return combinedOrderItems;
}

const AUTH_SECRET = process.env.AUTH_SECRET;

const key = new TextEncoder().encode(AUTH_SECRET);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}
