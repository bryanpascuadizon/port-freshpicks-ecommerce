import { Cart } from "@/types";

export const createCheckoutSession = async (cart: Cart) => {
  const response = await fetch(`/api/checkout/create-checkout-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cart }),
  }).then((res) => res.json());

  return response;
};
