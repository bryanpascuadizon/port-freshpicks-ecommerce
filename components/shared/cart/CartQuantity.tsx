import { Button } from "@/components/ui/button";
import { updateCartItemQuantity } from "@/lib/actions/CartActions";
import { useCartItemCount } from "@/lib/hooks/CartItemCount";
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
  const { refetchCartItemCount } = useCartItemCount();

  const handleUpdateQuantity = (type: string) => {
    startTransistion(async () => {
      const response = await updateCartItemQuantity(type, productId);

      if (response.success) {
        await refetch();
        await refetchCartItemCount();
      }
    });
  };

  const ButtonQuantity = ({ type }: { type: string }) => {
    return (
      <Button
        disabled={isPending}
        className="green-button h-7 w-5 self-center cursor-pointer"
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
    <div className="flex md:justify-center">
      <ButtonQuantity type="decrease" />
      <p className="mx-2 self-center ml-3 mr-3">{quantity}</p>
      <ButtonQuantity type="increase" />
    </div>
  );
};

export default CartQuantity;
