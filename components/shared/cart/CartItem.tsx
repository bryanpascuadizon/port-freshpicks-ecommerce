import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { removeItemToCart } from "@/lib/actions/CartActions";
import { CartItem } from "@/types";
import Image from "next/image";
import { useTransition } from "react";
import ButtonLoader from "../ButtonLoader";
import { toast } from "sonner";

const CartItemDetail = ({
  cartItem,
  refetch,
}: {
  cartItem: CartItem;
  refetch: () => void;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleRemoveItemFromCart = async () => {
    startTransition(async () => {
      const response = await removeItemToCart(cartItem);

      if (response.success) {
        toast(
          <div className="toast-text">
            <p>
              {cartItem.quantity > 1 ? "Items" : "An item"} have been removed
              from your cart:
            </p>
            <p>
              <span className="text-green-700">{cartItem.name}</span> x
              {cartItem.quantity}
            </p>
          </div>
        );
      }

      await refetch();
    });
  };
  return (
    <TableRow className="border-0">
      <TableCell className="flex justify-center">
        <Image
          src={cartItem.images[0]}
          alt={cartItem.slug}
          width={50}
          height={50}
          className="rounded-full"
        />
      </TableCell>
      <TableCell>
        <p className="font-bold">{cartItem.name}</p>
        <p className="text-green-700">{cartItem.description[0]}</p>
      </TableCell>

      <TableCell className="text-center">{cartItem.category}</TableCell>
      <TableCell className="text-center">{cartItem.quantity}</TableCell>
      <TableCell className="text-center">{cartItem.price}</TableCell>

      <TableCell className="text-center">
        <Button
          disabled={isPending}
          className="bg-green-700 cursor-pointer"
          onClick={handleRemoveItemFromCart}
        >
          {isPending ? <ButtonLoader /> : "Remove"}
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CartItemDetail;
