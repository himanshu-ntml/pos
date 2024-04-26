import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { CardStackIcon } from "@radix-ui/react-icons";

export default function ReportCards() {
  return (
    <div className="flex gap-2 flex-col">
      <div className="grid  grid-cols-1 md:grid-cols-2 gap-x-2">
        <Card>
          <CardHeader>
            <CardTitle>Daily Sales Summary</CardTitle>
            <CardDescription>Today's sales snapshot</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
              <div className="flex flex-row items-center gap-2">
                <CardStackIcon className="w-4 h-4 mr-1.5" />
                <span>Credit Card</span>
                <span className="ml-auto font-semibold">£1,234.00</span>
              </div>
              <div className="flex flex-row items-center gap-2">
                <p className="w-4 h-4 mr-1.5">£</p>
                <span>Cash</span>
                <span className="ml-auto font-semibold">£1,234.00</span>
              </div>
              <div className="flex flex-row items-center gap-2">
                <CardStackIcon className="w-4 h-4 mr-1.5" />
                <span>Credit Card</span>
                <span className="ml-auto font-semibold">£1,234.00</span>
              </div>
              <div className="flex flex-row items-center gap-2">
                <CardStackIcon className="w-4 h-4 mr-1.5" />
                <span>Credit Card</span>
                <span className="ml-auto font-semibold">£1,234.00</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Items</CardTitle>
            <CardDescription>Most popular items</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
              <div className="flex flex-row items-center gap-2">
                <span>1. Cheeseburger</span>
                <span className="ml-auto font-semibold">100</span>
              </div>
              <div className="flex flex-row items-center gap-2">
                <span>2. Fries</span>
                <span className="ml-auto font-semibold">90</span>
              </div>
              <div className="flex flex-row items-center gap-2">
                <span>3. Milkshake</span>
                <span className="ml-auto font-semibold">80</span>
              </div>
              <div className="flex flex-row items-center gap-2">
                <span>4. Salad</span>
                <span className="ml-auto font-semibold">70</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Breakdown</CardTitle>
          <CardDescription>Breakdown by categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
            <div className="flex flex-row items-center gap-2">
              <span>Food</span>
              <span className="ml-auto font-semibold">£1,000.00</span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <span>Drinks</span>
              <span className="ml-auto font-semibold">£500.00</span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <span>Deserts</span>
              <span className="ml-auto font-semibold">£300.00</span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <span>Others</span>
              <span className="ml-auto font-semibold">£200.00</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Sales Trend</CardTitle>
          <CardDescription>Sales trend over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Contant</p>
        </CardContent>
      </Card>
    </div>
  );
}
