import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DashboardIcon } from "@radix-ui/react-icons";
import { useVenueSettings } from "@/hooks/useVenueSettings";

export default function ActiveOrders() {
  const { venueTables } = useVenueSettings();
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
        <DashboardIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="grid gap-1">
          {venueTables?.map((table) => (
            <div key={table.id} className="flex items-center gap-1">
              <div className="font-bold">Table {table.number}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">2m 30s</div>

              <Button size="icon" variant="outline">
                {table.id}
                <span className="sr-only">Add</span>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
