import { removeCartItems } from "@/lib/actions/CartActions";
import { useCartItemCount } from "@/lib/hooks/CartItemCount";
import { useTransition } from "react";
import { toast } from "sonner";
import { Loader, Trash2 } from "lucide-react";

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
    <div className="flex">
      {" "}
      {isPending ? (
        <Loader className="self-center animate-spin" />
      ) : (
        <Trash2
          className="hidden md:block text-red-700 self-center cursor-pointer"
          onClick={handleRemoveCartItems}
        />
      )}
      {isPending ? (
        <Loader className="self-center animate-spin block md:hidden" />
      ) : (
        <Trash2
          className="block md:hidden text-red-700 self-center cursor-pointer"
          onClick={handleRemoveCartItems}
        />
      )}
    </div>
  );
};

export default RemoveToCartButton;
