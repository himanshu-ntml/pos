import { getAll } from "@/api/reservation";
import Error from "@/components/layout/Error";
import Loading from "@/components/layout/Loading";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Reservation } from "../../../../../server/src/schemas";
import { DataTable } from "@/components/Data-table";
import { reservationColumns } from "./reservationColumns";
import AddReservation from "../addReservation/AddReservation";

export default function Reservations() {
  const { data, isLoading, isError } = useQuery<Reservation[]>({
    queryKey: ["reservations"],
    queryFn: getAll,
  });
  if (isLoading) return <Loading />;
  if (isError) return <Error message="Fail to fetch reservations" />;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <h1 className="text-4xl font-semibold">Reservations</h1>
          <p className="mt-2 text-gray-400">This is the reservation page.</p>
        </div>
        <AddReservation />
      </CardHeader>
      <CardContent>
        {!data ? (
          <p className="text-lg text-gray-400 text-center p-4">No reservation was found</p>
        ) : (
          <DataTable data={data} columns={reservationColumns} searchField="customerName" />
        )}
      </CardContent>
    </Card>
  );
}
