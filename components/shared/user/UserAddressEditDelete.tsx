"use client";

import { Button } from "@/components/ui/button";
import { Loader, Trash2 } from "lucide-react";
import { useEffect, useTransition } from "react";
import { UserAddress } from "@/types";
import { deleteAddress, updateDefaultAddress } from "@/lib/actions/UserActions";
import { toast } from "sonner";

import UserAddressEditDialogContent from "./UserAddressEditDeleteDialogContent";

const UserAddressEditDelete = ({
  address,
  refetchUserAddress,
}: {
  address: UserAddress;
  refetchUserAddress: () => void;
}) => {
  const [isPending, startTransition] = useTransition();
  const [isDefaultAddressPending, startTransitionDefaultAddress] =
    useTransition();

  const handleDeleteAddress = () => {
    startTransition(async () => {
      const response = await deleteAddress(address.id);

      if (response.success) {
        await refetchUserAddress();
        toast(<p className="toast-text">{response.message}</p>);
      }
    });
  };

  const handleSetAsDefault = () => {
    startTransitionDefaultAddress(async () => {
      const response = await updateDefaultAddress(address.id);

      if (response.success) {
        await refetchUserAddress();
        toast(<p className="toast-text">{response.message}</p>);
      }
    });
  };

  return (
    <>
      <div className="ml-auto">
        <div className="flex gap-2 justify-end mb-2">
          <UserAddressEditDialogContent
            address={address}
            refetchUserAddress={refetchUserAddress}
          />
          {isPending ? (
            <Loader className="animate-spin" width={20} height={20} />
          ) : (
            <>
              {address.isDefault === null && (
                <Trash2
                  width={20}
                  height={20}
                  className="text-red-700 cursor-pointer"
                  onClick={handleDeleteAddress}
                />
              )}
            </>
          )}
        </div>
        {!address.isDefault && (
          <>
            <Button
              className="green-button min-w-[100px] max-h-5 text-xs"
              onClick={handleSetAsDefault}
            >
              {isDefaultAddressPending ? (
                <Loader
                  className="animate-spin min-w-[87px]"
                  width={20}
                  height={20}
                />
              ) : (
                "Set as default"
              )}
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default UserAddressEditDelete;
