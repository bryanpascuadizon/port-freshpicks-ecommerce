import {
  cancelOrderByReferenceNumber,
  createCheckoutSession,
} from "../handlers/checkoutHandlers";
import {
  getOrderByReferenceNumber,
  getOrderByStage,
  updateOrderToProcess,
} from "../handlers/orderHandlers";
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

export const getUserOrders = async (stage: string) => {
  try {
    const orders = await getOrderByStage(stage);

    if (orders) {
      return {
        success: true,
        orders,
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

export const cancelPendingOrder = async (referenceNumber: string) => {
  try {
    const response = await cancelOrderByReferenceNumber(referenceNumber);

    if (response) {
      return {
        success: true,
        message: response,
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

export const payPendingOrder = async (order: Order) => {
  try {
    const paymongoResponse = await createCheckoutSession(order);

    if (paymongoResponse) {
      return {
        success: true,
        paymongoResponse,
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

export const processOrder = async (order: Order) => {
  try {
    const response = await updateOrderToProcess(order);

    if (response) {
      return {
        success: true,
        message: response,
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
