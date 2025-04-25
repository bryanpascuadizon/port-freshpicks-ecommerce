import { Microgreen } from "@/types";

export const getAccountProfile = async (): Promise<Microgreen[]> => {
  try {
    // const response = await fetch(`/api/products/microgreens`).then((res) =>
    //   res.json()
    // );

    const response: Promise<Microgreen[]> = await fetch(
      "/api/products/microgreens"
    ).then((res) => res.json());

    console.log("test", response);

    return response;
  } catch (error) {
    throw new Error(`Something went wrong - ${error}`);
  }
};
