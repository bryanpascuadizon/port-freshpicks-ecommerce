import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserAddress } from "@/types";
import { toast } from "sonner";

const CheckoutAddress = ({ addressList }: { addressList: UserAddress[] }) => {
  const defaultAddress = addressList.find(
    (address: UserAddress) => address.isDefault === "on"
  );

  const handleChangeAddress = () => {
    toast(
      <p className="toast-text text-destructive">
        Changing address is not available right now
      </p>
    );
  };

  return (
    <div className="md:grid md:grid-cols-4 bg-slate-100 rounded-sm text-base p-5 mb-5">
      <div className="col-span-1 mb-2">
        <p>{defaultAddress?.name}</p>
        <p className="text-green-700">{defaultAddress?.phoneNumber}</p>
        <Badge className="bg-green-700">Default</Badge>
      </div>
      <div className="col-span-2 self-center mb-5">
        {defaultAddress?.address}, {defaultAddress?.postalCode}
      </div>
      <div className="md:flex md:justify-end col-span-1">
        <Button
          className="self-center green-button"
          onClick={handleChangeAddress}
        >
          Change Address
        </Button>
      </div>
    </div>
  );
};

export default CheckoutAddress;
