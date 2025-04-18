import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface CartSummaryProps {
  subtotalPrice: number;
  shippingPrice: number;
  totalPrice: number;
}

const CartSummary = ({
  subtotalPrice,
  shippingPrice,
  totalPrice,
}: CartSummaryProps) => {
  return (
    <div className="rounded-lg bg-slate-100 p-5">
      <div className="grid grid-cols-2 mb-5">
        <p>Subtotal</p>
        <p className="text-right font-bold">{subtotalPrice}</p>
      </div>
      <div className="grid grid-cols-2 mb-5">
        <p>Shipping Price</p>
        <p className="text-right font-bold">{shippingPrice}</p>
      </div>
      <Separator className="bg-black mb-5" />
      <div className="grid grid-cols-2">
        <p>Total Price</p>
        <p className="text-right font-bold mb-5">{totalPrice}</p>
      </div>
      <Button className="text-center w-full bg-green-700">Place Order</Button>
    </div>
  );
};

export default CartSummary;
