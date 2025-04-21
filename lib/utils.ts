import { CartItem } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { defaultShippingPrice } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumberToCurrency = (value: number) => {
  return value.toFixed(2);
};

export const roundDecimal = (value: number) => {
  return Math.round((value + Number.EPSILON) * 100) / 100;
};

export const calculatePrice = (item: CartItem[]) => {
  const subtotalPrice = roundDecimal(
    item.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );
  const shippingPrice = roundDecimal(defaultShippingPrice);
  const totalPrice = roundDecimal(subtotalPrice + shippingPrice);
  return { subtotalPrice, shippingPrice, totalPrice };
};

export const currencyFormatter = new Intl.NumberFormat("en-PH", {
  currency: "PHP",
  style: "currency",
  minimumFractionDigits: 2,
});
