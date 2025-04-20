import { auth } from "@/auth";
import CartList from "@/components/shared/cart/CartList";
import { APP_NAME } from "@/lib/constants";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `${APP_NAME} | Shopping Cart`,
};

const CartPage = async () => {
  const session = await auth();

  if (!session) {
    return redirect("/sign-in");
  }

  return <CartList />;
};

export default CartPage;
