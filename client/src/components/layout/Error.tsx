import { Card } from "../ui/card";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";


type ErrorProps = {
  message?: string;
};
export default function Error({ message }: ErrorProps) {
  return (
    <Card className="w-full p-10 items-center flex justify-center">
      <div className="flex items-center text-destructive/50">
        <ExclamationTriangleIcon className="w-6 h-6 mr-2" />
         {message ? message : "Something went wrong..."}
      </div>
    </Card>
  );
}
