"use server";

import { auth, signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import {
  getAccountProfile,
  updateAccountAddress,
  updateAccountProfile,
} from "../handlers/userHandlers";
import { FormState, User, UserAddress } from "@/types";
import { v4 as uuidv4 } from "uuid";

export const getUserAuthentication = async () => {
  const session = await auth();
  const user = session?.user;

  return user;
};

export const SignIn = async (prevState: unknown, formData: FormData) => {
  try {
    const user = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    await signIn("credentials", user);
    return {
      success: true,
      message: "Signed In successfully",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: "Invalid Email or Password",
    };
  }
};

export const googleSignIn = async () => {
  try {
    await signIn("google");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: "Invalid Email or Password",
    };
  }
};

export const SignOut = async () => {
  await signOut();
};

export const getUserProfile = async (): Promise<User> => {
  try {
    const user = await getUserAuthentication();

    if (user) {
      const response = await getAccountProfile(user.id!);

      if (response) {
        return response;
      }
    }

    throw new Error(`Something went wrong`);
  } catch (error) {
    throw new Error(`Something went wrong - ${error}`);
  }
};

export const updateUserProfile = async (
  prevState: FormState,
  formData: FormData
) => {
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const phoneNumber = formData.get("phone_number");
    const gender = formData.get("gender");

    const userFieldsForUpdate = {
      name,
      email,
      phoneNumber,
      gender,
    };

    const user = await getUserAuthentication();

    if (user) {
      const response = await updateAccountProfile(
        userFieldsForUpdate,
        user.id!
      );

      if (response) {
        return {
          success: true,
          user: response,
        };
      }
    }

    return {
      success: false,
      message: "Something went wrong",
    };
  } catch (error) {
    return {
      success: false,
      message: `Something went wrong - ${error}`,
    };
  }
};

export const getUserAddressList = async () => {
  try {
    const userAddress = await getUserProfile();

    if (userAddress && userAddress.address) {
      const addressList: UserAddress[] = userAddress.address.map(
        (address: UserAddress) => ({
          id: address.id,
          name: address.name,
          phoneNumber: address.phoneNumber,
          postalCode: address.postalCode,
          address: address.address,
          isDefault: address.isDefault,
        })
      );

      const defaultAddressIndex = addressList.findIndex(
        (item: UserAddress) => item.isDefault === "on"
      );

      if (defaultAddressIndex > -1) {
        const [defaultAddress] = addressList.splice(defaultAddressIndex, 1);
        addressList.unshift(defaultAddress);
      }

      return {
        success: true,
        addressList,
      };
    }

    return {
      success: true,
      addressList: [],
    };
  } catch (error) {
    return {
      success: false,
      message: `Something went wrong - ${error}`,
    };
  }
};

export const submitAddress = async (
  prevState: FormState,
  formData: FormData
) => {
  try {
    const name = formData.get("name");
    const phoneNumber = formData.get("phoneNumber");
    const postalCode = formData.get("postalCode");
    const address = formData.get("address");
    const isDefault = formData.get("isDefault");

    const addressData = {
      id: uuidv4(),
      name,
      phoneNumber,
      postalCode,
      address,
      isDefault,
    };

    const userSession = await getUserAuthentication();

    if (userSession) {
      const user = await getAccountProfile(userSession.id!);

      if (user) {
        if (user.address && user.address.length) {
          if (isDefault === "on") {
            user.address.find(
              (address: UserAddress) => address.isDefault === "on"
            )!.isDefault = null;
          }

          user.address = [...user.address, addressData];
        } else {
          addressData.isDefault = "on";
          user.address = [addressData];
        }

        const response = await updateAccountAddress(user);

        if (response) {
          return {
            success: true,
            addressList: response,
          };
        }
      }
    }

    return {
      success: false,
      message: "Something went wrong",
    };
  } catch (error) {
    return {
      success: false,
      message: `Something went wrong - ${error}`,
    };
  }
};

export const updateAddress = async (
  prevState: FormState,
  formData: FormData
) => {
  try {
    const id = formData.get("id");
    const name = formData.get("name");
    const phoneNumber = formData.get("phoneNumber");
    const postalCode = formData.get("postalCode");
    const address = formData.get("address");
    let isDefault = formData.get("isDefault");

    const userSession = await getUserAuthentication();

    if (userSession) {
      const user = await getAccountProfile(userSession.id!);

      if (user) {
        if (isDefault === "on") {
          user.address.find(
            (address: UserAddress) => address.isDefault === "on"
          )!.isDefault = null;
        } else {
          //Check if address is already default
          const addressIsDefault = user.address.find(
            (item: UserAddress) => item.id === id
          );

          //Set isDefault to "on"
          if (addressIsDefault.isDefault === "on") {
            isDefault = "on";
          }
        }

        const newUserAddress = user.address.map((item: UserAddress) =>
          item.id === id
            ? {
                ...item,
                name,
                phoneNumber,
                postalCode,
                address,
                isDefault,
              }
            : item
        );

        user.address = [...newUserAddress];
      }

      const response = await updateAccountAddress(user);

      if (response) {
        return {
          success: true,
          message: "Address has been updated",
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

export const deleteAddress = async (addressId: string) => {
  try {
    const userSession = await getUserAuthentication();

    if (userSession) {
      const user = await getAccountProfile(userSession.id!);

      if (user) {
        const newAddressList = user.address.filter(
          (address: UserAddress) => address.id !== addressId
        );

        user.address = newAddressList;
      }

      const response = await updateAccountAddress(user);

      if (response) {
        return {
          success: true,
          message: "Address has been deleted",
        };
      }
    }

    return {
      success: false,
      message: "Something went wrong",
    };
  } catch (error) {
    return {
      success: false,
      message: `Something went wrong - ${error}`,
    };
  }
};

export const updateDefaultAddress = async (addressId: string) => {
  try {
    const userSession = await getUserAuthentication();

    if (userSession) {
      const user = await getAccountProfile(userSession.id!);

      if (user) {
        //Set current default address to "not default"
        user.address.find(
          (item: UserAddress) => item.isDefault === "on"
        )!.isDefault = null;

        //Set default address using the addressId
        user.address.find(
          (item: UserAddress) => item.id === addressId
        )!.isDefault = "on";

        const response = await updateAccountAddress(user);

        if (response) {
          return {
            success: true,
            message: "Default address has been changed",
          };
        }
      }
    }

    return {
      success: false,
      message: "Something went wrong",
    };
  } catch (error) {
    return {
      success: false,
      message: `Something went wrong - ${error}`,
    };
  }
};
