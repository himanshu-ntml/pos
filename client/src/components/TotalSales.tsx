import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function TotalSales() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
        <p className="w-4 h-4 text-gray-500 dark:text-gray-400">£</p>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">£12,345.67</div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          +20.1% from last month
        </p>
      </CardContent>
    </Card>
  );
}
