import { useSearchParams } from "react-router-dom";
import { PendingOrder } from "./PendingOrder";
import { useQuery } from "@tanstack/react-query";
import { getOne } from "@/api/orders";
import Loading from "../../layout/Loading";
import Error from "../../layout/Error";
import { OrderWithItems } from "@server/src/models/order";
import GoBackButton from "./GoBackButton";

export default function OrderPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data, isError, isLoading } = useQuery<OrderWithItems>({
    queryKey: ["order", id],
    queryFn: () => getOne(Number(id)),
    enabled: !!id,
  });

  if (!id) return null;
  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  return (
    <main className="md:container md:p-10 p-2">
      <GoBackButton />
      {data && <PendingOrder order={data} />}
    </main>
  );
}
