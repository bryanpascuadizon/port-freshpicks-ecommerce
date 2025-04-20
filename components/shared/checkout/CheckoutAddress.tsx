import { Button } from "@/components/ui/button";

const CheckoutAddress = () => {
  return (
    <div className="grid grid-cols-4 bg-slate-100 rounded-sm text-base p-5 mb-5">
      <div className="col-span-1">
        <p>Bryan Dizon</p>
        <p className="text-green-700">0962 846 0174</p>
      </div>
      <div className="col-span-2 self-center">
        16 Arsenio Jison, Executive Villagers&apos; Society, BF Homes, Parañaque
        City
      </div>
      <div className="flex justify-end col-span-1">
        <Button className="self-center green-button">Change Address</Button>
      </div>
    </div>
  );
};

export default CheckoutAddress;
