import Tables from "@/components/tables/TableCards";

export default function TablesPage() {
  return (
    <main className="md:p-2 flex gap-5 flex-col">
      <Tables standalone={true} />
    </main>
  );
}
