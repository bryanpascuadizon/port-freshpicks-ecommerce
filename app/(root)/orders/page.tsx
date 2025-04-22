import { auth } from "@/auth";

import { redirect } from "next/navigation";

const OrdersPage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  return <>Payment Successful</>;
};

export default OrdersPage;
