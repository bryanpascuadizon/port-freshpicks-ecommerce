import { Button } from "@/components/ui/button";
import { Cart } from "@/types";
import { toast } from "sonner";

const CartSummary = ({ cart }: { cart: Cart }) => {
  const totalQuantity = cart.cartItems
    .filter((item) => item.isSelected)
    .reduce((acc, item) => acc + item.quantity, 0);

  const handlePlaceOrder = () => {
    toast(
      <p className="toast-text text-red-700">
        Placing orders is not available yet.
      </p>
    );
  };

  return (
    <div className="w-full rounded-lg bg-slate-100 p-5 mt-5">
      <div className="flex justify-end">
        <p className="self-center mr-10">
          Total ({totalQuantity}{" "}
          {totalQuantity > 1 || totalQuantity === 0 ? "items" : "item"})
        </p>
        <p className="self-center mr-10 text-lg text-green-700">
          ₱ {Number(cart.subtotalPrice).toFixed(2)}
        </p>
        <Button
          className="green-button cursor-pointer"
          onClick={handlePlaceOrder}
        >
          PLACE ORDER
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
