import { Cart, CartItem, Order, UserAddress } from "@/types";

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

export const getOrderByStage = async (stage: string, userId: string) => {
  const response = await fetch(`/api/order/stage/${stage}/${userId}`).then(
    (req) => req.json()
  );

  return response;
};

export const updateOrderToProcess = async (order: Order, process: string) => {
  const response = await fetch(`/api/order/process/${process}`, {
    method: "PATCH",
    body: JSON.stringify({ order }),
  }).then((req) => req.json());

  return response;
};
