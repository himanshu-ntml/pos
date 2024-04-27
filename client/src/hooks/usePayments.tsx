import { generateBill } from "@/api/bills";
import { pay } from "@/api/payment";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NewPayment } from "@server/src/schemas";

export default function usePayments() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const makePayment = useMutation({
    mutationFn: (data: NewPayment) => pay(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast({
        title: "Payment successful",
        description: "Your payment has been processed",
      });
    },
    onError: (error) => {
      console.log("Payment failed", error);
      toast({
        title: "Payment failed",
        description: "Your payment has failed",
      });
      alert("Payment failed");
      throw error;
    },
  });

  const generate = useMutation({
    mutationFn: ({ orderId, tipsAmount }: { orderId: number; tipsAmount: string | null }) =>
      generateBill(orderId, tipsAmount),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
      return data;
    },
    onError: (error) => {
      console.error("bill error", error);
    },
  });
  return {
    makePayment: makePayment.mutate,
    generateBill: generate.mutate,
  };
}
