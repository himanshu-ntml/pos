export type Item = {
  itemId: number;
  quantity: number;
  items: {
    name: string | null;
    price: string | null;
    imageUrl: string | null;
  };
};
