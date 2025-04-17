import { auth } from "@/auth";
import CartList from "@/components/shared/cart/CartList";
import sampleData from "@/db/sample-seed-data";
import { redirect } from "next/navigation";

const CartPage = async () => {
  const session = await auth();

  if (!session) {
    return redirect("/sign-in");
  }

  const cart = sampleData.cart;
  return <CartList cart={cart} />;
};

export default CartPage;
