import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  // type Item,
  // type NewItem,
  type Category,
} from "../../../../../../../server/src/schemas";
import { UseFormReturn } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { getAll } from "@/api/categories";
// import Loading from "@/components/layout/Loading";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
// import Error from "@/components/layout/Error";
import UploadFile from "./UploadFile";

type ItemFieldsProps = {
  form: UseFormReturn<any>;
};

export function ItemFields({ form }: ItemFieldsProps) {
    const { data: categories } = useQuery<Category[]>({queryKey: ["categories"], queryFn: getAll});
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input {...field} placeholder="type here..." />
            </FormControl>
            <FormDescription>This is item public display name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="type here..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input
                type="number"
                step="0.1"
                placeholder="type here..."
                value={field.value}
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <UploadFile form={form} />
      <FormField
        control={form.control}
        name="categoryId"
        defaultValue={form.getValues("categoryId")}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
              <Select onValueChange={(e) => field.onChange(Number(e))} value={String(field.value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={String(category.id)}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="preparationTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preparation time</FormLabel>

            <FormControl>
              <Input placeholder="type here..." value={field.value} onChange={field.onChange} type="number" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-flow-col">
        <FormField
          control={form.control}
          name="isVegan"
          render={({ field }) => (
            <FormItem className="space-x-2 items-center">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>Vegan</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isGlutenFree"
          render={({ field }) => (
            <FormItem className="space-x-2 items-center">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>Gluten Free</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isVegetarian"
          render={({ field }) => (
            <FormItem className="space-x-2">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>Vegetarian</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isSpicy"
          render={({ field }) => (
            <FormItem className="space-x-2">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>Spicy</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
