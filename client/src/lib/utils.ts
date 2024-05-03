import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Item as OrderItem } from "@/types";

import { Item, OrderItemsWithOrderAndItems } from "@server/src/schemas";

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

interface CombinedOrder {
  orderId: number;
  tableId: number | null;
  status: string;
  itemId: number;
  user: string | null;
  createdAt: string;
  table: number | null;
  items: { name: string; quantity: number, id: number }[];
}

export function combinedOrders(data: OrderItemsWithOrderAndItems[]): CombinedOrder[]  {
  const combinedOrderMap: { [orderId: number]: CombinedOrder } = {};

  data.forEach((orderData) => {
    const { orders, order_items, items } = orderData;
    const { orderId, itemId, quantity } = order_items;

    if (!combinedOrderMap[orderId]) {
      combinedOrderMap[orderId] = {
        orderId,
        itemId,
        createdAt: orders.createdAt,
        table: orderData.tables.number,
        user: orderData.users.name,
        tableId: orders.tableId,
        status: orders.status,
        items: [],
      };
    }

    combinedOrderMap[orderId].items.push({ name: items.name, quantity, id: items.id });
  });

  return Object.values(combinedOrderMap);
};