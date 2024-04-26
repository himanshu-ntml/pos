import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type NewItem,
  newItemSchema,
} from "../../../../../../../server/src/schemas/item";

import { ItemFields } from "./ItemFields";
import { Form } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { create } from "@/api/items";
import { useToast } from "@/components/ui/use-toast";
import { defaultValues } from "./defaultValues";

type AddItemProps = {
  onClose: () => void;
};

export default function AddItem({ onClose }: AddItemProps) {
  const { toast } = useToast();

  const form = useForm<NewItem>({
    resolver: zodResolver(newItemSchema),
    defaultValues,
  });
  const saveItem = useMutation({
    mutationFn: create,
    onSuccess: (data) => {
      form.reset();
      toast({
        title: `${data[0].name} successfully saved`,
        description: "Item successfully saved",
      });
      onClose();
    },
    onError: (error) => {
      console.error("Saving item went wrong", error);
      toast({
        title: "Uh oh! Something went wrong.",
      });
    },
  });
  const onSubmit = (values: NewItem) => {
    saveItem.mutate(values);
  };

  return (
    <section className="flex gap-4 flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <ItemFields form={form} />
          <Button type="submit" className="w-full">
            Save
          </Button>
          <Button
            onClick={() => form.reset()}
            type="reset"
            variant="secondary"
            className="w-full"
          >
            Clear
          </Button>
        </form>
      </Form>
    </section>
  );
}
