import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Item as OrderItem } from "@/types";

import { Item } from "../../../server/src/schemas";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removeEmptyStringEntries<T>(obj: { [key: string]: T }): {
  [key: string]: T;
} {
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] === "") {
      delete obj[key];
    }
  }
  return obj;
}

export function summarizePrice(items: OrderItem[]) {
  if (!items) return null;
  return items.reduce((total, item) => total + Number(item.items.price ?? 0), 0);
}

export function summarizeOrder(items: Item[], orderId?: number) {
  const itemMap = items.reduce(
    (acc, product) => {
      acc[product.id] = acc[product.id] || { itemId: product.id, quantity: 0 };
      acc[product.id].quantity += 1;
      if (orderId) acc[product.id].orderId = orderId;
      return acc;
    },
    {} as { [key: number]: { itemId: number; quantity: number; orderId: number } },
  );

  return Object.values(itemMap);
}

export function formatFieldName(fieldName: string) {
  return fieldName.replace(/([A-Z])/g, " $1").trim();
}

export function formatCurrency(
  amount?: string | number | null,
  currency: string = "GBP",
  locale: string = "en-GB",
): string {
  if (!amount) return "";
  const amountNumber = Number(amount);
  if (isNaN(amountNumber)) return "";
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(amountNumber);
}