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
