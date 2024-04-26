import { useQuery } from "@tanstack/react-query";
import { getAll } from "@/api/tables";
import Loading from "@/components/layout/Loading";
import Error from "@/components/layout/Error";
import { Table, TableStatus } from "../../../../../server/src/schemas/table";
import { useStore } from "@/store";
import { Button } from "@/components/ui/button";
import { BrushIcon, Check } from "lucide-react";
import { Cross1Icon } from "@radix-ui/react-icons";

type ChooseTableProps = {
  close: () => void;
};
export function ChooseTable({ close }: ChooseTableProps) {
  const { setSelectedTable } = useStore();

  const { data: tables, isLoading, isError } = useQuery<Table[]>({ queryKey: ["tables"], queryFn: () => getAll() });

  const handleTableClick = (table: Table) => {
    setSelectedTable({ tableId: table.id, number: table.number });
    close();
  };
  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  const statusIcon: Record<TableStatus, React.ReactNode> = {
    available: <Check />,
    occupied: <Cross1Icon />,
    closed: <BrushIcon />,
    reserved: "🔒",
  };
  return (
    <section className="mx-auto">
      <div className="flex flex-wrap gap-4 place-content-between">
        {tables?.map((table) => (
          <Button
            variant="outline"
            disabled={table.status !== "available"}
            onClick={() => handleTableClick(table)}
            key={table.id}
            className="size-32 p-2 rounded-xl place-content-center grid cursor-pointer gap-2 border-2"
          >
            <p className="text-2xl">{table.number}</p>
            <p className="capitalize flex gap-2 items-center">
              {statusIcon[table.status]} {table.status}
            </p>
            <p>
              {table.seats}
              {table.seats === 1 ? " Seat" : " Seats"}
            </p>
          </Button>
        ))}
      </div>
    </section>
  );
}
