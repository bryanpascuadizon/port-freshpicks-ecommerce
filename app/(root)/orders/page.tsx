import { auth } from "@/auth";
import Link from "next/link";

import { redirect } from "next/navigation";

const OrdersPage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="text-center my-10">
      <p className="text-5xl text-green-700 mb-5">Thank you!</p>
      <p className="text-md mb-5">Payment done successfully</p>

      <p className="text-sm mb-5">
        Continue shopping{" "}
        <Link href="/" className="text-green-700">
          here
        </Link>
      </p>
    </div>
  );
};

export default OrdersPage;
