import { auth } from "@/auth";
import UserAddresses from "@/components/shared/user/UserAddresses";
import { redirect } from "next/navigation";

const Addresses = async () => {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }
  return <UserAddresses />;
};

export default Addresses;
