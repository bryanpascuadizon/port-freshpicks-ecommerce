import { Button } from "@/components/ui/button";
import { removeCartItems } from "@/lib/actions/CartActions";
import { useCartItemCount } from "@/lib/hooks/CartItemCount";
import { Loader } from "lucide-react";
import { useTransition } from "react";

const RemoveToCartButton = ({
  totalSelectedQuantity,
  refetch,
}: {
  totalSelectedQuantity: number;
  refetch: () => void;
}) => {
  const [isPending, startTransistion] = useTransition();
  const { refetchCartItemCount } = useCartItemCount();

  const handleRemoveCartItems = () => {
    startTransistion(async () => {
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
