import { Link } from "react-router-dom";
import type { OrderWithUserAndBill } from "@server/src/schemas";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { formatCurrency } from "@/lib/utils";

type RecentOrdersProps = {
  data: OrderWithUserAndBill[];
};
export default function RecentOrders({ data }: RecentOrdersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>
          Here are the most recent orders from your customers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Employee Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Link
                    className="font-medium underline"
                    to={`/order?id=${order.id}`}
                  >
                    #{order.id}
                  </Link>
                </TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{formatCurrency(order.bill.totalAmount)}</TableCell>
                <TableCell>{order.user.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
