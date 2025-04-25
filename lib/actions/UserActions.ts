"use server";

import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { getAccountProfile } from "../handlers/userHandlers";

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

export const getUserProfile = async () => {
  try {
    const response = await getAccountProfile();

    if (response) {
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
