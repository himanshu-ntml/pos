import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type NewReservation, newReservationSchema } from "@server/src/schemas";
import { create } from "@/api/reservation";
import { toast } from "@/components/ui/use-toast";
import { Form } from "@/components/ui/form";

import ReservationSteps from "./ReservationSteps";

type NewReservationProps = {
  onComplete: () => void;
};

export default function NewResetvation({ onComplete }: NewReservationProps) {
  const queryClient = useQueryClient();

  const addNewReservation = useMutation({
    mutationFn: create,
    onSuccess: (data) => {
      const reservationId = data[0].id;
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
      toast({
        title: "Reservation has been created",
        description: `Reservation Number is: ${reservationId}`,
      });
      onComplete();
    },
  });
  const onSubmit = (values: NewReservation) => {
    addNewReservation.mutate(values);
  };
  const form = useForm<NewReservation>({
    resolver: zodResolver(newReservationSchema),
    defaultValues: {
      tableId: undefined,
      customerName: "",
      customerPhoneNumber: "",
      customerEmail: "",
      guestsPredictedNumber: 1,
      specialRequests: "",
      notes: "",
      scheduledAt: undefined,
      expireAt: undefined,
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <ReservationSteps form={form} />
      </form>
    </Form>
  );
}
