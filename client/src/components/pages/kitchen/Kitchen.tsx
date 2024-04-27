import { DataTable } from "@/components/Data-table";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getOrderItems } from "@/api/orders";
import Loading from "@/components/layout/Loading";
import Error from "@/components/layout/Error";
import { columns } from "./columns";

export default function KitchenPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrderItems,
  });
  return (
    <main className="md:p-2">
      <Card className="p-5">
        <h1 className="text-4xl font-bold">Kitchen</h1>
        <p className="mt-2 text-gray-400">This is the kitchen page.</p>
        {isLoading && <Loading />}
        {isError && <Error message="Fail to fetch Penging orders" />}
        {data && <DataTable data={data} columns={columns} searchField="orderId" />}
      </Card>
    </main>
  );
}
