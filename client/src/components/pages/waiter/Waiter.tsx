import Orders from "@/components/orders/Orders";
import { Button } from "@/components/ui/button";

import { User2Icon, CheckCircle, ShoppingBasket } from "lucide-react";
import NewCustomerButton from "./SelectTable";
import TableIcon from "@/components/layout/TableIcon";
import TablesCards from "@/components/tables/TableCards";
import { useSearchParams } from "react-router-dom";

export default function Waiter() {
  const [tabName, setTabName] = useSearchParams();
  const selectedTab = tabName.get("tab");
  const userId = 1;

  const handleTabClick = (value: string) => {
    setTabName({ tab: value });
  };

  return (
    <main className="p-4 space-y-5">
      <p className="text-sm">
        Welcome back <b>user {userId}</b>
      </p>

      <div className="grid md:grid-cols-4 gap-4 grid-cols-2 items-center justify-center w-full place-content-center">
        <NewCustomerButton
          buttonTrigger={
            <Button className="h-24" size="lg" variant="outline">
              <div className="flex flex-col items-center gap-1">
                <User2Icon className="h-6 w-6" />
                <span className="text-sm font-medium leading-none">New Customers</span>
              </div>
            </Button>
          }
        />
        <Button onClick={() => handleTabClick("orders")} className="h-24" size="lg" variant="outline">
          <div className="flex flex-col items-center gap-1">
            <ShoppingBasket className="h-6 w-6" />
            <span className="text-sm font-medium leading-none">Orders</span>
          </div>
        </Button>
        <Button onClick={() => handleTabClick("completedOrders")} className="h-24" size="lg" variant="outline">
          <div className="flex flex-col items-center gap-1">
            <CheckCircle className="h-6 w-6" />
            <span className="text-sm font-medium leading-none">Completed Orders</span>
          </div>
        </Button>
        <Button onClick={() => handleTabClick("tables")} className="h-24" size="lg" variant="outline">
          <div className="flex flex-col items-center gap-1">
            <TableIcon className="h-6 w-6" />
            <span className="text-sm font-medium leading-none">Tables</span>
          </div>
        </Button>
      </div>
      {selectedTab == "orders" && <Orders orderStatus="In Progress" />}
      {selectedTab == "completedOrders" && <Orders orderStatus="Completed" />}
      {selectedTab == "tables" && <TablesCards standalone />}
    </main>
  );
}
