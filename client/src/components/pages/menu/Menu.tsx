import { MenuList } from "@/components/foodMenu/MenuList";
// import GoBackButton from "@/components/orders/GoBackButton";

export default function MenuPage() {
  return (
    <section className="w-full py-12 grid grid-flow-row ">
      <div className="md:container px-4 md:px-6 grid gap-8">
        {/* <GoBackButton /> */}
        <div className="items-start md:items-center gap-4 md:gap-8 justify-between">
          <div className="grid gap-1 col-span-1">
            <h1 className="text-3xl font-bold tracking-tight">Menu</h1>
            <p className="text-gray-500 dark:text-gray-400">Smile and make customers feel homey</p>
          </div>
        </div>
        <MenuList />
      </div>
    </section>
  );
}
