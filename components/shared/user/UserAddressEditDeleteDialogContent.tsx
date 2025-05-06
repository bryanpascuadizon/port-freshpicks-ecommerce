"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { updateAddress } from "@/lib/actions/UserActions";
import { UserAddress } from "@/types";
import { Edit } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import ButtonLoader from "../ButtonLoader";
import { toast } from "sonner";

const UserAddressEditDialogContent = ({
  address,
  refetchUserAddress,
}: {
  address: UserAddress;
  refetchUserAddress: () => void;
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [state, action, isPending] = useActionState(updateAddress, {
    success: false,
    message: "",
  });

  useEffect(() => {
    const closeDialog = async () => {
      if (state.success) {
        setOpenDialog(false);
        await refetchUserAddress();

        toast(<p className="toast-text">{state.message}</p>);
      }
    };

    closeDialog();
  }, [state, refetchUserAddress, setOpenDialog]);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger>
        <Edit width={20} height={20} className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Update Address</DialogTitle>
        <DialogDescription className="text-green">
          Default Address
        </DialogDescription>
        <form action={action}>
          <Input
            id="id"
            name="id"
            defaultValue={address.id}
            className="hidden"
          />
          <div className="text-sm mb-5">
            <Input id="name" name="name" defaultValue={address.name} required />
          </div>
          <div className="flex text-sm gap-5 mb-5">
            <div className="w-1/2">
              <Input
                id="phoneNumber"
                name="phoneNumber"
                defaultValue={address.phoneNumber}
                required
              />
            </div>
            <div className="w-1/2">
              <Input
                id="postalCode"
                name="postalCode"
                defaultValue={address.postalCode}
                required
              />
            </div>
          </div>
          <div className="text-sm mb-5">
            <Input
              id="address"
              name="address"
              defaultValue={address.address}
              required
            />
          </div>
          {!address.isDefault && (
            <div className="text-sm mb-5">
              Set as default?{" "}
              <Checkbox
                disabled={address.isDefault === "on" ? true : false}
                className="cursor-pointer ml-2"
                id="isDefault"
                name="isDefault"
              />
            </div>
          )}
          <DialogFooter className="flex gap-2 w-full">
            <div className="w-1/2">
              <DialogClose asChild>
                <Button
                  className="w-full green-button-alternate"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </Button>
              </DialogClose>
            </div>
            <div className="w-1/2">
              <Button className="w-full green-button" type="submit">
                {isPending ? <ButtonLoader /> : "Update"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserAddressEditDialogContent;
