import { Button } from "@/components/ui/button";
import { createSessionForCheckout } from "@/lib/actions/CheckoutAction";
import { currencyFormatter } from "@/lib/utils";
import { useTransition } from "react";
import ButtonLoader from "../ButtonLoader";
import { redirect } from "next/navigation";
import { Cart, UserAddress } from "@/types";
import { toast } from "sonner";
import Link from "next/link";

const CheckoutPriceBreakdown = ({
  subtotalPrice,
  shippingPrice,
  totalPrice,
  cart,
  selectedAddress,
}: {
  subtotalPrice: number;
  shippingPrice: number;
  totalPrice: number;
  cart: Cart;
  selectedAddress: UserAddress;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleCheckout = () => {
    startTransition(async () => {
      const response = await createSessionForCheckout(cart, selectedAddress);

      if (response.success) {
        redirect(response.paymongoResponse.data.attributes.checkout_url);
      }

      toast(
        <div className="toast-text flex gap-5">
          <div className="text-destructive">
            <p>{response.message}</p>
          </div>
          <div className="text-center self-center">
            <Button className="green-button">
              <Link href="/user/orders" className="text-white">
                View My Orders
              </Link>
            </Button>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="md:col-span-2">
      <div className="bg-slate-100 rounded-sm p-5">
        <p className="font-bold mb-5">Price Breakdown</p>
        <div className="grid grid-cols-2 text-sm mb-3">
          <div>Subtotal Price</div>
          <div className="text-right">
            {currencyFormatter.format(subtotalPrice)}
          </div>
        </div>
        <div className="grid grid-cols-2 text-sm mb-3">
          <div>
            Delivery Fee{" "}
            <span className="text-green text-xs">(20% of subtotal price)</span>
          </div>
          <div className="text-right">
            {currencyFormatter.format(shippingPrice)}
          </div>
        </div>
        <div className="grid grid-cols-2 text-sm mb-3">
          <div>Total Price</div>
          <div className="text-right text-2xl text-green font-bold">
            {currencyFormatter.format(totalPrice)}
          </div>
        </div>
      </div>
      <div>
        <Button
          className="w-full green-button cursor-pointer mt-5 text-base"
          onClick={handleCheckout}
        >
          {isPending ? <ButtonLoader /> : "Place Order"}
        </Button>
      </div>
    </div>
  );
};

export default CheckoutPriceBreakdown;
