import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useQuery } from "@tanstack/react-query";
import { getAll } from "@/api/orders";
import Loading from "../layout/Loading";
import Error from "../layout/Error";
import { PendingOrder } from "./PendingOrder";
import { cn } from "@/lib/utils";
import { OrderStatus } from "../../../../server/src/schemas";
import { OrderWithItems } from "../../../../server/src/models/order";
import { Button } from "../ui/button";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import AddNewOrderButton from "./AddNewOrderButton";

type OrderProps = {
  max?: number;
  orderStatus?: OrderStatus[number];
};
export default function Orders({ max, orderStatus }: OrderProps) {
  const [status, setStatus] = useState<OrderStatus[number] | undefined>(orderStatus);
  //TODO: make api requiest with limit and offset

  const [showMore, setShowMore] = useState(false);
  const { data, isError, isLoading } = useQuery<OrderWithItems[]>({
    queryKey: ["orders", status],
    queryFn: () => getAll(status),
  });
  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  const total = data?.length;
  const displayData = max ? (showMore ? data : data?.slice(0, max)) : data;
  return (
    <Card>
      <ToggleGroup type="single" value={status} onValueChange={(e: OrderStatus[number]) => setStatus(e)}>
        <ToggleGroupItem value="Ready">Ready</ToggleGroupItem>
        <ToggleGroupItem value="In Progress"> In Progress</ToggleGroupItem>
        <ToggleGroupItem value="Served"> Served</ToggleGroupItem>
        <ToggleGroupItem value="Completed"> Completed</ToggleGroupItem>
      </ToggleGroup>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-xl font-semibold">Orders {status}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-4xl font-bold">{total}</div>

          <AddNewOrderButton />
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400">+180.1% from last month</p>
        <div className="mt-4">
          {displayData && displayData.length > 0 ? (
            <div
              className={cn("grid  gap-4 lg:justify-between", max ? "grid-cols-1" : "md:grid-cols-2 xl:grid-cols-3")}
            >
              {displayData.map((order) => order && <PendingOrder key={order.id} order={order} />)}
            </div>
          ) : (
            <p className="text-center text-gray-600 font-sans my-10">No orders found</p>
          )}
        </div>
      </CardContent>
      {displayData && displayData?.length > 1 && !!max && (
        <div key="show more" className="p-5 flex justify-center">
          <Button onClick={() => setShowMore((prev) => !prev)} className="w-full" variant="link">
            Show more
          </Button>
        </div>
      )}
    </Card>
  );
}
