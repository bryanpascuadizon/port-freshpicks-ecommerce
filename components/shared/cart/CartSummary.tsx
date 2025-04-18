import { Button } from "@/components/ui/button";
import { Table, TableCell, TableRow } from "@/components/ui/table";
import { Cart } from "@/types";

const CartSummary = ({ cart }: { cart: Cart }) => {
  const totalQuantity = cart.cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  return (
    <div className="w-full rounded-lg bg-slate-100 p-5 mt-5">
      <div className="flex justify-end">
        <p className="self-center mr-10">
          Total ({totalQuantity} {totalQuantity > 1 ? "items" : "item"})
        </p>
        <p className="self-center mr-10 text-lg text-green-700">
          {cart.subtotalPrice}
        </p>
        <Button className="bg-green-700">Place Order</Button>
      </div>
    </div>
  );
};

export default CartSummary;
