import { Cart } from "@/types";

export const getUserCart = async (): Promise<Cart> => {
  const response: Promise<Cart> = await fetch("/api/cart").then((res) =>
    res.json()
  );

  return response;
};

export const addUserCart = async (updatedCart: Cart) => {
  const response = await fetch(`/api/cart/update-cart`, {
    method: "POST",
    body: JSON.stringify(updatedCart),
  });

  return response;
};

export const updateUserCart = async (updatedCart: Cart) => {
  const response = await fetch(`/api/cart/update-cart`, {
    method: "PATCH",
    body: JSON.stringify(updatedCart),
  });

  return response;
};
