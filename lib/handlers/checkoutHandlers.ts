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

export const cancelOrderByReferenceNumber = async (referenceNumber: string) => {
  const response = await fetch(`/api/order/${referenceNumber}`, {
    method: "DELETE",
  }).then((res) => res.json());

  return response;
};
