import { Microgreen } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { defaultShippingPrice } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumberToCurrency = (value: number) => {
  return value.toFixed(2);
};

export const calculateInitialPrice = (item: Microgreen) => {
  const subtotalPrice: number = Number(item.price);
  const shippingPrice: number = defaultShippingPrice;
  const totalPrice: string = formatNumberToCurrency(
    subtotalPrice + shippingPrice
  );

  return { subtotalPrice, shippingPrice, totalPrice };
};
