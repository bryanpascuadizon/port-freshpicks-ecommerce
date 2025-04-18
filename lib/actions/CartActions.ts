import { Cart, Microgreen } from "@/types";
import { calculateInitialPrice } from "../utils";

export const getUserCart = async (): Promise<Cart> => {
  const response: Promise<Cart> = await fetch("/api/cart").then((res) =>
    res.json()
  );

  return response;
};

export const addToCart = async (item: Microgreen) => {
  try {
    //Check user's cart
    const cart = await getUserCart();

    if (cart.cartItems) {
      //Add a new user cart along with item
    }

    //if cart does not exist, add new exisiting cart
    const newUserCart = {
      cartItems: [
        {
          id: item.id,
          name: item.name,
          slug: item.slug,
          category: item.category,
          images: item.images,
          description: item.description,
          price: item.price,
        },
      ],
      ...calculateInitialPrice(item),
    };

    const response = await fetch(`/api/cart/new-cart`, {
      method: "POST",
      body: JSON.stringify(newUserCart),
    });

    return {
      success: true,
      message: `Added ${item.name} to your cart`,
    };

    //if user cart is existing...
    //Check if product is existing
    //Add 1 quantity to the product
    //if user's cart does not exist, add a new cart entry and 1 item to cart
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: `${error}`,
    };
  }
};
