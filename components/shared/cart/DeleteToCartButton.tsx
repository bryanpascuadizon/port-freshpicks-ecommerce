import { Button } from "@/components/ui/button";
import { deleteCartItems } from "@/lib/actions/CartActions";
import { Loader } from "lucide-react";
import { useTransition } from "react";

const DeleteToCartButton = ({
  totalSelectedQuantity,
  refetch,
}: {
  totalSelectedQuantity: number;
  refetch: () => void;
}) => {
  const [isPending, startTransistion] = useTransition();
  const handleDeleteCartItems = () => {
    startTransistion(async () => {
      const response = await deleteCartItems();

      if (response) {
        await refetch();
      }
    });
  };
  return (
    <Button
      disabled={totalSelectedQuantity === 0}
      className="green-button cursor-pointer"
      onClick={handleDeleteCartItems}
    >
      {isPending ? <Loader className="w-4 h-4 animate-spin" /> : "Delete"}
    </Button>
  );
};

export default DeleteToCartButton;
