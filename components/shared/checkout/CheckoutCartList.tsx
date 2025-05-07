import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { currencyFormatter } from "@/lib/utils";
import { Cart } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CheckoutCartList = ({ cart }: { cart: Cart }) => {
  return (
    <div className="p-5 md:col-span-3">
      <div className="font-bold mb-5">Products Ordered</div>
      <Table>
        <TableBody>
          {cart &&
            cart.cartItems.map((cartItem, index) => (
              <React.Fragment key={`${cartItem.productId}_${index}`}>
                <TableRow className="tableRow hidden md:table-row">
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
                    <p className="text-green">{cartItem.description[0]}</p>
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
                  <TableCell className="font-bold text-green text-right">
                    {currencyFormatter.format(
                      cartItem.price * cartItem.quantity
                    )}
                  </TableCell>
                </TableRow>

                <TableRow className="table-row md:hidden border-0">
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
                    <Link
                      href={`/products/microgreens/${cartItem.slug}`}
                      className="w-full"
                    >
                      <p className="font-bold">{cartItem.name}</p>
                      <p className="">{cartItem.category}</p>
                      <p className="text-green mb-5">
                        {cartItem.description[0]}
                      </p>
                    </Link>
                    <div className="grid grid-cols-2">
                      <div>{cartItem.quantity}</div>
                      <div className="flex justify-end font-bold text-green">
                        {currencyFormatter.format(
                          cartItem.price * cartItem.quantity
                        )}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CheckoutCartList;
