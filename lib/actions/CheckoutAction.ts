import { Cart } from "@/types";
import { createCheckoutSession } from "../handlers/checkoutHandlers";

export const createSessionForCheckout = async (cart: Cart) => {
  try {
    const response = await createCheckoutSession(cart);

    return response;
  } catch (error) {
    return {
      success: false,
      message: `${error}`,
    };
  }
};
