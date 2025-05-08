import { Button } from "@/components/ui/button";
import {
  cancelPendingOrder,
  payPendingOrder,
  processOrder,
} from "@/lib/actions/OrderActions";
import { getUserProfile } from "@/lib/actions/UserActions";
import { orderStage, roles } from "@/lib/constants";
import { Order } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

const OrderToProcess = ({
  order,
  stage,
  refetchOrders,
}: {
  order: Order;
  stage: string;
  refetchOrders: () => void;
}) => {
  const { data: user } = useQuery({
    queryKey: ["user-order-process"],
    queryFn: getUserProfile,
  });
  const [isCancelPending, startCancelTransition] = useTransition();
  const [isPaymentPending, startPaymentTransition] = useTransition();
  const [isProcessPending, startProcessTransition] = useTransition();

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

  const handleProcessOrder = () => {
    startProcessTransition(async () => {
      const response = await processOrder(order);

      if (response && response.success) {
        await refetchOrders();
        toast(<p className="toast-text">{response.message}</p>);
      }
    });
  };

  const status = orderStage.find((os) => os.stage === stage);

  return (
    <div className="mt-3">
      <div className="flex justify-end gap-2">
        {user && (
          <>
            {user.role === roles.User && stage === orderStage[0].stage && (
              <>
                <Button
                  className="green-button-alternate min-w-[120px] self-center"
                  onClick={() => handleCancelOrder(order.referenceNumber)}
                >
                  {isCancelPending ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Cancel"
                  )}
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
              </>
            )}

            {user.role === roles.Admin &&
              stage !== orderStage[0].stage &&
              stage !== orderStage[3].stage && (
                <Button
                  className="green-button min-w-[120px] self-center"
                  onClick={() => handleProcessOrder()}
                >
                  {isProcessPending ? (
                    <Loader className="animate-spin" />
                  ) : (
                    status?.process
                  )}
                </Button>
              )}
          </>
        )}
      </div>
    </div>
  );
};

export default OrderToProcess;
