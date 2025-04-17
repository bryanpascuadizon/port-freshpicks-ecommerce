import { Microgreen } from "@/types";

export const getMicrogreenProducts = async (): Promise<Microgreen[]> => {
  const response: Promise<Microgreen[]> = await fetch(
    "/api/products/microgreens"
  ).then((res) => res.json());

  return response;
};

export const getMicrogreenProductBySlug = async (
  slug: string
): Promise<Microgreen> => {
  const response: Promise<Microgreen> = await fetch(
    `/api/products/microgreens/${slug}`
  ).then((res) => res.json());

  return response;
};
