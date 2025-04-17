import { TableCell, TableRow } from "@/components/ui/table";
import { CartItem } from "@/types";
import Image from "next/image";

const CartItemDetail = ({ cartItem }: { cartItem: CartItem }) => {
  return (
    <TableRow className="border-0">
      <TableCell>
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
    </TableRow>
  );
};

export default CartItemDetail;
