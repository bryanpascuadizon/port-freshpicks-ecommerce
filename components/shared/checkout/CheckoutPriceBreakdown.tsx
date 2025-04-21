import { currencyFormatter } from "@/lib/utils";

const CheckoutPriceBreakdown = ({
  subtotalPrice,
  shippingPrice,
  totalPrice,
}: {
  subtotalPrice: number;
  shippingPrice: number;
  totalPrice: number;
}) => {
  return (
    <div className="p-5 bg-slate-100 rounded-sm">
      <p className="font-bold mb-5">Price Breakdown</p>
      <div className="grid grid-cols-2 text-sm mb-3">
        <div>Subtotal Price</div>
        <div className="text-right">
          {currencyFormatter.format(subtotalPrice)}
        </div>
      </div>
      <div className="grid grid-cols-2 text-sm mb-3">
        <div>
          Shipping Price{" "}
          <span className="text-green-700 text-xs">
            (20% of subtotal price)
          </span>
        </div>
        <div className="text-right">
          {currencyFormatter.format(shippingPrice)}
        </div>
      </div>
      <div className="grid grid-cols-2 text-sm">
        <div>Total Price</div>
        <div className="text-right text-2xl text-green-700 font-bold">
          {currencyFormatter.format(totalPrice)}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPriceBreakdown;
