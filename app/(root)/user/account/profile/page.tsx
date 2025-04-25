import UserSidebar from "@/components/shared/user/UserSidebar";
import { getUserProfile } from "@/lib/actions/UserActions";
import { userSidebarMenu } from "@/lib/constants";
import { User } from "@/types";

const Profile = async () => {
  const user: User = await getUserProfile();

  return (
    user && (
      <div className="grid grid-cols-4 gap-5">
        <UserSidebar linkHighlighted={userSidebarMenu.Profile} />
        <div className="col-span-3 p-5 rounded-sm bg-slate-100">
          <div className="grid grid-cols-4 gap-5">
            <div className="col-span-1 text-right">
              <p className="mb-5">Name</p>
              <p className="mb-5">Email</p>
            </div>
            <div className="col-span-3">
              <p>{user.name}</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
