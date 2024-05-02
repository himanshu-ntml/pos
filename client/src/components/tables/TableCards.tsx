import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import AddTable from "./AddTable";
import { getAll } from "@/api/tables";
import Loading from "../layout/Loading";
import Error from "../layout/Error";
import TablesDialog from "./TablesDialog";
import { cn } from "@/lib/utils";
import AddReservation from "../reservations/addReservation/AddReservation";
// import { AdminMenu } from "./AdminMenu";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { useState } from "react";
import type {
  TableStatus,
  TableWithReservation,
} from "@server/src/schemas/table";
import { getUnassignedReservations } from "@/api/reservation";

type TabelsGridProps = {
  standalone?: boolean;
};

export default function TableCards({ standalone }: TabelsGridProps) {
  const [tabStatus, setTabStatus] = useState<TableStatus>();
  const { data, isLoading, isError } = useQuery<TableWithReservation[]>({
    queryKey: ["tables", tabStatus],
    queryFn: () => getAll(tabStatus),
  });
  const { data: reservations, isError: isReservationError } = useQuery({
    queryKey: ["reservations"],
    queryFn: () => getUnassignedReservations(),
  });

  if (isLoading) return <Loading />;
  if (isError || isReservationError) return <Error />;

  return (
    <Card>
      <ToggleGroup
        className="text-sm text-gray-500"
        type="single"
        value={tabStatus}
        onValueChange={(e: TableStatus) => setTabStatus(e)}
      >
        <ToggleGroupItem value="available">Available</ToggleGroupItem>
        <ToggleGroupItem value="occupied"> Occupied</ToggleGroupItem>
        <ToggleGroupItem value="reserved"> Reserved</ToggleGroupItem>
      </ToggleGroup>
      {!!reservations?.length &&
        reservations.map((reservation) => (
          <p key={reservation.id}>{reservation.expireAt}</p>
        ))}
      <CardHeader className="flex sm:flex-row items-center justify-between flex-col">
        <CardTitle className="text-xl font-semibold">Tables</CardTitle>
        <div className="flex gap-3 sm:flex-row flex-col">
          <AddReservation />
          <AddTable />
        </div>
        {/* <AdminMenu /> */}
      </CardHeader>
      <CardContent>
        {data && data?.length > 0 ? (
          <div
            className={cn(
              "grid grid-flow-row gap-3 grid-cols-1 sm:grid-cols-2",
              {
                "gird-flow-col justify-center xl:grid-cols-4  md:grid-cols-3":
                  standalone,
              }
            )}
          >
            {data.map((table) => (
              <TablesDialog key={table.id} tableData={table} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 font-sans my-10">
            No tables found
          </p>
        )}
      </CardContent>
    </Card>
  );
}
