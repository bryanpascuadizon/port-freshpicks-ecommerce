import { User } from "@/types";

export const getAccountProfile = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/account/profile`
    ).then((res) => res.json());

    return response;
  } catch (error) {
    throw new Error(`Something went wrong - ${error}`);
  }
};

export const updateAccountProfile = async (userForUpdate: {
  name: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  phoneNumber: FormDataEntryValue | null;
  gender: FormDataEntryValue | null;
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/account/profile`,
      {
        method: "PATCH",
        body: JSON.stringify(userForUpdate),
      }
    ).then((res) => res.json());

    return response;
  } catch (error) {
    throw new Error(`Something went wrong - ${error}`);
  }
};

export const updateAccountAddress = async (user: User) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/account/addresses`,
      {
        method: "PATCH",
        body: JSON.stringify(user),
      }
    ).then((res) => res.json());

    return response;
  } catch (error) {
    throw new Error(`Something went wrong - ${error}`);
  }
};
