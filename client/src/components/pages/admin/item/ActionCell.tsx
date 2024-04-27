import { Item } from "@server/src/schemas/item";
import { CellContext } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOne } from "@/api/items";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export default function ActionCell(props: CellContext<Item, unknown>) {
  const navigate = useNavigate();
  const rowId = props.row.original.id;
  const queryClient = useQueryClient();
  const deleteItem = useMutation({
    mutationFn: deleteOne,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Item deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: (error) => {
      console.error("Action Cell", error);
      toast({
        title: "Error",
        description: "Item not deleted",
        variant: "destructive",
      });
    },
  });

  const handleDelete = () => {
    deleteItem.mutate(String(rowId));
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>View item</DropdownMenuItem>
          <DropdownMenuItem>View ingredients</DropdownMenuItem>
          <DropdownMenuItem
            className="text-yellow-500 "
            onClick={() => navigate(`/admin/items/edit?id=${rowId}`)}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-500 " onClick={handleDelete}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
