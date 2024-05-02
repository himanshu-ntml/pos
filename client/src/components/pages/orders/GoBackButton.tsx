import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { ArrowLeft } from "lucide-react";

export default function GoBackButton() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="md:my-5 my-2">
      <Button size="icon" variant="outline" onClick={handleGoBack}>
        <ArrowLeft size="1rem" />
      </Button>
    </div>
  );
}
