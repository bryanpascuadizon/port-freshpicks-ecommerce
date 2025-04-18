import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/actions/CartActions";
import { Microgreen } from "@/types";
import { useTransition } from "react";
import ButtonLoader from "../ButtonLoader";
import { toast } from "sonner";

const AddToCartButton = ({ item }: { item: Microgreen }) => {
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = () => {
    startTransition(async () => {
      const response = await addToCart(item);

      //Add Toast
      if (response.success) {
        toast(
          <p>
            <span className="text-green-700">{item.name}</span> has been added
            to your cart
          </p>
        );
      }
    });
  };

  return (
    <Button
      disabled={isPending}
      className="bg-green-700 p-5 cursor-pointer"
      onClick={handleAddToCart}
    >
      {isPending ? <ButtonLoader /> : "Add to Cart"}
    </Button>
  );
};

export default AddToCartButton;
