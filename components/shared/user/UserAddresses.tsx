"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import UserAddressDialogContent from "./UserAddressDialogContent";
import { useQuery } from "@tanstack/react-query";
import UserAddressesList from "./UserAddressesList";
import { getUserAddressList } from "@/lib/actions/UserActions";
import { useState } from "react";
import PageLoader from "../PageLoader";

const UserAddresses = () => {
  const {
    data: userAddressesData,
    isPending,
    refetch: refetchUserAddress,
  } = useQuery({
    queryKey: ["user-addresses"],
    queryFn: getUserAddressList,
  });

  const [openDialog, setOpenDialog] = useState(false);

  return !isPending && userAddressesData && userAddressesData.addressList ? (
    <div className="h-full">
      <div className="rounded-sm ">
        <div className="flex items-center mb-5">
          <p className="text-2xl font-bold">Addresses</p>
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
        <UserAddressesList
          addressList={userAddressesData.addressList!}
          refetchUserAddress={refetchUserAddress}
        />
      </div>
    </div>
  ) : (
    <PageLoader />
  );
};

export default UserAddresses;
