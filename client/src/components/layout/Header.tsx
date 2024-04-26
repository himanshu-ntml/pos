import SideMenu from "./navigation/SideMenu";
import NavMenu from "./navigation/NavMenu";
import { ModeToggle } from "@/components/mode-toggle";
// import SideBar from "./navigation/SideBar";

export default function Header() {
  return (
    <header className="flex items-center h-16  border-b shrink-0 md:px-6 px-2">
      <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <NavMenu />
        <ModeToggle />
        <SideMenu />
      </div>
      {/* <SideBar /> */}
    </header>
  );
}
