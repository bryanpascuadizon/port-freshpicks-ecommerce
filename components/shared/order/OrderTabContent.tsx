"use client";

import { TabsContent } from "@/components/ui/tabs";
import { currencyFormatter } from "@/lib/utils";
import { Order, OrderItem } from "@/types";
import OrderToProcess from "./OrderToProcess";

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
          <div key={order.id} className="p-5 bg-slate-100 rounded-sm grid mb-5">
            {order.orderItems.map((orderItem: OrderItem) => (
              <div
                className="p-5 grid grid-cols-2 bg-white rounded-sm mb-5"
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
              <div className="text-sm">
                <p className="font-bold">Reference Number:</p>
                <p className="text-green mb-2">{order.referenceNumber}</p>
                <p className="font-bold">Shipping Address:</p>
                <span>{order.shippingAddress.name} - </span>
                <span className="text-green">
                  {order.shippingAddress.phoneNumber}
                </span>
                <p className="mt-1">{order.shippingAddress.address}</p>
              </div>
              <div>
                <div className="text-right text-sm">
                  <span className="font-bold">Subtotal Price: </span>
                  <span className="font-bold text-green">
                    {currencyFormatter.format(order.subtotalPrice)}
                  </span>
                </div>
                <div className="text-right text-sm">
                  <span className="font-bold">Shipping Fee: </span>
                  <span className="font-bold text-green">
                    {currencyFormatter.format(order.shippingPrice)}
                  </span>
                  <p className="text-xs text-green mb-2">
                    (20% of subtotal price)
                  </p>

                  <p className="font-bold text-green text-2xl self-center">
                    {currencyFormatter.format(order.totalPrice)}
                  </p>
                </div>
              </div>
            </div>
            <OrderToProcess
              order={order}
              refetchOrders={refetchOrders}
              stage={stage}
            />
          </div>
        ))}
    </TabsContent>
  );
};

export default OrderTabContent;
