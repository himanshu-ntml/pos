import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";
import navItems from "./navItems";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Package2, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

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
                  to="#"
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
        <Sheet>
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
        </Sheet>
      </header>
    </>
  );
}
