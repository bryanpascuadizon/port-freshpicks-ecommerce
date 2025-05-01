import { Badge } from "@/components/ui/badge";
import { UserAddress } from "@/types";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {} from "@radix-ui/react-dialog";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioGroupItem } from "@/components/ui/radio-group";

const CheckoutAddress = ({
  addressList,
  selectedAddress,
  setSelectedAddress,
}: {
  addressList: UserAddress[];
  selectedAddress: UserAddress;
  setSelectedAddress: (selectedAddress: UserAddress) => void;
}) => {
  const defaultAddress = selectedAddress
    ? selectedAddress
    : addressList.find((address: UserAddress) => address.isDefault === "on");

  return (
    defaultAddress && (
      <div className="md:grid md:grid-cols-4 bg-slate-100 rounded-sm text-base p-5 mb-5">
        <div className="col-span-1 mb-2">
          <p>{defaultAddress.name}</p>
          <p className="text-green-700">{defaultAddress.phoneNumber}</p>
          {defaultAddress.isDefault === "on" && (
            <Badge className="bg-green-700">Default</Badge>
          )}
        </div>
        <div className="col-span-2 self-center mb-5">
          {defaultAddress.address}, {defaultAddress.postalCode}
        </div>
        <div className="md:flex md:justify-end col-span-1">
          <Dialog>
            <DialogTrigger className="self-center green-button p-2 rounded-md text-white">
              Change Address
            </DialogTrigger>
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
                        <p className="mb-1 text-green-700">
                          {address.phoneNumber}
                        </p>
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
          </Dialog>
        </div>
      </div>
    )
  );
};

export default CheckoutAddress;
