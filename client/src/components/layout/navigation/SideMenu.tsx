import { useState } from "react";
import { Link } from "react-router-dom";
import { adminMenuItems } from "./adminItems";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <HamburgerMenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Admin Panel</SheetTitle>
          <SheetDescription>
            This navbar only visible for super users
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          {adminMenuItems.map((item) => (
            <SheetClose key={item.title} asChild>
              <Link
                onClick={toggleMenu}
                to={item.href}
                className="flex cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <item.icon />

                <span className="ms-3">{item.title}</span>
              </Link>
            </SheetClose>
          ))}
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Close</Button>
            </SheetClose>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
