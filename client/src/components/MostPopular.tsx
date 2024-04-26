import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DashboardIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

export default function MostPopular() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">Most Popular</CardTitle>
        <DashboardIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            alt="Espresso"
            className="rounded-lg"
            height="64"
            src="/img/qr-code.png"
            style={{
              aspectRatio: "64/64",
              objectFit: "cover",
            }}
            width="64"
          />
          <div className="flex flex-col">
            <h3 className="font-bold">Espresso</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">100 sold</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <Button variant="outline" className="scale-75">
            Add to Order
          </Button>
          <Button variant="outline" className="scale-75">
            Pay Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
