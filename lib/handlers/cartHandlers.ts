import { Cart } from "@/types";

export const getUserCart = async (userId: string): Promise<Cart> => {
  const response: Promise<Cart> = await fetch(`/api/cart/${userId}`).then(
    (res) => res.json()
  );

  if (!response) {
    const newUserCartResponse = await fetch(`/api/cart/${userId}`, {
      method: "POST",
    }).then((res) => res.json());

    if (newUserCartResponse) {
      return newUserCartResponse;
    }
  }

  return response;
};

export const addUserCart = async (updatedCart: Cart, userId: string) => {
  const response = await fetch(`/api/cart/update-cart/${userId}`, {
    method: "POST",
    body: JSON.stringify(updatedCart),
  });

  return response;
};

export const updateUserCart = async (updatedCart: Cart, userId: string) => {
  const response = await fetch(`/api/cart/update-cart/${userId}`, {
    method: "PATCH",
    body: JSON.stringify(updatedCart),
  });

  return response;
};
