import { useStore } from "@/store";
import { Button } from "../../../ui/button";
import { Item } from "@server/src/schemas/item";
import { useToast } from "@/components/ui/use-toast";
import { PlusIcon } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Separator } from "../../../ui/separator";

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
    <div className="grid gap-3 items-start grid-flow-col">
      {item.imageUrl && (
        <div className="items-center h-full flex">
          <img
            alt={item.name ?? "Item Image"}
            className="rounded-lg object-cover w-full aspect-[2/4] h-32"
            src={item.imageUrl}
          />
        </div>
      )}
      <div className="place-content-end justify-between flex flex-col">
        <h3
          className={cn(
            "font-semibold text-xl flex gap-2",
            !item.isAvailable && " text-red-400"
          )}
        >
          {!item.isAvailable && <ExclamationTriangleIcon className="size-6" />}
          {item.name}
        </h3>
        <p className="text-sm leading-none">{item.description}</p>
        <div className="flex items-end justify-between place-content-end">
          <span className="font-semibold">{formatCurrency(item.price)}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClick}
            disabled={!item.isAvailable}
          >
            <PlusIcon size="1rem" className="mr-1" /> Add to Order
          </Button>
        </div>
      </div>
      <Separator className="mt-10" />
    </div>
  );
}
