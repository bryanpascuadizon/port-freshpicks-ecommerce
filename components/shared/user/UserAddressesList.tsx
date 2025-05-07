import { UserAddress } from "@/types";
import { Badge } from "@/components/ui/badge";
import UserAddressEditDelete from "./UserAddressEditDelete";
import { House } from "lucide-react";

const UserAddressesList = ({
  addressList,
  refetchUserAddress,
}: {
  addressList: UserAddress[];
  refetchUserAddress: () => void;
}) => {
  return addressList && addressList.length ? (
    <div className="w-full bg-slate-100 rounded-sm p-5 grid gap-5">
      {addressList.map((address: UserAddress, index) => (
        <div
          className={`bg-white p-5 rounded-sm text-sm flex gap-3`}
          key={index}
        >
          <div>
            <p className="mb-1">{address.name}</p>
            <p className="mb-1 text-green">{address.phoneNumber}</p>
            <p className="mb-1">
              {address.address}, {address.postalCode}
            </p>
            {address.isDefault && (
              <Badge className="bg-green-700">Default</Badge>
            )}
          </div>
          <UserAddressEditDelete
            address={address}
            refetchUserAddress={refetchUserAddress}
          />
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center mt-20">
      <House className="text-green mb-5 m-auto" width={100} height={100} />
      <p className="text-base">No addresses</p>
    </div>
  );
};

export default UserAddressesList;
