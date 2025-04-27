"use client";

import { getUserProfile } from "@/lib/actions/UserActions";
import { useQuery } from "@tanstack/react-query";
import UserSidebar from "./UserSidebar";
import { userSidebarMenu } from "@/lib/constants";

const UserProfile = () => {
  const { data: user } = useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
  });

  return (
    user && (
      <div className="grid grid-cols-4 gap-5">
        <UserSidebar linkHighlighted={userSidebarMenu.Profile} />
        <div className="col-span-3 p-5 rounded-sm ">
          <div className="grid grid-cols-4 gap-5">
            <div className="col-span-1 text-right">
              <p className="mb-5 text-green-700">Name</p>
              <p className="mb-5 text-green-700">Email</p>
              <p className="mb-5 text-green-700">Phone Number</p>
              <p className="mb-5 text-green-700">Gender</p>
              <p className="mb-5 text-green-700">Date of Birth</p>
            </div>
            <div className="col-span-3">
              <p className="mb-5">{user.name}</p>
              <p className="mb-5">{user.email}</p>
              <p className="mb-5 ">
                ********* {user.phone_number.substring(9)}
              </p>
              <p className="mb-5">Male</p>
              <p className="mb-5">**/**/1996</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UserProfile;
