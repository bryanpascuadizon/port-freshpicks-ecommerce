import { TableCell, TableRow } from "@/components/ui/table";
import { removeItemToCart } from "@/lib/actions/CartActions";
import { CartItem } from "@/types";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";
import Link from "next/link";
import CartQuantity from "./CartQuantity";
import CartSelection from "./CartSelection";
import { useCartItemCount } from "@/lib/hooks/CartItemCount";
import { currencyFormatter } from "@/lib/utils";
import { Loader, Trash2 } from "lucide-react";

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
              <span className="text-green">{cartItem.name}</span> x
              {cartItem.quantity}
            </p>
          </div>
        );
      }
    });
  };

  return (
    <>
      <TableRow className="tableRow text-base hidden md:table-row">
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
            <p className="text-green">{cartItem.description[0]}</p>
          </Link>
        </TableCell>
        <TableCell className="">{cartItem.category}</TableCell>
        <TableCell className="text-center">
          <CartQuantity
            quantity={cartItem.quantity}
            productId={cartItem.productId}
            refetch={refetch}
          />
        </TableCell>
        <TableCell className="text-center text-green font-bold">
          {currencyFormatter.format(cartItem.price * cartItem.quantity)}
        </TableCell>
        <TableCell className="text-center">
          {isPending ? (
            <Loader className="self-center animate-spin" />
          ) : (
            <Trash2
              className="text-red-700 self-center cursor-pointer"
              onClick={handleRemoveItemFromCart}
            />
          )}
        </TableCell>
      </TableRow>

      <TableRow className="tableRow text-base table-row md:hidden">
        <CartSelection cartItem={cartItem} refetch={refetch} />
        <TableCell>
          <Image
            src={cartItem.images[0]}
            alt={cartItem.slug}
            width={50}
            height={50}
            className="rounded-full self-center"
          />
        </TableCell>
        <TableCell>
          <Link
            href={`/products/microgreens/${cartItem.slug}`}
            className="w-full"
          >
            <p className="font-bold">{cartItem.name}</p>
            <p className="">{cartItem.category}</p>
            <p className="text-green mb-5">{cartItem.description[0]}</p>
          </Link>
          <div className="grid grid-cols-3 gap-5">
            <CartQuantity
              quantity={cartItem.quantity}
              productId={cartItem.productId}
              refetch={refetch}
            />
            <p className="text-green font-bold text-center">
              {currencyFormatter.format(cartItem.price * cartItem.quantity)}
            </p>
            <p className="flex justify-center">
              {isPending ? (
                <Loader className="animate-spin" />
              ) : (
                <Trash2
                  className="text-red-700 cursor-pointer"
                  onClick={handleRemoveItemFromCart}
                />
              )}
            </p>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CartItemDetail;
