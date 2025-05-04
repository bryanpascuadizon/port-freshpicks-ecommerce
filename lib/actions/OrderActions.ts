import { getOrderByReferenceNumber } from "../handlers/orderHandlers";
import { Order } from "@/types";

export const getSuccessFulOrder = async (referenceNumber: string) => {
  try {
    const order: Order = await getOrderByReferenceNumber(referenceNumber);

    if (order) {
      return {
        success: true,
        order,
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
