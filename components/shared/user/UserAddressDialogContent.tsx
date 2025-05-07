import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { submitAddress } from "@/lib/actions/UserActions";
import { useActionState, useEffect } from "react";
import ButtonLoader from "../ButtonLoader";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogClose } from "@radix-ui/react-dialog";
import { redirect } from "next/navigation";

const UserAddressDialogContent = ({
  setOpenDialog,
  refetchUserAddress,
  refetechCheckoutUserAddressList,
  addressLength,
}: {
  setOpenDialog?: (state: boolean) => void;
  refetchUserAddress?: () => void;
  refetechCheckoutUserAddressList?: () => void;
  addressLength: number;
}) => {
  const [state, action, isPending] = useActionState(submitAddress, {
    success: false,
    message: "",
  });

  useEffect(() => {
    const closeDialog = async () => {
      if (state.success) {
        if (setOpenDialog) {
          setOpenDialog(false);
        }

        if (refetchUserAddress) {
          await refetchUserAddress();
          return;
        }

        if (refetechCheckoutUserAddressList) {
          await refetechCheckoutUserAddressList();

          return;
        }
      }
    };

    closeDialog();
  }, [
    state,
    refetchUserAddress,
    setOpenDialog,
    refetechCheckoutUserAddressList,
  ]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>New Address</DialogTitle>
        <DialogDescription>
          Add your address to be used as delivery address
        </DialogDescription>
        <form action={action}>
          <div className="text-sm mb-5">
            <Input id="name" name="name" placeholder="Full Name" required />
          </div>
          <div className="flex text-sm gap-5 mb-5">
            <div className="w-1/2">
              <Input
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
                required
              />
            </div>
            <div className="w-1/2">
              <Input
                id="postalCode"
                name="postalCode"
                placeholder="Postal Code"
                required
              />
            </div>
          </div>
          <div className="text-sm mb-5">
            <Input
              id="address"
              name="address"
              placeholder="House No, Street name, Subdivision, City, State"
              required
            />
          </div>
          {addressLength > 0 && (
            <div className="text-sm mb-5">
              Set as default?{" "}
              <Checkbox
                id="isDefault"
                name="isDefault"
                className="cursor-pointer ml-2"
              />
            </div>
          )}
          <DialogFooter className="flex gap-2">
            <div className="w-1/2">
              <DialogClose asChild>
                <Button
                  className="w-full green-button-alternate"
                  onClick={() => {
                    if (setOpenDialog) {
                      setOpenDialog(false);
                      return;
                    }

                    redirect("/cart");
                  }}
                >
                  Cancel
                </Button>
              </DialogClose>
            </div>
            <div className="w-1/2">
              <Button className="w-full green-button" type="submit">
                {isPending ? <ButtonLoader /> : "Add"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogHeader>
    </DialogContent>
  );
};

export default UserAddressDialogContent;
