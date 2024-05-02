import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Banknote, CreditCard } from "lucide-react";
import { useState } from "react";
import CashPayment from "./CashPayment";
import TipsButton from "./TipsButton";
import usePayments from "@/hooks/usePayments";
import { useQuery } from "@tanstack/react-query";
import { getOneByOrderId } from "@/api/bills";
import { BillWithPayments } from "@server/src/schemas";
import PaymentsList from "./PaymentsList";
import { ScrollArea } from "@/components/ui/scroll-area";

type PaymentButtonProps = {
  orderId: number;
  totalAmount: number;
};
type WhatComponentToShow = "cash" | "card" | "tip" | null;

export default function PaymentButton({ orderId }: PaymentButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<WhatComponentToShow>(null);
  const [tipsAmount, setTipAmount] = useState<string | null>(null);

  const { data: bills } = useQuery<BillWithPayments>({
    queryKey: ["bill", orderId],
    queryFn: () => getOneByOrderId(orderId),
    enabled: isOpen,
  });
  const { makePayment, generateBill } = usePayments();

  const handleDialogButton = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      generateBill({ orderId, tipsAmount });
    }
  };
  const handlePayment = (paymentMethod: "Cash" | "Card") => {
    if (!bills?.id) return;
    makePayment({
      billId: bills?.id,
      userId: bills.userId,
      chargedAmount: bills.totalAmount,
      paymentMethod,
      tipAmount: tipsAmount,
    });
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={handleDialogButton}>
      <AlertDialogTrigger asChild>
        <Button className="w-full">
          <Banknote className="mr-2" />
          Pay
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <h1 className="font-semibold">Choose Payment method</h1>
        {state && (
          <Button
            onClick={() => setState(null)}
            className="absolute top-5 right-5"
            variant="outline"
          >
            Back
          </Button>
        )}

        {!state && (
          <div className="flex justify-evenly">
            <Button
              onClick={() => handlePayment("Card")}
              className="size-24 flex flex-col gap-2"
              variant="outline"
            >
              <CreditCard />
              Card
            </Button>
            <Button
              onClick={() => handlePayment("Cash")}
              className="size-24 flex flex-col gap-2"
              variant="outline"
            >
              <Banknote />
              Cash
            </Button>
          </div>
        )}
        <ScrollArea className="max-h-[300px] rounded-md w-full">
          <div className="flex md:flex-row flex-col gap-5">
            {state === "cash" && <CashPayment />}
            <PaymentsList
              payments={bills?.payments}
              total={bills?.totalAmount}
              tipsAmount={tipsAmount}
            />
          </div>
        </ScrollArea>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <TipsButton setValue={setTipAmount} orderId={orderId} />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
