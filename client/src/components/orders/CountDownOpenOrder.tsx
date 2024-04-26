import { formatDistanceToNowStrict } from "date-fns";
import { ClockIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

export default function CountDownOpenOrder({ date }: { date: string }) {
  const [minustes, setMinutes] = useState<string | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newMinutes = formatDistanceToNowStrict(date, {
        addSuffix: true,
      });
      setMinutes(newMinutes);
    }, 600);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="text-right text-sm flex items-center">
      <ClockIcon className="h-6 w-6 mr-2" />

      <p>{minustes}</p>
    </div>
  );
}
