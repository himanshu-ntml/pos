import { useQuery } from "@tanstack/react-query";
import { type Item } from "@server/src/schemas/item";

import { DataTable } from "@/components/Data-table";
import Loading from "@/components/layout/Loading";
import Error from "@/components/layout/Error";
import { getAll } from "@/api/items";
import Modal from "@/components/layout/Modal";
import AddItem from "./form/AddItem";
import { columns } from "./ItemColumns";

export default function Items() {
  const { data, isLoading, isError, refetch } = useQuery<Item[]>({
    queryKey: ["items"],
    queryFn: getAll,
  });
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Error />;
  }
 
  return (
    <main className="md:container md:mt-10 p-2 ">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Menu Items</h1>
        </div>
        <Modal
          title="Add item"
          description="Here you can add new items to the menu"
          buttonText="Add Item"
        >
          <AddItem
            onClose={() => {
              refetch();
            }}
          />
        </Modal>
      </div>
      {!!data ? (
        <DataTable data={data} columns={columns} searchField="name" />
      ) : (
        <p>No items was found.</p>
      )}
    </main>
  );
}
