"use client";

import React from "react";
import CartItem from "./CartItem";
import { Table, TableBody } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { getUserCart } from "@/lib/handlers/cartHandlers";
import CartSummary from "./CartSummary";
import Link from "next/link";

const CartList = () => {
  const { data: cart, refetch } = useQuery({
    queryKey: ["cart-list"],
    queryFn: getUserCart,
  });

  return (
    cart &&
    cart.cartItems && (
      <div className="my-10">
        <div className="text-xl font-bold mb-5">Shopping Cart</div>
        <div className="">
          <Table>
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
        </div>
        {cart.cartItems.length === 0 && (
          <p className="w-full text-center my-10">
            No items in cart. Go purchase{" "}
            <Link href="/" className="text-green">
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
