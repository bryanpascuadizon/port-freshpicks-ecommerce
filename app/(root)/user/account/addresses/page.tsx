import { auth } from "@/auth";
import UserAddresses from "@/components/shared/user/UserAddresses";
import { APP_NAME } from "@/lib/constants";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `${APP_NAME} | Addresses`,
};

const Addresses = async () => {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }
  return <UserAddresses />;
};

export default Addresses;
