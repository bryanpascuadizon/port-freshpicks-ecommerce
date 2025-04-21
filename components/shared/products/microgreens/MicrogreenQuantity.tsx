import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

const MicrogreenQuantity = ({
  quantity,
  handleMicrogreenQuantity,
}: {
  quantity: number;
  handleMicrogreenQuantity: (type: string) => void;
}) => {
  const ButtonQuantity = ({ type }: { type: string }) => {
    return (
      <Button
        disabled={quantity === 1 && type === "decrease"}
        className="green-button h-7 w-7 cursor-pointer"
        onClick={() => handleMicrogreenQuantity(type)}
      >
        {type === "increase" ? <Plus /> : <Minus />}
      </Button>
    );
  };
  return (
    <>
      <p>Quantity: </p>
      <div className="flex justify-center">
        <ButtonQuantity type="decrease" />
        <p className="mx-2 self-center ml-3 mr-3">{quantity}</p>
        <ButtonQuantity type="increase" />
      </div>
    </>
  );
};

export default MicrogreenQuantity;
