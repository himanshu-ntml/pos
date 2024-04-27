import { Link } from "react-router-dom";
import { TriangleDownIcon } from "@radix-ui/react-icons";

import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { NavigationMenuList, NavigationMenu } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import navMenuItems from "./navItems";

export default function NavMenu() {
  return (
    <div className="p-2 mx-auto w-full">
      <nav className="hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link className="flex items-center gap-2 text-lg font-semibold" to="#">
          <span className="sr-only">Resto-App</span>
        </Link>
        {navMenuItems.map((item) => (
          <Link key={item.id} className="text-gray-500 dark:text-gray-400" to={item.link}>
            {item.title}
          </Link>
        ))}
      </nav>
      <div className="flex md:hidden w-full">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <TriangleDownIcon className="size-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <NavigationMenu className="mx-auto">
              <NavigationMenuList className="grid grid-cols-3 gap-4 p-4">
                {navMenuItems.map((item) => (
                  <DialogClose
                    key={item.id}
                    asChild
                    className="flex flex-col h-24 items-center justify-center rounded-lg border dark:border-gray-700 border-gray-100 p-4 text-sm font-medium transition-colors hover:bg-gray-100/50 text-gray-800 hover:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                  >
                    <Link to={item.link} className="text-gray-400">
                      <item.icon />

                      {item.title}
                    </Link>
                  </DialogClose>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
