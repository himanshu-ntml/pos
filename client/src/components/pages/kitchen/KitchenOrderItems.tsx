import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useState } from "react";

type Item = {
  name: string;
  quantity: number;
  id: number;
};

type KitchenOrderItemsProps = {
  items: Item[];
  orderId: number;
};
export default function KitchenOrderItems({ items }: KitchenOrderItemsProps) {
  const [checked, setChecked] = useState<number[]>([]);

  const handleChecked = (e: CheckedState, itemId: number) => {
    if (e) {
      setChecked((prev) => [...prev, itemId]);
    } else {
      setChecked((prev) => prev.filter((id) => id !== itemId));
    }
  };

  return (
    <ul>
      {items.map((item) => (
        <li
          key={item.name}
          className={cn(
            "flex justify-between p-2 items-center",
            checked?.includes(item.id) && "backdrop-brightness-95 rounded-md"
          )}
        >
          <span>{item.name}</span>
          <div className="flex gap-4  p-2 items-center">
            <span className="text-gray-500">x{item.quantity}</span>
            <Checkbox
              className="size-10 accent-emerald-50"
              onCheckedChange={(checked) => handleChecked(checked, item.id)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
