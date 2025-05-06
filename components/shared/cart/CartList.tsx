"use client";

import React from "react";
import CartItem from "./CartItem";
import { Table, TableBody } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { getUserCart } from "@/lib/handlers/cartHandlers";
import CartSummary from "./CartSummary";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

const CartList = () => {
  const { data: cart, refetch } = useQuery({
    queryKey: ["cart-list"],
    queryFn: getUserCart,
  });

  return (
    <>
      <div className="text-2xl font-bold mb-5">Shopping Cart</div>
      {cart && cart.cartItems.length ? (
        <>
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
          <CartSummary cart={cart} refetch={refetch} />
        </>
      ) : (
        <>
          {cart && cart.cartItems.length === 0 && (
            <p className="w-full text-center my-30">
              <ShoppingCart
                className="text-green m-auto mb-5"
                width={100}
                height={100}
              />
              No items in cart. Go purchase{" "}
              <Link href="/" className="text-green">
                here
              </Link>
            </p>
          )}
        </>
      )}
    </>
  );
};

export default CartList;
