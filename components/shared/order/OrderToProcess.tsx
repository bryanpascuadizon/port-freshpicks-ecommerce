import { Button } from "@/components/ui/button";
import { processOrder } from "@/lib/actions/OrderActions";
import { orderStage } from "@/lib/constants";
import { currencyFormatter } from "@/lib/utils";
import { Order } from "@/types";
import { Loader } from "lucide-react";
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
  const [isProcessPending, startProcessTransition] = useTransition();

  const handleProcessOrder = () => {
    startProcessTransition(async () => {
      const response = await processOrder(order);

      if (response.success) {
        await refetchOrders();
        toast(<p className="toast-text">{response.message}</p>);
      }
    });
  };

  const status = orderStage.find((os) => os.stage === stage);

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
          className="green-button min-w-[120px] self-center"
          onClick={() => handleProcessOrder()}
        >
          {isProcessPending ? (
            <Loader className="animate-spin" />
          ) : (
            status?.process
          )}
        </Button>
        <p className="font-bold text-green text-lg self-center">
          {currencyFormatter.format(order.totalPrice)}
        </p>
      </div>
    </div>
  );
};

export default OrderToProcess;
