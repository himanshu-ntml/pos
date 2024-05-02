import { useQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MenuItem from "./MenuItem";
import { type Category } from "@server/src/schemas/category";
import { type Item } from "@server/src/schemas/item";
import { getAll as getAllCategories } from "@/api/categories";
import { getAll as getAllItems } from "@/api/items";
import Loading from "../../../layout/Loading";
import Error from "../../../layout/Error";
import Cart from "../cart/Cart";

type MenuListProps = {
  closeMenu?: () => void;
};
export function MenuList({ closeMenu }: MenuListProps) {
  const {
    data: categories,
    isError: isCategoriesError,
    isLoading: isCategoriesLoading,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const {
    data: items,
    isError: isItemsError,
    isLoading: isItemsLoading,
  } = useQuery<Item[]>({ queryKey: ["items"], queryFn: getAllItems });

  if (isCategoriesLoading) return <Loading />;

  if (isCategoriesError) return <Error />;

  const getByCategory = (categoryId: number) => {
    if (!items) return;
    return items.filter((item) => item.categoryId == categoryId);
  };

  return (
    <div className="grid gap-5 grid-cols-1 md:grid-cols-4">
      <div className="col-span-2">
        <Accordion type="single" collapsible className="w-full mb-10">
          {categories?.map((category) => (
            <AccordionItem value={String(category.id)} key={category.id}>
              <AccordionTrigger className="text-3xl font-semibold">
                {category.name}
              </AccordionTrigger>
              <AccordionContent className="space-y-5">
                {isItemsError && <Error message="Cannot fetch items data" />}
                {isItemsLoading && <Loading />}
                {getByCategory(category.id)?.map((item) => (
                  <MenuItem item={item} key={item.id} />
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <div className="col-span-1 md:col-span-2  right-5 top-20">
        <Cart onComplete={closeMenu} />
      </div>
    </div>
  );
}
