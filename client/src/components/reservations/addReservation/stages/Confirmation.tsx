import { Button } from "@/components/ui/button";
import { type ReservationStepsProps } from "../ReservationSteps";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatFieldName } from "@/lib/utils";

export default function Confirmation({ form }: ReservationStepsProps) {
  const fieldsName = [
    "customerName",
    "customerEmail",
    "customerPhoneNumber",
    "guestsPredictedNumber",
    "tableId",
    "specialRequests",
    "notes",
    "scheduledAt",
    "expireAt",
  ] as const;

  const fields = fieldsName.map((field) => {
    if (!form.getValues(field)) return null;
    if (field === "expireAt") {
      return (
        <div key={field} className="min-w-0 flex-auto gap-4">
          <p className="mt-1 truncate text-xs leading-5 text-gray-500 capitalize">{formatFieldName(field)}</p>
          <p className="text-sm font-semibold leading-6 text-gray-900">{form.getValues(field)}</p>
        </div>
      );
    }
    if (field === "scheduledAt") {
      return (
        <div key={field} className="min-w-0 flex-auto gap-4">
          <p className="mt-1 truncate text-xs leading-5 text-gray-500 capitalize">{formatFieldName(field)}</p>
          <p className="text-sm font-semibold leading-6 text-gray-900">{form.getValues(field)}</p>
        </div>
      );
    }
    return (
      <div key={field} className="min-w-0 flex-auto gap-4">
        <p className="mt-1 truncate text-xs leading-5 text-gray-500 capitalize">{formatFieldName(field)}</p>
        <p className="text-sm font-semibold leading-6 text-gray-900"> {form.getValues(field)}</p>
      </div>
    );
  });
  return (
    <ScrollArea className="max-h-screen">
      <div>
        <div className="flex flex-col pt-2 pb-2">
          <h1 className="text-center mb-5 font-semibold">Reservation Confirmation</h1>
          {fields}
        </div>
        <Button className="w-full" type="submit">
          Create reservation
        </Button>
      </div>
    </ScrollArea>
  );
}
