import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CheckoutAddress = () => {
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
        <p>Bryan Dizon</p>
        <p className="text-green-700">0962 846 0174</p>
      </div>
      <div className="col-span-2 self-center mb-5">
        16 Arsenio Jison, Executive Villagers&apos; Society, BF Homes, Parañaque
        City
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
