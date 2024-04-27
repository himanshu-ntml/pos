import { useMutation, useQuery } from "@tanstack/react-query";
import RecentOrders from "./RecentOrders";
import { recentCompletedOrders } from "@/api/orders";
import { Order } from "@server/src/schemas";
import Error from "../layout/Error";
import { Button } from "../ui/button";
import { markClean } from "@/api/tables";
import { useToast } from "../ui/use-toast";
import { useStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "lucide-react";

type EmptytableProps = { tableId: number; clean: boolean; tableNumber: number };

export default function EmptyTable({ tableId, clean, tableNumber }: EmptytableProps) {
  const { toast } = useToast();
  const { setSelectedTable } = useStore();

  const navigate = useNavigate();
  
  const { data, isLoading, isError } = useQuery<Order[]>({
    queryKey: ["table", tableId],
    queryFn: () => recentCompletedOrders(tableId),
  });
  const makeClean = useMutation({
    mutationFn: () => markClean(tableId),
    onSuccess: () => toast({ title: "Table marked as clean" }),
    onError: (error) => {
      console.error("Mark table as clean went wrong..", error);
      toast({ title: "Something went wrong...", variant: "destructive" });
    },
  });

  const handleAddNewOrder = () => {
    setSelectedTable({ tableId, number: tableNumber });
    navigate(`/menu?tableId=${tableId}`);
  };
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <Error message="Error fetching Recent Orders" />;

  return (
    <div className="flex flex-col gap-4">
      <div className="my-4 flex justify-evenly items-center">
        <p>Table: {clean ? <b>Clean</b> : <b>Require cleaning</b>}</p>
        <Button variant="outline" onClick={handleAddNewOrder} size="sm">
          <PlusIcon className="mr-1" /> New Order
        </Button>
      </div>
      {!!data?.length ? (
        <RecentOrders data={data} />
      ) : (
        <p className="text-md text-center text-gray-500">No recent orders are available to display at this time.</p>
      )}
      {!clean && (
        <Button variant="outline" onClick={() => makeClean.mutate()} size="sm">
          Mark as clean
        </Button>
      )}
    </div>
  );
}
