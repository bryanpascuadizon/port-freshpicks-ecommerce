import { Button } from "@/components/ui/button";
import { removeCartItems } from "@/lib/actions/CartActions";
import { useCartItemCount } from "@/lib/hooks/CartItemCount";
import { Loader } from "lucide-react";
import { TransitionStartFunction } from "react";

const RemoveToCartButton = ({
  isPending,
  startTransition,
  totalSelectedQuantity,
  refetch,
}: {
  isPending: boolean;
  startTransition: TransitionStartFunction;
  totalSelectedQuantity: number;
  refetch: () => void;
}) => {
  const { refetchCartItemCount } = useCartItemCount();

  const handleRemoveCartItems = () => {
    startTransition(async () => {
      const response = await removeCartItems();

      if (response) {
        await refetch();
        await refetchCartItemCount();
      }
    });
  };

  return (
    <Button
      disabled={totalSelectedQuantity === 0}
      className="green-button cursor-pointer"
      onClick={handleRemoveCartItems}
    >
      {isPending ? <Loader className="w-4 h-4 animate-spin" /> : "Remove"}
    </Button>
  );
};

export default RemoveToCartButton;
