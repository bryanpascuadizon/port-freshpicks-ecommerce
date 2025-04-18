import { Checkbox } from "@/components/ui/checkbox";
import { TableCell } from "@/components/ui/table";
import { includeItemFromCart } from "@/lib/actions/CartActions";
import { CartItem } from "@/types";
import { useTransition } from "react";

const CartSelection = ({
  cartItem,
  refetch,
}: {
  cartItem: CartItem;
  refetch: () => void;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleIncludeCartItem = async () => {
    startTransition(async () => {
      const response = await includeItemFromCart(cartItem.productId);

      if (response) {
        await refetch();
      }
    });
  };

  return (
    <TableCell className="text-center">
      <Checkbox
        disabled={isPending}
        checked={cartItem.isSelected}
        className="cursor-pointer"
        onClick={handleIncludeCartItem}
      />
    </TableCell>
  );
};

export default CartSelection;
