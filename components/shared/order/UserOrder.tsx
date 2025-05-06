"use client";

import { orderStage } from "@/lib/constants";
import { Tabs, TabsList } from "@radix-ui/react-tabs";
import { useState } from "react";
import { TabsTrigger } from "@/components/ui/tabs";
import OrderTabContent from "./OrderTabContent";
import { useQuery } from "@tanstack/react-query";
import { getUserOrders } from "@/lib/actions/OrderActions";
import NoOrderContent from "./NoOrderContent";

const UserOrder = () => {
  const [tab, setTab] = useState(orderStage[0].stage);

  const { data, refetch: refetchOrders } = useQuery({
    queryKey: ["order-stage", tab],
    queryFn: async () => {
      const response = await getUserOrders(tab);

      return response;
    },
  });

  return (
    <div className="h-full">
      <p className="text-2xl font-bold mb-5">My Orders</p>
      <Tabs defaultValue={orderStage[0].stage} className="w-full">
        <TabsList className="flex justify-between w-full mb-5">
          {orderStage.map((order: { title: string; stage: string }) => (
            <TabsTrigger
              key={order.stage}
              value={order.stage}
              className={`cursor-pointer p-[-10px] ${
                order.stage === tab &&
                "bg-green-700  border-green-700 rounded-md"
              }`}
              onClick={() => {
                setTab(order.stage);
              }}
            >
              <div
                className={`
                    ${
                      order.stage === tab &&
                      "bg-green-700 text-white font-bold h-full w-full rounded-sm p-1"
                    }
                  `}
              >
                {order.title}
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
        {data && data.orders.length ? (
          <OrderTabContent
            stage={tab}
            orders={data.orders}
            refetchOrders={refetchOrders}
          />
        ) : (
          <NoOrderContent />
        )}
      </Tabs>
    </div>
  );
};

export default UserOrder;
