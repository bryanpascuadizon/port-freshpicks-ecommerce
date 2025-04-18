import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { updateCartItemQuantity } from "@/lib/actions/CartActions";
import { Loader, Minus, Plus } from "lucide-react";
import { useTransition } from "react";

const CartQuantity = ({
  quantity,
  productId,
  refetch,
}: {
  quantity: number;
  productId: string;
  refetch: () => void;
}) => {
  const [isPending, startTransistion] = useTransition();

  const handleUpdateQuantity = (type: string) => {
    startTransistion(async () => {
      const response = await updateCartItemQuantity(type, productId);

      if (response) {
        await refetch();
      }
    });
  };

  const ButtonQuantity = ({ type }: { type: string }) => {
    return (
      <Button
        disabled={isPending}
        className="green-button h-7 w-5 self-center bg-green-700  cursor-pointer"
        onClick={() => handleUpdateQuantity(type)}
      >
        {isPending ? (
          <Loader className="animate-spin" />
        ) : type === "increase" ? (
          <Plus />
        ) : (
          <Minus />
        )}
      </Button>
    );
  };
  return (
    <TableCell className="text-center">
      <div className="flex justify-center">
        <ButtonQuantity type="decrease" />
        <p className="mx-2 self-center">{quantity}</p>
        <ButtonQuantity type="increase" />
      </div>
    </TableCell>
  );
};

export default CartQuantity;
