import { Button } from "@/components/ui/button";
import { Microgreen } from "@/types";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import ButtonLoader from "../ButtonLoader";
import { buyNowToCart } from "@/lib/actions/CartActions";
import { useCartItemCount } from "@/lib/hooks/CartItemCount";

const BuyNowButton = ({
  item,
  quantity,
}: {
  item: Microgreen;
  quantity: number;
}) => {
  const [isPending, startTransition] = useTransition();
  const { refetchCartItemCount } = useCartItemCount();

  const handleBuyNow = () => {
    startTransition(async () => {
      const response = await buyNowToCart(item, quantity);

      if (response.success) {
        await refetchCartItemCount();
        redirect("/cart");
      }
    });
  };

  return (
    <Button
      className="button green-button p-5 cursor-pointer border-3 border-green-700"
      onClick={handleBuyNow}
    >
      {isPending ? <ButtonLoader /> : "Buy Now"}
    </Button>
  );
};

export default BuyNowButton;
