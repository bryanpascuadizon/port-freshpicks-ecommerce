import { auth } from "@/auth";
import CheckoutList from "@/components/shared/checkout/CheckoutList";
import { APP_NAME } from "@/lib/constants";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `${APP_NAME} | Checkout`,
};

const CheckoutPage = async () => {
  const session = await auth();

  if (!session) {
    return redirect("/sign-in");
  }

  return <CheckoutList />;
};

export default CheckoutPage;
