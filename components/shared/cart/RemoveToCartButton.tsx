import { Button } from "@/components/ui/button";
import { removeCartItems } from "@/lib/actions/CartActions";
import { useCartItemCount } from "@/lib/hooks/CartItemCount";
import { useTransition } from "react";
import { toast } from "sonner";
import ButtonLoader from "../ButtonLoader";

const RemoveToCartButton = ({
  totalSelectedQuantity,
  refetch,
}: {
  totalSelectedQuantity: number;
  refetch: () => void;
}) => {
  const [isPending, startTransition] = useTransition();
  const { refetchCartItemCount } = useCartItemCount();

  const handleRemoveCartItems = () => {
    if (totalSelectedQuantity === 0) {
      toast(
        <p className="toast-text text-destructive">
          Include items in your cart for removing multiple items
        </p>
      );

      return;
    }

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
      disabled={isPending}
      className="button green-button cursor-pointer"
      onClick={handleRemoveCartItems}
    >
      {isPending ? <ButtonLoader /> : "Remove"}
    </Button>
  );
};

export default RemoveToCartButton;
