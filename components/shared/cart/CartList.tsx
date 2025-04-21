"use client";

import React from "react";
import CartItem from "./CartItem";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { getUserCart } from "@/lib/handlers/cartHandlers";
import CartSummary from "./CartSummary";
import Link from "next/link";

const CartList = () => {
  const { data: cart, refetch } = useQuery({
    queryKey: ["cart-list"],
    queryFn: getUserCart,
  });

  const tableHeaders = [
    "Include",
    "",
    "Product",
    "Category",
    "Qty.",
    "Total Price",
    "Actions",
  ];

  console.log(cart);

  return (
    cart &&
    cart.cartItems && (
      <div className="my-10">
        <div className="text-xl font-bold mb-5">Shopping Cart</div>
        <Table>
          <TableHeader>
            <TableRow className="border-">
              {tableHeaders.map((header) => (
                <TableHead
                  key={header}
                  className={`text-lg text-black font-bold border-0 ${
                    header !== "Product" && "text-center"
                  }`}
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart.cartItems.map((microgreenItem) => (
              <CartItem
                key={microgreenItem.slug}
                cartItem={microgreenItem}
                refetch={refetch}
              />
            ))}
          </TableBody>
        </Table>
        {cart.cartItems.length === 0 && (
          <p className="w-full text-center my-10">
            No items in cart. Go purchase{" "}
            <Link href="/" className="text-green-700">
              here
            </Link>
          </p>
        )}
        <CartSummary cart={cart} refetch={refetch} />
      </div>
    )
  );
};

export default CartList;
