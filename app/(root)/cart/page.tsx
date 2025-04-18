import { auth } from "@/auth";
import CartList from "@/components/shared/cart/CartList";
import { redirect } from "next/navigation";

const CartPage = async () => {
  const session = await auth();

  if (!session) {
    return redirect("/sign-in");
  }

  return <CartList />;
};

export default CartPage;
