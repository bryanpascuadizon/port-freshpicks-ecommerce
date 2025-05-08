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
import { getUserAuthentication } from "./UserActions";
import { orderStage } from "../constants";

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
    const user = await getUserAuthentication();

    if (user) {
      const orders = await getOrderByStage(stage, user.id!);

      if (orders) {
        return {
          success: true,
          orders,
        };
      }
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
    const process =
      order.orderStage === orderStage[1].stage
        ? orderStage[2].stage
        : orderStage[3].stage;

    const response: Order = await updateOrderToProcess(order, process);

    if (response) {
      switch (response.orderStage) {
        case orderStage[2].stage:
          return {
            success: true,
            message: "Order is ready for shipping",
          };
        case orderStage[3].stage:
          return {
            success: true,
            message: "Order has been delivered",
          };
      }

      return {
        success: false,
        message: "Something went wrong",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Something went wrong - ${error}`,
    };
  }
};
