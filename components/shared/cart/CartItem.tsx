import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { removeItemToCart } from "@/lib/actions/CartActions";
import { CartItem } from "@/types";
import Image from "next/image";

const CartItemDetail = ({
  cartItem,
  refetch,
}: {
  cartItem: CartItem;
  refetch: () => void;
}) => {
  const handleRemoveItemFromCart = async () => {
    const response = await removeItemToCart(cartItem);

    refetch();
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
          className="bg-green-700 cursor-pointer"
          onClick={handleRemoveItemFromCart}
        >
          Remove
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default CartItemDetail;
