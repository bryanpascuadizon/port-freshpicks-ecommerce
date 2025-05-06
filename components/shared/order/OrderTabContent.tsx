import { TabsContent } from "@/components/ui/tabs";
import { currencyFormatter } from "@/lib/utils";
import { Order, OrderItem } from "@/types";
import { Button } from "@/components/ui/button";

const OrderTabContent = ({
  stage,
  orders,
}: {
  stage: string;
  orders: Order[];
}) => {
  return (
    <TabsContent value={stage}>
      {orders &&
        orders.map((order: Order) => (
          <div key={order.id} className="p-5 bg-slate-100 rounded-sm mb-5">
            {order.orderItems.map((orderItem: OrderItem, index) => (
              <div
                className={`p-5 grid grid-cols-2 bg-white rounded-sm ${
                  index < order.orderItems.length - 1 && "mb-5"
                }`}
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
            <div className="mt-5 grid grid-cols-2">
              <div className="text-xs">
                <span>{order.shippingAddress.name} - </span>
                <span className="text-green">
                  {order.shippingAddress.phoneNumber}
                </span>
                <p className="mt-1">{order.shippingAddress.address}</p>
              </div>
              <div className="flex justify-end gap-2">
                <Button className="green-button-alternate min-w-[80px]">
                  Cancel
                </Button>
                <Button className="green-button min-w-[80px]">Pay</Button>
                <p className="font-bold text-green text-lg self-center">
                  {currencyFormatter.format(order.subtotalPrice)}
                </p>
              </div>
            </div>
          </div>
        ))}
    </TabsContent>
  );
};

export default OrderTabContent;
