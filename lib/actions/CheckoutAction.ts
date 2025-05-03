import { Cart, CartItem, Order, User, UserAddress } from "@/types";
import { createCheckoutSession } from "../handlers/checkoutHandlers";
import { getUserAddressList } from "./UserActions";
import { getAccountProfile } from "../handlers/userHandlers";
import { createOrder } from "../handlers/orderHandlers";
import { getUserCart } from "../handlers/cartHandlers";

export const createSessionForCheckout = async (
  cart: Cart,
  address: UserAddress
) => {
  try {
    let defaultAddress: UserAddress = address;

    if (!defaultAddress) {
      const userAddress = await getUserAddressList();

      if (userAddress.addressList) {
        defaultAddress = userAddress.addressList.find(
          (item: UserAddress) => item.isDefault === "on"
        )!;
      }
    }

    const user: User = await getAccountProfile();
    const allCartItems: Cart = await getUserCart();

    const cartItemsNotForShipping: CartItem[] = allCartItems.cartItems.filter(
      (item: CartItem) =>
        !cart.cartItems.some(
          (cartItem) => cartItem.productId === item.productId
        )
    );

    if (user) {
      //Initiate POST order
      const order: Order = await createOrder(
        cart,
        cartItemsNotForShipping,
        defaultAddress
      ).then((req) => req.json());

      if (order) {
        const response = await createCheckoutSession(order);

        return response;
      }
    }

    return {
      success: false,
      message: `Something went wrong`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Something went wrong - ${error}`,
    };
  }
};
