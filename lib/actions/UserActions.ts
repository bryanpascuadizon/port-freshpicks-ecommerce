"use server";

import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import {
  getAccountProfile,
  updateAccountProfile,
} from "../handlers/userHandlers";
import { FormState, User } from "@/types";

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

export const SignOut = async () => {
  console.log("sign out");
  await signOut();
};

export const getUserProfile = async (): Promise<User> => {
  try {
    const response = await getAccountProfile();

    if (response) {
      return response;
    }

    return response;
  } catch (error) {
    throw new Error(`Something went wrong - ${error}`);
  }
};

//@typescript-eslint/no-explicit-any
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

    const response = await updateAccountProfile(userFieldsForUpdate);

    if (response) {
      return {
        success: true,
        user: response,
      };
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
