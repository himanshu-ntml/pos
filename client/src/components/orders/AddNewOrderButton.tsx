import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "lucide-react";
import { useStore } from "@/store";

export default function AddNewOrderButton() {
  const { resetOrder } = useStore();
  const navigate = useNavigate();

  const handleClick = () => {
    resetOrder();
    navigate("/menu");
  };
  return (
    <Button onClick={handleClick} variant="outline" size="sm">
      <PlusIcon size="1rem" className="mr-1" />
      Add New
    </Button>
  );
}
