import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";
import { HandCoins } from "lucide-react";
import { useState } from "react";

type TipsButtonProps = {
  setValue: (amount: string) => void;
  orderId: number;
};
export default function TipsButton({ setValue, orderId }: TipsButtonProps) {
  const [show, setShow] = useState(false);
  const [tipValue, setTipValue] = useState("");

  const handleClick = () => {
    setValue(tipValue);
    setShow(false);
    queryClient.invalidateQueries({ queryKey: ["bill", orderId] });
    setTipValue("");
  };
  const queryClient = useQueryClient();

  return (
    <>
      {show && (
        <>
          <Input onChange={(e) => setTipValue(e.target.value)} value={tipValue} autoFocus />
          {tipValue && <Button onClick={handleClick}>Submit </Button>}
        </>
      )}
      <Button onClick={() => setShow((prev) => !prev)} variant={show ? "outline" : "default"}>
        <HandCoins className="mr-1" /> Tip
      </Button>
    </>
  );
}
