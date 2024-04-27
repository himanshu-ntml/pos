import type { Reservation, Table, User } from "../../../server/src/schemas";

export type Item = {
  itemId: number;
  quantity: number;
  items: {
    name: string | null;
    price: string | null;
    imageUrl: string | null;
  };
};
export interface TableProps extends Table {
  reservations: Reservation[];
  user: User;
}

export type PaymentProps = {
  onSubmit?: (amount: number) => void;
  onCancel?: () => void;
  paymentAmout?: number;
  orderId: number;
};
