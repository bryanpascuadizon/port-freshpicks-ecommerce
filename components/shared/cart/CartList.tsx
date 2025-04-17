import React from "react";
import { Cart } from "@/types";
import CartItem from "./CartItem";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CartSummary from "./CartSummary";

const CartList = ({ cart }: { cart: Cart }) => {
  console.log(cart);

  const tableHeaders = ["", "Product", "Category", "Qty.", "Price"];

  return (
    <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-5">
      <div className="md:col-span-2 sm:col-span-1 p-5">
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
              cart.cartItems.length &&
              cart.cartItems.map((microgreenItem) => (
                <CartItem key={microgreenItem.slug} cartItem={microgreenItem} />
              ))}
          </TableBody>
        </Table>
      </div>
      <div className="md:col-span-1 sm:col-span-1 p-5">
        <div className="text-xl font-bold mb-5">Summary</div>
        <CartSummary
          subtotal={cart.subtotalPrice}
          shippingPrice={cart.shippingPrice}
          totalPrice={cart.totalPrice}
        />
      </div>
    </div>
  );
};

export default CartList;
