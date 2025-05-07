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
  const shippingPrice = Number(
    (subtotalPrice * roundDecimal(defaultShippingPrice)).toFixed(0)
  );
  const totalPrice = roundDecimal(subtotalPrice + shippingPrice);
  return { subtotalPrice, shippingPrice, totalPrice };
};

export const currencyFormatter = new Intl.NumberFormat("en-PH", {
  currency: "PHP",
  style: "currency",
  minimumFractionDigits: 2,
});

export const formatPhoneNumber = (phoneNumber: string) => {
  return phoneNumber && `********* ${phoneNumber.substring(9)}`;
};

export const retrievePaymentMethodIcon = (paymentMethod: string) => {
  switch (paymentMethod) {
    case "card":
      return {
        title: "Credit Card",
        icon: "/images/payment_methods/card.png",
      };

    case "gcash":
      return {
        title: "GCash",
        icon: "/images/payment_methods/gcash.png",
      };

    case "paymaya":
      return {
        title: "PayMaya",
        icon: "/images/payment_methods/maya.png",
      };

    case "qrph":
      return {
        title: "QRPh",
        icon: "/images/payment_methods/qrph.png",
      };

    default:
      return {
        title: "",
        icon: "",
      };
  }
};

export const getUserAvatar = (name: string) => {
  const fullName = name.split(" ");
  const firstName = fullName[0].charAt(0);
  const lastName = fullName[fullName.length - 1].charAt(0);

  return `${firstName}${lastName}`;
};
