import UserOrder from "@/components/shared/order/UserOrder";
import { APP_NAME } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${APP_NAME} | Orders`,
};

const Orders = () => {
  return <UserOrder />;
};

export default Orders;
