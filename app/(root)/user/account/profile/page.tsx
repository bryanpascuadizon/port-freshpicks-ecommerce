import { auth } from "@/auth";
import UserProfile from "@/components/shared/user/UserProfile";
import { redirect } from "next/navigation";

const Profile = async () => {
  const session = await auth();

  if (!session) {
    return redirect("/sign-in");
  }

  return <UserProfile />;
};

export default Profile;
