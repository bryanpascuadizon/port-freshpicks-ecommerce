import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout",
};

const CheckoutPage = () => {
  return (
    <div className="my-10">
      <div className="text-xl font-bold mb-5">Checkout</div>
    </div>
  );
};

export default CheckoutPage;
