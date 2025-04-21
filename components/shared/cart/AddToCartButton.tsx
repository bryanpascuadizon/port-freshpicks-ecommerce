import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/actions/CartActions";
import { Microgreen } from "@/types";
import { useTransition } from "react";
import ButtonLoader from "../ButtonLoader";
import { toast } from "sonner";
import Link from "next/link";
import { useCartItemCount } from "@/lib/hooks/CartItemCount";

const AddToCartButton = ({
  item,
  quantity,
}: {
  item: Microgreen;
  quantity: number;
}) => {
  const [isPending, startTransition] = useTransition();
  const { refetchCartItemCount } = useCartItemCount();

  const handleAddToCart = () => {
    startTransition(async () => {
      const response = await addToCart(item, quantity);

      //Add Toast
      if (response.success) {
        await refetchCartItemCount();

        toast(
          <div className="toast-text grid grid-cols-3 gap-5">
            <div className="col-span-2">
              <p>
                <span className="text-green-700">{item.name}</span> (x{quantity}
                ) has been added to your cart
              </p>
            </div>
            <div className="col-span-1 text-center self-center">
              <Button className="green-button">
                <Link href="/cart" className="text-white">
                  View Cart
                </Link>
              </Button>
            </div>
          </div>
        );
      }
    });
  };

  return (
    <Button
      disabled={isPending}
      className="button border-3 border-green-700 bg-white text-black hover:bg-white p-5 cursor-pointer"
      onClick={handleAddToCart}
    >
      {isPending ? <ButtonLoader /> : "Add to Cart"}
    </Button>
  );
};

export default AddToCartButton;
