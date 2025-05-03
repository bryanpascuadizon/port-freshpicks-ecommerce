import { Order } from "@/types";

export const createCheckoutSession = async (order: Order) => {
  const response = await fetch(
    `/api/checkout/paymongo/create-checkout-session`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order }),
    }
  ).then((res) => res.json());

  return response;
};
