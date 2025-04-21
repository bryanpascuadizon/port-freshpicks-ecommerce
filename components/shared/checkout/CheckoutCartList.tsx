import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currencyFormatter } from "@/lib/utils";
import { Cart } from "@/types";
import Image from "next/image";

const CheckoutCartList = ({ cart }: { cart: Cart }) => {
  const tableHeaders = [
    "",
    "",
    "Category",
    "Product Price",
    "Qty.",
    "Subtotal Price",
  ];

  return (
    <div className="p-5">
      <div className="font-bold">Products Ordered</div>
      <Table>
        <TableHeader>
          <TableRow>
            {tableHeaders &&
              tableHeaders.map((item, index) => (
                <TableHead
                  key={index}
                  className="font-bold text-black text-right"
                >
                  {item}
                </TableHead>
              ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart &&
            cart.cartItems.map((cartItem) => (
              <TableRow key={cartItem.slug} className="border-0">
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
                  <p className="font-bold ">{cartItem.name}</p>
                  <p className="text-green-700">{cartItem.description[0]}</p>
                </TableCell>
                <TableCell className="text-right">
                  {cartItem.category}
                </TableCell>
                <TableCell className="text-right">
                  {currencyFormatter.format(cartItem.price)}
                </TableCell>
                <TableCell className="text-right">
                  {cartItem.quantity}
                </TableCell>
                <TableCell className="font-bold text-green-700 text-right">
                  {currencyFormatter.format(cartItem.price * cartItem.quantity)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CheckoutCartList;
