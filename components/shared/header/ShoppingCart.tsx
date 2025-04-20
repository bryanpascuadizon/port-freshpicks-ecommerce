"use client";

import { countCartItems, getUserCart } from "@/lib/actions/CartActions";
import { useCartItemCount } from "@/lib/hooks/CartItemCount";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const ShoppingCartHeader = () => {
  const { cartItemCount } = useCartItemCount();

  return (
    <Link href="/cart" className="relative cursor-pointer">
      <ShoppingCart />
      <div className="top-[-10px] left-4 absolute p-1 rounded-full bg-green-700 text-white text-xs w-6 h-6 text-center">
        {cartItemCount}
      </div>
    </Link>
  );
};

export default ShoppingCartHeader;
