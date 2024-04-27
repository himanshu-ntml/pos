import { useStore } from "@/store";
import { Button } from "../ui/button";
import { Item } from "@server/src/schemas/item";
import { useToast } from "@/components/ui/use-toast";
import { PlusIcon } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

type MenuItemProps = {
  item: Item;
};

export default function MenuItem({ item }: MenuItemProps) {
  const { toast } = useToast();
  const { addItem } = useStore();

  const handleClick = () => {
    addItem(item);

    toast({
      title: `${item.name} added to selected order`,
    });
  };
  return (
    <div className="grid gap-1 grid-cols-2">
      {item.imageUrl && (
        <img
          alt={item.name ?? "Item Image"}
          className="rounded-lg object-cover w-full aspect-[1/1]"
          height={150}
          src={item.imageUrl}
          width={150}
        />
      )}
      <div className="place-content-end justify-between flex flex-col">
        <h3 className={cn("font-semibold text-xl flex gap-2", !item.isAvailable && " text-red-400")}>
          {!item.isAvailable && <ExclamationTriangleIcon className="size-6" />}
          {item.name}
        </h3>
        <p className="text-sm leading-none">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-semibold">{formatCurrency(item.price)}</span>
          <Button variant="outline" size="sm" onClick={handleClick} disabled={!item.isAvailable}>
            <PlusIcon size="1rem" className="mr-1" /> Add to Order
          </Button>
        </div>
      </div>
    </div>
  );
}
