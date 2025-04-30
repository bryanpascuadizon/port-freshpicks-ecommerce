"use client";

import UserSidebar from "./UserSidebar";
import { userSidebarMenu } from "@/lib/constants";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import UserAddressDialogContent from "./UserAddressDialogContent";
import { useQuery } from "@tanstack/react-query";
import UserAddressesList from "./UserAddressesList";
import { getUserAddressList } from "@/lib/actions/UserActions";
import { useState } from "react";

const UserAddresses = () => {
  const { data: userAddressesData, refetch: refetchUserAddress } = useQuery({
    queryKey: ["user-addresses"],
    queryFn: getUserAddressList,
  });

  const [openDialog, setOpenDialog] = useState(false);

  return (
    userAddressesData &&
    userAddressesData.addressList && (
      <div className="grid grid-cols-4 gap-5 h-full">
        <UserSidebar linkHighlighted={userSidebarMenu.Addresses} />
        <div className="col-span-3 p-5 rounded-sm ">
          <div className="flex items-center mb-5">
            <p className="text-lg font-bold">Addresses</p>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger
                className="bg-green-700 text-white p-2 pr-4 pl-4 text-sm rounded-sm ml-auto cursor-pointer"
                onClick={() => setOpenDialog(true)}
              >
                Add New Address
              </DialogTrigger>
              <UserAddressDialogContent
                setOpenDialog={setOpenDialog}
                refetchUserAddress={refetchUserAddress}
                addressLength={userAddressesData.addressList.length}
              />
            </Dialog>
          </div>
          <div className="w-full">
            <UserAddressesList
              addressList={userAddressesData.addressList!}
              refetchUserAddress={refetchUserAddress}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default UserAddresses;
