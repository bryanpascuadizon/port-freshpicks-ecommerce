import { UserAddress } from "@/types";
import { Badge } from "@/components/ui/badge";

const UserAddressesList = ({ addressList }: { addressList: UserAddress[] }) => {
  return addressList && addressList.length ? (
    <>
      {addressList.map((address: UserAddress, index) => (
        <div className="bg-slate-100 p-3 rounded-sm mb-5 text-sm" key={index}>
          <p className="mb-1">{address.name}</p>
          <p className="mb-1 text-green-700">{address.phoneNumber}</p>
          <p className="mb-1">
            {address.address}, {address.postalCode}
          </p>
          {address.isDefault && <Badge className="bg-green-700">Default</Badge>}
        </div>
      ))}
    </>
  ) : (
    <>Please add your address</>
  );
};

export default UserAddressesList;
