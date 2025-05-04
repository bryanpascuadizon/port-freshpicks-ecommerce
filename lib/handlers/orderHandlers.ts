import { Cart, CartItem, UserAddress } from "@/types";

export const createOrder = async (
  cart: Cart,
  cartItemsNotForShipping: CartItem[],
  defaultAddress: UserAddress
) => {
  const response = await fetch(`/api/order`, {
    method: "POST",
    body: JSON.stringify({ cart, cartItemsNotForShipping, defaultAddress }),
  });

  return response;
};

export const getOrderByReferenceNumber = async (referenceNumber: string) => {
  const response = await fetch(`api/order/${referenceNumber}`).then((req) =>
    req.json()
  );

  return response;
};
