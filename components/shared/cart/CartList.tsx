"use client";

import React from "react";
import CartItem from "./CartItem";
import { Table, TableBody } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import CartSummary from "./CartSummary";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { getCartForUser } from "@/lib/actions/CartActions";
import PageLoader from "../PageLoader";

const CartList = () => {
  const { data, isPending, refetch } = useQuery({
    queryKey: ["cart-list"],
    queryFn: getCartForUser,
  });

  return !isPending ? (
    <>
      <div className="text-2xl font-bold mb-5">Shopping Cart</div>
      {data && data.cart && data.cart.cartItems.length ? (
        <>
          <Table>
            <TableBody>
              {data.cart.cartItems.map((microgreenItem) => (
                <CartItem
                  key={microgreenItem.slug}
                  cartItem={microgreenItem}
                  refetch={refetch}
                />
              ))}
            </TableBody>
          </Table>
          <CartSummary cart={data.cart} refetch={refetch} />
        </>
      ) : (
        <>
          {data && data.cart && data.cart.cartItems.length === 0 && (
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
  ) : (
    <PageLoader />
  );
};

export default CartList;
