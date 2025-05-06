import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { UserAddress } from "@/types";
import { Badge } from "@/components/ui/badge";

const CheckoutAddressDialogContent = ({
  addressList,
  defaultAddress,
  setSelectedAddress,
}: {
  addressList: UserAddress[];
  defaultAddress: UserAddress;
  setSelectedAddress: (address: UserAddress) => void;
}) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Change Address</DialogTitle>
        <DialogDescription>
          Choose an address to be used as delivery address
        </DialogDescription>
        <RadioGroup defaultValue={defaultAddress.id}>
          {addressList.map((address: UserAddress) => (
            <div
              className="flex items-center gap-5 cursor-pointer"
              onClick={() => {
                setSelectedAddress(address);
              }}
              key={address.id}
            >
              <RadioGroupItem
                value={address.id}
                id={address.id}
                className="cursor-pointer"
                checked={defaultAddress.id === address.id}
              />
              <div className="p-2 text-xs">
                <p className="mb-1">{address.name}</p>
                <p className="mb-1 text-green">{address.phoneNumber}</p>
                <p className="mb-1">{address.address}</p>
                {address.isDefault === "on" && (
                  <Badge className="bg-green-700">Default</Badge>
                )}
              </div>
            </div>
          ))}
        </RadioGroup>
      </DialogHeader>
    </DialogContent>
  );
};

export default CheckoutAddressDialogContent;
