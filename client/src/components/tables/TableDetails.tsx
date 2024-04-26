import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import DisplayOrderItems from "@/components/orders/DisplayOrderItems";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Badge } from "../ui/badge";
import { OrderWithItems } from "../../../../server/src/models/order";
import { PoundSterling } from "lucide-react";

type tableDetailsProps = {
  data: OrderWithItems;
};
export default function TableDetails({ data }: tableDetailsProps) {
  return (
    <ScrollArea className="max-h-[500px] rounded-md">
      <div className="flex justify-between  p-5">
        <Badge className="border border-green-500">{data.status}</Badge>
        <Badge variant="outline">
          <PoundSterling size="10px" className="mr-1" />
          {data.isPaid ? "Paid" : "Not paid"}
        </Badge>
      </div>
      <div className="flex flex-col md:gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Items</CardTitle>
          </CardHeader>
          <CardContent>
            <DisplayOrderItems items={data.orderItems} />
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
