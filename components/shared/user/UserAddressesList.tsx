import { UserAddress } from "@/types";
import { Badge } from "@/components/ui/badge";
import UserAddressEditDelete from "./UserAddressEditDelete";

const UserAddressesList = ({
  addressList,
  refetchUserAddress,
}: {
  addressList: UserAddress[];
  refetchUserAddress: () => void;
}) => {
  return addressList && addressList.length ? (
    <>
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
    </>
  ) : (
    <>Please add your address</>
  );
};

export default UserAddressesList;
