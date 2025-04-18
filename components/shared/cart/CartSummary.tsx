import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { selectAllCartItems } from "@/lib/actions/CartActions";
import { Cart } from "@/types";
import { useTransition } from "react";
import { toast } from "sonner";

const CartSummary = ({
  cart,
  refetch,
}: {
  cart: Cart;
  refetch: () => void;
}) => {
  const [isPending, startTransistion] = useTransition();

  const totalSelectedQuantity = cart.cartItems
    .filter((item) => item.isSelected)
    .reduce((acc, item) => acc + item.quantity, 0);

  const totalAllQuantity = cart.cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    toast(
      <p className="toast-text text-red-700">
        Placing orders is not available yet.
      </p>
    );
  };

  const handleSelectAllItems = () => {
    startTransistion(async () => {
      const response = await selectAllCartItems();

      if (response) {
        await refetch();
      }
    });
  };

  return (
    <div className="grid grid-cols-2 w-full rounded-lg bg-slate-100 p-5 mt-5">
      <div className="flex justify-start">
        <Checkbox
          checked={totalAllQuantity === totalSelectedQuantity ? true : false}
          disabled={isPending}
          className="self-center mr-5 cursor-pointer"
          onClick={handleSelectAllItems}
        />{" "}
        <span className="self-center">Select All ({totalAllQuantity})</span>
      </div>
      <div className="flex justify-end ">
        <p className="self-center mr-10">
          Total ({totalSelectedQuantity}{" "}
          {totalSelectedQuantity > 1 || totalSelectedQuantity === 0
            ? "items"
            : "item"}
          )
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
