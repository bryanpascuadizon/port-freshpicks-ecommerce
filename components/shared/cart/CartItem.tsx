import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { removeItemToCart } from "@/lib/actions/CartActions";
import { CartItem } from "@/types";
import Image from "next/image";
import { useTransition } from "react";
import ButtonLoader from "../ButtonLoader";
import { toast } from "sonner";
import Link from "next/link";
import CartQuantity from "./CartQuantity";
import CartSelection from "./CartSelection";
import { useCartItemCount } from "@/lib/hooks/CartItemCount";
import { currencyFormatter } from "@/lib/utils";

const CartItemDetail = ({
  cartItem,
  refetch,
}: {
  cartItem: CartItem;
  refetch: () => void;
}) => {
  const [isPending, startTransition] = useTransition();
  const { refetchCartItemCount } = useCartItemCount();

  const handleRemoveItemFromCart = () => {
    startTransition(async () => {
      const response = await removeItemToCart(cartItem);

      if (response.success) {
        await refetch();
        await refetchCartItemCount();

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
    });
  };

  return (
    <TableRow className="border-0 text-base">
      <CartSelection cartItem={cartItem} refetch={refetch} />
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
        <Link
          href={`/products/microgreens/${cartItem.slug}`}
          className="w-full"
        >
          <p className="font-bold">{cartItem.name}</p>
          <p className="text-green-700">{cartItem.description[0]}</p>
        </Link>
      </TableCell>
      <TableCell className="text-center">{cartItem.category}</TableCell>
      <CartQuantity
        quantity={cartItem.quantity}
        productId={cartItem.productId}
        refetch={refetch}
      />
      <TableCell className="text-center">
        {currencyFormatter.format(cartItem.price * cartItem.quantity)}
      </TableCell>
      <TableCell className="text-center">
        <Button
          disabled={isPending}
          className="button green-button cursor-pointer"
          onClick={handleRemoveItemFromCart}
        >
          {isPending ? <ButtonLoader /> : "Remove"}
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CartItemDetail;
