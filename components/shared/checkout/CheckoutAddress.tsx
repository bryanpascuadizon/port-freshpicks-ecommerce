import { Badge } from "@/components/ui/badge";
import { UserAddress } from "@/types";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CheckoutAddressDialogContent from "./CheckoutAddressDialogContent";
import UserAddressDialogContent from "../user/UserAddressDialogContent";

const CheckoutAddress = ({
  addressList,
  selectedAddress,
  setSelectedAddress,
  refetechCheckoutUserAddressList,
}: {
  addressList: UserAddress[];
  selectedAddress: UserAddress;
  setSelectedAddress: (selectedAddress: UserAddress) => void;
  refetechCheckoutUserAddressList: () => void;
}) => {
  const defaultAddress = selectedAddress
    ? selectedAddress
    : addressList.find((address: UserAddress) => address.isDefault === "on");

  return defaultAddress ? (
    <div className="md:grid md:grid-cols-4 bg-slate-100 rounded-sm text-base p-5 mb-5">
      <div className="col-span-1 mb-2">
        <p>{defaultAddress.name}</p>
        <p className="text-green">{defaultAddress.phoneNumber}</p>
        {defaultAddress.isDefault === "on" && (
          <Badge className="bg-green-700">Default</Badge>
        )}
      </div>
      <div className="col-span-2 self-center mb-5">
        {defaultAddress.address}, {defaultAddress.postalCode}
      </div>
      <div className="md:flex md:justify-end col-span-1">
        <Dialog>
          <DialogTrigger className="self-center green-button py-2 px-4 rounded-md text-white text-base">
            Change Address
          </DialogTrigger>
          <CheckoutAddressDialogContent
            addressList={addressList}
            defaultAddress={defaultAddress}
            setSelectedAddress={setSelectedAddress}
          />
        </Dialog>
      </div>
    </div>
  ) : (
    <Dialog open>
      <UserAddressDialogContent
        addressLength={0}
        refetechCheckoutUserAddressList={refetechCheckoutUserAddressList}
      />
    </Dialog>
  );
};

export default CheckoutAddress;
