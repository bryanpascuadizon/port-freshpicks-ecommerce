"use client";

import { getCartListForCheckout } from "@/lib/actions/CartActions";
import { useQuery } from "@tanstack/react-query";
import CheckoutAddress from "./CheckoutAddress";
import CheckoutCartList from "./CheckoutCartList";
import CheckoutPaymentMethod from "./CheckoutPaymentMethod";
import CheckoutPriceBreakdown from "./CheckoutPriceBreakdown";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { createSessionForCheckout } from "@/lib/actions/CheckoutAction";
import ButtonLoader from "../ButtonLoader";
import { redirect } from "next/navigation";

const CheckoutList = () => {
  const { data: cart } = useQuery({
    queryKey: ["checkout-cart-list"],
    queryFn: getCartListForCheckout,
  });

  const [isPending, startTransition] = useTransition();

  const handleCheckout = () => {
    startTransition(async () => {
      const response = await createSessionForCheckout(cart!);

      if (response) {
        console.log(response);
        redirect(response.data.attributes.checkout_url);
      }
    });
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
              className="button green-button cursor-pointer text-lg"
              onClick={handleCheckout}
            >
              {isPending ? <ButtonLoader /> : "Place Order"}
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default CheckoutList;
