import { useQuery } from "@tanstack/react-query";
import { countCartItems } from "../actions/CartActions";

export const useCartItemCount = () => {
  const { data: cartItemCount, refetch: refetchCartItemCount } = useQuery({
    queryKey: ["cart-item-count"],
    queryFn: countCartItems,
  });

  return { cartItemCount, refetchCartItemCount };
};
