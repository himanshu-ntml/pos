import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { PersonIcon } from "@radix-ui/react-icons";

export default function TotalOrders() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">Orders</CardTitle>
        <PersonIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">235</div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          +180.1% from last month
        </p>
      </CardContent>
    </Card>
  );
}
