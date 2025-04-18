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
import CartSummary from "./CartSummary";
import { useQuery } from "@tanstack/react-query";
import { getUserCart } from "@/lib/actions/CartActions";
import { Button } from "@/components/ui/button";

const CartList = () => {
  const { data: cart } = useQuery({
    queryKey: ["cart-list"],
    queryFn: getUserCart,
  });

  const tableHeaders = [
    "",
    "Product",
    "Category",
    "Qty.",
    "Total Price",
    "Actions",
  ];

  return (
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
          {cart &&
            cart.cartItems &&
            cart.cartItems.map((microgreenItem) => (
              <CartItem key={microgreenItem.slug} cartItem={microgreenItem} />
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CartList;
