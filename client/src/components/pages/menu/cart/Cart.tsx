import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ClockIcon } from "@radix-ui/react-icons";

import { useStore } from "@/store";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { CloseCartDialog } from "../CloseCartDialog";
import CartItems from "./CartItems";
import SelectTable from "../../waiter/SelectTable";
import { useToast } from "@/components/ui/use-toast";
import { create, addMoreItems } from "@/api/orders";
import { useNavigate } from "react-router-dom";
import { summarizeOrder } from "@/lib/utils";
import { Edit2, Trash2Icon, Utensils } from "lucide-react";
import TableIcon from "@/components/layout/navigation/TableIcon";

type CartProps = {
  onComplete?: () => void;
};
export default function Cart({ onComplete }: CartProps) {
  const { selectedTable, setActiveOrder, items, setSelectedTable, resetItems, activeOrder, specialRequest } =
    useStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const userId = 1; // just for test now

  const queryClient = useQueryClient();

  const saveOrder = useMutation({
    mutationFn: create,
    onSuccess: ({ orderId }) => {
      toast({
        title: `Order number ${orderId} successfully saved`,
      });
      setSelectedTable(null);
      resetItems();
      navigate(`/order?id=${orderId}`);
      onComplete && onComplete();
    },
    onError: (error) => {
      toast({ title: "Error saving order", variant: "destructive" });
      console.error(error);
    },
  });
  const addMoreItemsToOrder = useMutation({
    mutationFn: addMoreItems,
    onSuccess: ({ orderId }) => {
      toast({ title: "Order successfully updated" });
      setActiveOrder(null);
      resetItems();
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["order"] }),
        queryClient.invalidateQueries({ queryKey: ["tables"] }),
        queryClient.invalidateQueries({ queryKey: ["orders"] }),
      ]);
      setSelectedTable(null);
      navigate(`/order?id=${orderId}`);
      onComplete && onComplete();
    },
    onError: (error) => {
      toast({ title: "Error updating order", variant: "destructive" });
      console.error(error);
    },
  });
  const handleSubmitOrder = () => {
    if (activeOrder) {
      const summerize = summarizeOrder(items, activeOrder);
      addMoreItemsToOrder.mutate({ id: activeOrder, data: summerize });
    } else {
      const summerize = summarizeOrder(items);
      saveOrder.mutate({
        items: summerize,
        tableId: selectedTable?.tableId,
        userId, // TODO: should be assigned on backend
        specialRequest,
      });
    }
  };
  if (!selectedTable && !items.length) return null;
  if (selectedTable && !items.length) {
    return (
      <AlertDialog>
        <Card>
          <CardContent className=" border-none text-base mt-auto flex gap-2 items-center">
            <TableIcon className="size-8 dark:text-gray-400" />
            <CardTitle className="text-base mt-auto">{`Table  ${selectedTable.number || selectedTable.tableId} selected `}</CardTitle>
            <AlertDialogTrigger asChild>
              <Button className="ml-auto bg-red-500" size="icon">
                <Trash2Icon className="size-4" />
              </Button>
            </AlertDialogTrigger>
          </CardContent>
        </Card>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm table removal?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => setSelectedTable(null)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Card className="max-w-full">
      <CardHeader>
        {activeOrder && (
          <>
            <CardTitle className="flex items-center">
              <Utensils size="1rem" className="mr-2" />
              Order #{activeOrder}
            </CardTitle>
            <CardDescription>Ready for pickup. Please deliver to the customer in 5 minutes.</CardDescription>
          </>
        )}
      </CardHeader>
      <CardContent className="grid gap-4">
        {!activeOrder && selectedTable?.tableId && (
          <div className="flex items-center gap-4">
            <ClockIcon className="h-6 w-6" />
            <div className="grid gap-1 text-sm">
              <div className="flex gap-2 items-center">
                <p className="font-semibold">Table #{selectedTable.number}</p>
                <SelectTable buttonTrigger={<Edit2 size="1rem" />} />
              </div>
              {specialRequest && (
                <p className="text-sm text-gray-500 dark:text-gray-400">Special requests: {specialRequest}</p>
              )}
            </div>
          </div>
        )}

        {!activeOrder && !selectedTable?.tableId && (
          <SelectTable
            buttonTrigger={
              <Button size="sm" className="items-center font-semibold" variant="link">
                <TableIcon className="mr-2 size-5" /> Select table
              </Button>
            }
          />
        )}

        <CartItems items={items} />
      </CardContent>
      <CardFooter className="flex justify-center p-4 flex-col gap-4">
        {/* <AddSpecialRequest orderId={activeOrder} /> */}
        <div className="flex w-full gap-5">
          <CloseCartDialog />
          <Button
            onClick={handleSubmitOrder}
            disabled={saveOrder.isPending || addMoreItemsToOrder.isPending}
            className="w-full"
          >
            Proceed
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
