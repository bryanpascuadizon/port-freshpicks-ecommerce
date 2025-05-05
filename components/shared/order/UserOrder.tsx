"use client";

import { orderStage, userSidebarMenu } from "@/lib/constants";
import UserSidebar from "../user/UserSidebar";
import { Tabs, TabsList } from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import { TabsContent, TabsTrigger } from "@/components/ui/tabs";
import OrderTabContent from "./OrderTabContent";

const UserOrder = () => {
  const [tab, setTab] = useState(orderStage[0]);

  const handleChangeTab = () => {};

  return (
    <div className="grid grid-cols-4 gap-5">
      <UserSidebar linkHighlighted={userSidebarMenu.Orders} />
      <div className="col-span-3 p-5 rounded-sm bg-slate-100">
        <Tabs defaultValue={orderStage[0]} className="w-full">
          <TabsList className="flex justify-between w-full mb-5">
            {orderStage.map((stage: string) => (
              <TabsTrigger
                key={stage}
                value={stage}
                className="cursor-pointer"
                onClick={() => {
                  setTab(stage);
                }}
              >
                {stage}
              </TabsTrigger>
            ))}
          </TabsList>
          <OrderTabContent tab={tab} />
        </Tabs>
      </div>
    </div>
  );
};

export default UserOrder;
