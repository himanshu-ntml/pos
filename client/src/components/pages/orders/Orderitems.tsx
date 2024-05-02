import { ScrollArea } from "../../ui/scroll-area";
import { MenuList } from "@/components/pages/menu/menuList/MenuList";

type OrderItemsProps = {
  onClose: () => void;
};
export function OrderItems({ onClose }: OrderItemsProps) {
  return (
    <ScrollArea className="grid gap-4 md:gap-8 bottom-0 h-[calc(100vh-100px)]">
      <MenuList closeMenu={onClose} />
    </ScrollArea>
  );
}
