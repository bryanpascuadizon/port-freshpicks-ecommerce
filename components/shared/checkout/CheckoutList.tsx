"use client";

import { getCartListForCheckout } from "@/lib/actions/CartActions";
import { useQuery } from "@tanstack/react-query";
import CheckoutAddress from "./CheckoutAddress";
import CheckoutCartList from "./CheckoutCartList";
import CheckoutPriceBreakdown from "./CheckoutPriceBreakdown";
import { getUserAddressList } from "@/lib/actions/UserActions";

const CheckoutList = () => {
  const { data: cart } = useQuery({
    queryKey: ["checkout-cart-list"],
    queryFn: getCartListForCheckout,
  });

  const { data: userAddressList } = useQuery({
    queryKey: ["user-address-checkout"],
    queryFn: getUserAddressList,
  });

  return (
    cart &&
    userAddressList &&
    userAddressList.addressList && (
      <div className="my-10">
        <div className="text-xl font-bold mb-5">Checkout</div>
        <CheckoutAddress addressList={userAddressList.addressList} />

        <div className="grid md:grid-cols-5 gap-4">
          <CheckoutCartList cart={cart} />
          <CheckoutPriceBreakdown
            subtotalPrice={cart.subtotalPrice}
            shippingPrice={cart.shippingPrice}
            totalPrice={cart.totalPrice}
            cart={cart}
          />
        </div>
      </div>
    )
  );
};

export default CheckoutList;
