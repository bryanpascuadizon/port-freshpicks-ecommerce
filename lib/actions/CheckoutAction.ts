import { Cart, CartItem, Order, User, UserAddress } from "@/types";
import { createCheckoutSession } from "../handlers/checkoutHandlers";
import { getUserAddressList } from "./UserActions";
import { getAccountProfile } from "../handlers/userHandlers";
import { createOrder, getOrderByStage } from "../handlers/orderHandlers";
import { getUserCart } from "../handlers/cartHandlers";
import { orderStage } from "../constants";

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

    const order: Order[] = await getOrderByStage(orderStage[0].stage);

    if (order && order.length) {
      console.log(order);
      return {
        success: false,
        message: "You have pending orders that needs payment",
      };
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
      const newOrder: Order = await createOrder(
        cart,
        cartItemsNotForShipping,
        defaultAddress
      ).then((req) => req.json());

      if (newOrder) {
        const paymongoResponse = await createCheckoutSession(newOrder);

        return {
          success: true,
          paymongoResponse,
        };
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
