import { Button } from "@/components/ui/button";
import {
  cancelPendingOrder,
  payPendingOrder,
} from "@/lib/actions/OrderActions";
import { orderStage } from "@/lib/constants";
import { currencyFormatter } from "@/lib/utils";
import { Order } from "@/types";
import { Loader } from "lucide-react";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

const OrderToPay = ({
  order,
  refetchOrders,
}: {
  order: Order;
  refetchOrders: () => void;
}) => {
  const [isCancelPending, startCancelTransition] = useTransition();
  const [isPaymentPending, startPaymentTransition] = useTransition();

  const handleCancelOrder = (order: string) => {
    startCancelTransition(async () => {
      const response = await cancelPendingOrder(order);

      if (response.success) {
        await refetchOrders();
        toast(
          <p className="toast-text text-destructive">{response.message}</p>
        );
      }
    });
  };

  const handlePaymentOrder = (order: Order) => {
    startPaymentTransition(async () => {
      const response = await payPendingOrder(order);

      if (response.success) {
        redirect(response.paymongoResponse.data.attributes.checkout_url);
      }
    });
  };

  return (
    <div className="">
      <p className="text-right text-sm mb-5">
        Shipping Fee:{" "}
        <span className="font-bold text-green">
          {currencyFormatter.format(order.shippingPrice)}
        </span>
      </p>
      <div className="flex justify-end gap-2">
        <Button
          className="green-button-alternate min-w-[120px] self-center"
          onClick={() => handleCancelOrder(order.referenceNumber)}
        >
          {isCancelPending ? <Loader className="animate-spin" /> : "Cancel"}
        </Button>
        <Button
          className="green-button min-w-[120px] self-center"
          onClick={() => handlePaymentOrder(order)}
        >
          {" "}
          {isPaymentPending ? (
            <Loader className="animate-spin" />
          ) : (
            orderStage[0].process
          )}
        </Button>
        <p className="font-bold text-green text-lg self-center">
          {currencyFormatter.format(order.totalPrice)}
        </p>
      </div>
    </div>
  );
};

export default OrderToPay;
