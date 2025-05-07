"use client";

import { getCartListForCheckout } from "@/lib/actions/CartActions";
import { useQuery } from "@tanstack/react-query";
import CheckoutAddress from "./CheckoutAddress";
import CheckoutCartList from "./CheckoutCartList";
import CheckoutPriceBreakdown from "./CheckoutPriceBreakdown";
import { getUserAddressList } from "@/lib/actions/UserActions";
import { useState } from "react";
import { UserAddress } from "@/types";

const CheckoutList = () => {
  const { data: cart } = useQuery({
    queryKey: ["checkout-cart-list"],
    queryFn: getCartListForCheckout,
  });

  const { data: userAddressList, refetch: refetechCheckoutUserAddressList } =
    useQuery({
      queryKey: ["user-address-checkout"],
      queryFn: getUserAddressList,
    });

  const [selectedAddress, setSelectedAddress] = useState<UserAddress>();

  return (
    cart &&
    userAddressList &&
    userAddressList.addressList && (
      <div className="my-10">
        <div className="text-xl font-bold mb-5">Checkout</div>
        <CheckoutAddress
          addressList={userAddressList.addressList}
          selectedAddress={selectedAddress!}
          setSelectedAddress={setSelectedAddress}
          refetechCheckoutUserAddressList={refetechCheckoutUserAddressList}
        />

        <div className="grid md:grid-cols-5 gap-4">
          <CheckoutCartList cart={cart} />
          <CheckoutPriceBreakdown
            subtotalPrice={cart.subtotalPrice}
            shippingPrice={cart.shippingPrice}
            totalPrice={cart.totalPrice}
            cart={cart}
            selectedAddress={selectedAddress!}
          />
        </div>
      </div>
    )
  );
};

export default CheckoutList;
