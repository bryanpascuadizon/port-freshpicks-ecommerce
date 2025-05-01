import { auth } from "@/auth";
import UserProfile from "@/components/shared/user/UserProfile";
import { APP_NAME } from "@/lib/constants";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `${APP_NAME} | Profile`,
};

const Profile = async () => {
  const session = await auth();

  if (!session) {
    return redirect("/sign-in");
  }

  return <UserProfile />;
};

export default Profile;
