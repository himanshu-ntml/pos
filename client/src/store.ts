import { create } from "zustand";
import { type Item } from "@server/src/schemas/item";

type SelectedTable = {
  number?: number;
  tableId: number;
} | null;

type RestaurantStore = {
  addItem: (item: Item) => void;
  selectedTable: SelectedTable;
  setSelectedTable: (table: SelectedTable | null) => void;

  items: Item[] | [];
  moreItems: Item[] | [];
  specialRequest: string | null;
  activeOrder: number | null;
  resetItems: () => void;
  setActiveOrder: (activeOrder: number | null) => void;
  addMoreItems: (items: Item[]) => void;
  addSpecialRequest: (specialRequest: string) => void;
  resetOrder: () => void;
};

export const useStore = create<RestaurantStore>((set) => ({
  addItem: (item: Item) => set((state) => ({ items: [...state.items, item] })),
  selectedTable: null,
  setSelectedTable: (selectedTable: SelectedTable) => set({ selectedTable }),

  items: [],
  moreItems: [],
  activeOrder: null,
  specialRequest: null,
  resetItems: () => set({ items: [] }),
  addSpecialRequest: (specialRequest: string) => set({ specialRequest }),
  setActiveOrder: (activeOrder: number | null) => set({ activeOrder }),
  addMoreItems: (items: Item[]) => {
    set((state) => ({ items: [...state.moreItems, ...items] }));
  },

  resetOrder: () =>
    set({
      selectedTable: null,
      items: [],
      moreItems: [],
      activeOrder: null,
      specialRequest: null,
    }),
}));
