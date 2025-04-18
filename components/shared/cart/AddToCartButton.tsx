import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/actions/CartActions";
import { Microgreen } from "@/types";

const AddToCartButton = ({ item }: { item: Microgreen }) => {
  const handleAddToCart = async () => {
    const response = await addToCart(item);

    //Add Toast
  };

  return (
    <Button
      className="bg-green-700 p-5 cursor-pointer"
      onClick={handleAddToCart}
    >
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
