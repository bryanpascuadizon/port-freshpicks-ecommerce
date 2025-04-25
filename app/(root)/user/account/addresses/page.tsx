import UserSidebar from "@/components/shared/user/UserSidebar";
import { userSidebarMenu } from "@/lib/constants";

const Addresses = () => {
  return (
    <div className="grid grid-cols-4 gap-5">
      <UserSidebar linkHighlighted={userSidebarMenu.Addresses} />
      <div className="col-span-3 p-5 rounded-sm bg-slate-100"> Addresses</div>
    </div>
  );
};

export default Addresses;
