import { Cart, User, UserAddress } from "@/types";

export const createCheckoutSession = async (
  cart: Cart,
  address: UserAddress,
  user: User
) => {
  const response = await fetch(
    `/api/checkout/paymongo/create-checkout-session`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart, address, user }),
    }
  ).then((res) => res.json());

  return response;
};
