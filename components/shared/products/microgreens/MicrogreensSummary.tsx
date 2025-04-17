import { Separator } from "@/components/ui/separator";
import { formatNumberToCurrency } from "@/lib/utils";
import React from "react";

interface MicrogreenSummaryProps {
  name: string;
  price: number;
  quantity: number;
}

const MicrogreensSummary = ({
  name,
  price,
  quantity,
}: MicrogreenSummaryProps) => {
  return (
    <div className="rounded-lg bg-slate-100 p-5">
      <p className="text-2xl font-bold mb-5">Summary</p>
      <div className="flex justify-between w-full mb-5">
        <p className="font-bold">{name}</p>
        <p>₱ {price}</p>
      </div>
      <div className="flex justify-between w-full mb-5">
        <p className="font-bold">Quantity</p>
        <p>x {quantity}</p>
      </div>
      <Separator className="my-5" />
      <div className="flex justify-between w-full mb-5">
        <p className="font-bold">Total</p>
        <p className="text-green-700">
          ₱ {formatNumberToCurrency(price * quantity)}
        </p>
      </div>
    </div>
  );
};

export default MicrogreensSummary;
