import { auth } from "@/auth";
import UserOrder from "@/components/shared/order/UserOrder";
import { APP_NAME } from "@/lib/constants";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `${APP_NAME} | Orders`,
};

const Orders = async () => {
  const session = await auth();

  if (!session) {
    return redirect("/sign-in");
  }

  return <UserOrder />;
};

export default Orders;
