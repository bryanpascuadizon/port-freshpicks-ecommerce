import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { includeAllCartItems } from "@/lib/actions/CartActions";
import { Cart } from "@/types";
import { useTransition } from "react";
import RemoveToCartButton from "./RemoveToCartButton";
import Link from "next/link";

const CartSummary = ({
  cart,
  refetch,
}: {
  cart: Cart;
  refetch: () => void;
}) => {
  const [isPending, startTransition] = useTransition();

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

  return (
    <div className="grid md:grid-cols-3 w-full rounded-sm bg-slate-100 p-5 mt-5 gap-5">
      <div className="flex col-span-1">
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
        <span className="self-center mr-5">
          Include All ({cart.cartItems.length})
        </span>
        <RemoveToCartButton
          isPending={isPending}
          startTransition={startTransition}
          totalSelectedQuantity={totalSelectedQuantity}
          refetch={refetch}
        />
      </div>
      <div className="flex justify-end col-span-2">
        <p className="self-center mr-10">
          Total ({totalSelectedQuantity}{" "}
          {totalSelectedQuantity > 1 || totalSelectedQuantity === 0
            ? "items included"
            : "item included"}
          )
        </p>
        <p className="self-center mr-10 text-lg text-green-700 font-bold">
          ₱ {Number(cart.subtotalPrice).toFixed(2)}
        </p>
        <Link href="/checkout">
          <Button className="green-button cursor-pointer text-lg">
            Check out
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
