import { TabsContent } from "@/components/ui/tabs";
import { currencyFormatter } from "@/lib/utils";
import { Order, OrderItem } from "@/types";
import OrderToPay from "./OrderToPay";

const OrderTabContent = ({
  stage,
  orders,
  refetchOrders,
}: {
  stage: string;
  orders: Order[];
  refetchOrders: () => void;
}) => {
  return (
    <TabsContent value={stage}>
      {orders &&
        orders.map((order: Order) => (
          <div
            key={order.id}
            className="p-5 bg-slate-100 rounded-sm grid gap-5"
          >
            {order.orderItems.map((orderItem: OrderItem) => (
              <div
                className="p-5 grid grid-cols-2 bg-white rounded-sm"
                key={orderItem.productId}
              >
                <div>
                  <p className="font-bold text-base">{orderItem.name}</p>
                  <p className="text-sm text-green">
                    {orderItem.description[0]}
                  </p>
                  <p>x{orderItem.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-green font-bold">
                    {currencyFormatter.format(
                      orderItem.price * orderItem.quantity
                    )}
                  </p>
                </div>
              </div>
            ))}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="text-sm self-center">
                <span>{order.shippingAddress.name} - </span>
                <span className="text-green">
                  {order.shippingAddress.phoneNumber}
                </span>
                <p className="mt-1">{order.shippingAddress.address}</p>
              </div>
              {stage === "topay" && (
                <OrderToPay order={order} refetchOrders={refetchOrders} />
              )}
            </div>
          </div>
        ))}
    </TabsContent>
  );
};

export default OrderTabContent;
