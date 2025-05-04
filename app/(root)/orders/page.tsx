import { auth } from "@/auth";
import SuccessOrder from "@/components/shared/order/SuccessOrder";

import { redirect } from "next/navigation";

const OrdersPage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  return <SuccessOrder />;
};

export default OrdersPage;
