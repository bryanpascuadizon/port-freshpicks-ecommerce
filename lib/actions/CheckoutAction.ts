import { Cart, UserAddress } from "@/types";
import { createCheckoutSession } from "../handlers/checkoutHandlers";
import { getUserAddressList } from "./UserActions";
import { getAccountProfile } from "../handlers/userHandlers";

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

    const user = await getAccountProfile();

    if (user) {
      const response = await createCheckoutSession(cart, defaultAddress, user);

      return response;
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
