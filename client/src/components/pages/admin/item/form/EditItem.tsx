import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getOne } from "@/api/items";
import { useNavigate } from "react-router-dom";

import { type Item, newItemSchema, type NewItem } from "@server/src/schemas";

import { Button } from "@/components/ui/button";
import { ItemFields } from "./ItemFields";
import { Form } from "@/components/ui/form";
import Loading from "@/components/layout/Loading";
import Error from "@/components/layout/Error";
import { useEffect } from "react";
import { defaultValues } from "./defaultValues";
// import { toast } from "@/components/ui/use-toast";

export default function EditItem() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();
  const {
    data,
    isLoading: isItemLoading,
    isError: isItemError,
  } = useQuery<Item>({
    queryKey: ["item", id],
    enabled: !!id,
    queryFn: async () => getOne(id!),
  });
  const form = useForm<NewItem>({
    resolver: zodResolver(newItemSchema),
    defaultValues,
  });
  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data]);

  // const updateItem = useMutation({
  //   mutationFn: update,
  //   onSuccess: () => {
  //     toast({ title: `Successfully update ${form.getValues("name")}` });
  //     navigate(-1);
  //   },
  //   onError: (error) => {
  //     console.error("error Updating item: ", error);
  //   },
  // });

  const onSubmit = (values: NewItem) => {
    if (!values.id) return;
    // add new method to for update items
    // updateItem.mutate({ id: values.id, data: values });
    console.log("SUBMITTING");
  };

  if (isItemLoading) return <Loading />;
  if (isItemError) return <Error />;
  if (!data) return <p>Item cannot be found</p>;
  return (
    <main>
      <div className="flex gap-4 flex-col container mx-auto lg:w-1/2 md:p-10 p-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <h1 className="text-xl font-bold">
                <small>Edit:</small> {data.name}
              </h1>
            </div>
            <ItemFields form={form} />

            <div>
              <Button type="submit" className="w-full">
                Save Changes
              </Button>
              <Button
                onClick={() => navigate(-1)}
                type="reset"
                variant="secondary"
                className="w-full"
              >
                Back
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
