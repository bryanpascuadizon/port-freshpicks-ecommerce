import { userSidebarMenu } from "@/lib/constants";
import Link from "next/link";

const UserSidebar = ({ linkHighlighted }: { linkHighlighted: string }) => {
  const UserLink = ({ href, label }: { href: string; label: string }) => {
    return (
      <Link
        href={href}
        className={`ml-5 mb-2 block ${
          label === linkHighlighted && "text-green font-bold"
        }`}
      >
        {label}
      </Link>
    );
  };
  return (
    <div className="col-span-1 p-5 border-r-1 border-r-slate-200">
      <div className="mb-2">My Account</div>
      <UserLink href="/user/account/profile" label={userSidebarMenu.Profile} />
      <UserLink
        href="/user/account/addresses"
        label={userSidebarMenu.Addresses}
      />
      <UserLink href="/user/orders" label={userSidebarMenu.Orders} />
    </div>
  );
};

export default UserSidebar;
