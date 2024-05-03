import { Button } from "@/components/ui/button";
import { combinedOrders } from "@/lib/utils";
import { OrderItemsWithOrderAndItems } from "@server/src/schemas";
import { formatDistanceToNowStrict } from "date-fns";
import { useMemo } from "react";
import KitchenOrderItems from "./KitchenOrderItems";

type KitchenOrderDisplayProps = {
  data: OrderItemsWithOrderAndItems[];
};

export default function KitchenOrderDisplay({
  data,
}: KitchenOrderDisplayProps) {
  const ordersToDisplay = useMemo(() => combinedOrders(data), []);

  return (
    <div className="flex flex-col gap-4 mt-10">
      {ordersToDisplay?.map((order) => (
        <div key={order.orderId} className="bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between orders-center mb-2">
            <span className="text-lg font-semibold">Order {order.orderId}</span>
          </div>
          <div className="flex justify-between">
            <div className="text-sm text-gray-500">
              <p>
                <b>Waiter:</b> {order.user}
              </p>
              <p>
                <b>Ordered at: </b>
                {formatDistanceToNowStrict(order.createdAt, {
                  addSuffix: true,
                })}
              </p>
              <span className="text-sm text-gray-500">
                {order.table ? (
                  <p>
                    <b>Table</b> {order.table}
                  </p>
                ) : (
                  <p>Take Away</p>
                )}
              </span>
            </div>
            <Button>Order Ready</Button>
          </div>

          <hr className="my-2" />
          <KitchenOrderItems items={order.items} orderId={order.orderId} />
        </div>
      ))}
    </div>
  );
}
