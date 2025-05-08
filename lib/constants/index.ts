export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "FRESHPICKS";

export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "Modern Microgreens E-commerce store built with Next.js";

export const defaultShippingPrice = 0.2;

export enum userSidebarMenu {
  Profile = "Profile",
  Addresses = "Addresses",
  Orders = "Orders",
}

export const GENDER = {
  Male: "Male",
  Female: "Female",
  Other: "Other",
};

export const orderStage = [
  {
    title: "To Pay",
    stage: "topay",
    process: "Pay",
  },
  {
    title: "To Ship",
    stage: "toship",
    process: "Ship",
  },
  {
    title: "To Receive",
    stage: "toreceive",
    process: "Receive",
  },
  {
    title: "Completed",
    stage: "completed",
    process: "Completed",
  },
];

export const roles = {
  User: "user",
  Admin: "admin",
  Courier: "courier",
};
