"use client";

import { getCartListForCheckout } from "@/lib/actions/CartActions";
import { useQuery } from "@tanstack/react-query";
import CheckoutAddress from "./CheckoutAddress";
import CheckoutCartList from "./CheckoutCartList";
import CheckoutPaymentMethod from "./CheckoutPaymentMethod";
import CheckoutPriceBreakdown from "./CheckoutPriceBreakdown";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CheckoutList = () => {
  const { data: cart } = useQuery({
    queryKey: ["checkout-cart-list"],
    queryFn: getCartListForCheckout,
  });

  const handleCheckout = () => {
    toast(
      <p className="text-red-700 toast-text">
        Placing orders is not available yet
      </p>
    );
  };
  return (
    cart && (
      <div className="my-10">
        <div className="text-xl font-bold mb-5">Checkout</div>
        <CheckoutAddress />

        <div>
          <CheckoutCartList cart={cart} />
          <div className="grid grid-cols-2 gap-5 mt-5">
            <CheckoutPaymentMethod />
            <CheckoutPriceBreakdown
              subtotalPrice={cart.subtotalPrice}
              shippingPrice={cart.shippingPrice}
              totalPrice={cart.totalPrice}
            />
          </div>
          <div className="flex justify-end mt-5">
            <Button
              className="green-button cursor-pointer text-lg"
              onClick={handleCheckout}
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default CheckoutList;
