import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { includeAllCartItems } from "@/lib/actions/CartActions";
import { Cart } from "@/types";
import { useTransition } from "react";
import RemoveToCartButton from "./RemoveToCartButton";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { currencyFormatter } from "@/lib/utils";

const CartSummary = ({
  cart,
  refetch,
}: {
  cart: Cart;
  refetch: () => void;
}) => {
  const [, startTransition] = useTransition();

  const totalSelectedQuantity = cart.cartItems
    .filter((item) => item.isSelected)
    .reduce((acc, item) => acc + item.quantity, 0);

  const totalAllQuantity = cart.cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const handleIncludeAllItems = () => {
    startTransition(async () => {
      const response = await includeAllCartItems(
        totalAllQuantity === totalSelectedQuantity
      );

      if (response) {
        await refetch();
      }
    });
  };

  const handleDisabledCheckout = () => {
    if (totalSelectedQuantity <= 0) {
      toast(
        <p className="toast-text text-destructive">
          Include items in your cart before checking out
        </p>
      );

      return;
    }

    redirect("/checkout");
  };

  return (
    <div className="grid md:grid-cols-3 w-full rounded-sm bg-slate-100 p-5 mt-5 gap-5">
      <div className="col-span-1 hidden md:flex">
        <Checkbox
          disabled={cart.cartItems.length === 0}
          checked={
            totalAllQuantity === 0
              ? false
              : totalAllQuantity === totalSelectedQuantity
          }
          className="self-center mr-5 cursor-pointer"
          onClick={handleIncludeAllItems}
        />
        <span className="self-center mr-5 hidden md:block">
          Include All ({cart.cartItems.length})
        </span>
        <RemoveToCartButton
          totalSelectedQuantity={totalSelectedQuantity}
          refetch={refetch}
        />
      </div>
      <div className="flex justify-between md:justify-end col-span-2">
        <div className="flex md:hidden">
          <Checkbox
            disabled={cart.cartItems.length === 0}
            checked={
              totalAllQuantity === 0
                ? false
                : totalAllQuantity === totalSelectedQuantity
            }
            className="self-center mr-5 cursor-pointer"
            onClick={handleIncludeAllItems}
          />
          <RemoveToCartButton
            totalSelectedQuantity={totalSelectedQuantity}
            refetch={refetch}
          />
        </div>
        <p className="self-center mr-10 hidden md:block">
          Total ({totalSelectedQuantity}{" "}
          {totalSelectedQuantity > 1 || totalSelectedQuantity === 0
            ? "items included"
            : "item included"}
          )
        </p>
        <p className="self-center mr-5 md:text-lg text-2xl text-green-700 font-bold">
          {currencyFormatter.format(cart.subtotalPrice)}
        </p>
        <Button
          className="green-button cursor-pointer text-lg"
          onClick={handleDisabledCheckout}
        >
          Check out
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
