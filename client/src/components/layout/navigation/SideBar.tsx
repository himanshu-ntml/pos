import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";
import navItems from "./navItems";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function SideBar() {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <TooltipProvider>
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
            {navItems.map((navItem) => (
              <Tooltip key={navItem.id}>
                <TooltipTrigger asChild>
                  <Link
                    to={navItem.link}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <navItem.icon className="h-5 w-5" />
                    <span className="sr-only">{navItem.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{navItem.title}</TooltipContent>
              </Tooltip>
            ))}
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/admin/settings"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </nav>
        </TooltipProvider>
      </aside>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        {/* <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                to="#"
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
              >
                <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">Resto App</span>
              </Link>
              {navItems.map((navItem) => (
                <SheetTrigger asChild key={navItem.id}>
                  <Link
                    to={navItem.link}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <navItem.icon className="h-5 w-5" />
                    {navItem.title}
                  </Link>
                </SheetTrigger>
              ))}
            </nav>
          </SheetContent>
        </Sheet> */}
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
                  {navItems.map((item) => (
                    <DialogClose
                      key={item.id}
                      asChild
                      className="flex flex-col h-24 items-center justify-center rounded-lg border dark:border-gray-700 border-gray-100 p-4 text-sm font-medium transition-colors hover:bg-gray-100/50 text-gray-800 hover:text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                    >
                      <Link to={item.link} className="text-gray-400">
                        <item.icon className="h-5 w-5" />

                        {item.title}
                      </Link>
                    </DialogClose>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </DialogContent>
          </Dialog>
        </div>
      </header>
    </>
  );
}
