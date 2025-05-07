"use client";

import { useCartItemCount } from "@/lib/hooks/CartItemCount";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const ShoppingCartHeader = () => {
  const { cartItemCount } = useCartItemCount();

  return (
    <Link href="/cart" className="relative cursor-pointer">
      <ShoppingCart />
      <div className="top-[-15px] left-4 absolute rounded-full bg-green-700 text-white text-xs w-8 h-8 border-2 border-white">
        <p className="text-center mt-[6px]">{cartItemCount}</p>
      </div>
    </Link>
  );
};

export default ShoppingCartHeader;
