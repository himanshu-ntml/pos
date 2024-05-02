import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import { OrderItems } from "./Orderitems";
import { PlusIcon } from "@radix-ui/react-icons";
import { useStore } from "@/store";

type AddItemProps = {
  fullWidth?: boolean;
  disabled?: boolean;
  orderId?: number;
  tableId?: number | null;
};
export default function AddItem({ fullWidth, disabled, orderId, tableId }: AddItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { resetItems, setActiveOrder, setSelectedTable, addSpecialRequest } = useStore();

  const handleOpenChange = (state: boolean) => {
    if (isOpen) {
      resetItems();
      setActiveOrder(null);
      setSelectedTable(null);
      addSpecialRequest("");
    }
    tableId && setSelectedTable({ tableId });
    orderId && setActiveOrder(orderId);
    setIsOpen(state);
  };
  const handleOnAddItem = () => {
    setIsOpen((prev) => !prev);
    resetItems();
    if (orderId && tableId) {
      setActiveOrder(orderId);
      setSelectedTable({ tableId });
    } else {
      setActiveOrder(null);
      setSelectedTable(null);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={disabled} className={fullWidth ? "w-full" : ""} onClick={handleOnAddItem}>
          <PlusIcon /> Add Item
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-full min-h-screen">
        <DialogHeader>
          <DialogTitle>Menu</DialogTitle>
          <DialogDescription>To create new tables feel all required fields</DialogDescription>
        </DialogHeader>
        <OrderItems onClose={() => handleOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}
