import { Cart, CartItem, Microgreen } from "@/types";
import { calculatePrice } from "../utils";

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

    if (cart) {
      //Find productId in cart
      const isProductExist = cart.cartItems.find(
        (cartItem) => cartItem.productId === item.id
      );

      let updatedCart: Cart | null = null;

      //If product exist in cart
      if (isProductExist) {
        //Increase Item quantity by 1
        cart.cartItems.find(
          (cartItem) => cartItem.productId === item.id
        )!.quantity = isProductExist.quantity + 1;

        //Update cart
        updatedCart = {
          ...cart,
          ...calculatePrice([...cart.cartItems]),
        };
      } else {
        //If product does not exist
        const newCartItem: CartItem = {
          productId: item.id,
          name: item.name,
          slug: item.slug,
          category: item.category,
          images: item.images,
          description: item.description,
          price: item.price,
          quantity: 1,
        };

        //Update cart
        updatedCart = {
          ...cart,
          cartItems: [...cart.cartItems, newCartItem],
          ...calculatePrice([...cart.cartItems, newCartItem]),
        };
      }

      const response = await fetch(`/api/cart/update-cart`, {
        method: "PATCH",
        body: JSON.stringify(updatedCart),
      });

      if (response) {
        return {
          success: true,
          message: `Added ${item.name} to your cart`,
        };
      }
    }

    //if cart does not exist, add new exisiting cart
    const newCartItem: CartItem = {
      productId: item.id,
      name: item.name,
      slug: item.slug,
      category: item.category,
      images: item.images,
      description: item.description,
      price: item.price,
      quantity: 1,
    };

    const newUserCart = {
      cartItems: [newCartItem],
      ...calculatePrice([newCartItem]),
    };

    const response = await fetch(`/api/cart/update-cart`, {
      method: "POST",
      body: JSON.stringify(newUserCart),
    });

    if (response) {
      return {
        success: true,
        message: `Added ${item.name} to your cart`,
      };
    }

    return {
      success: false,
      message: `Something went wrong`,
    };
  } catch (error) {
    return {
      success: false,
      message: `${error}`,
    };
  }
};

export const removeItemToCart = async (cartItem: CartItem) => {
  try {
    const cart = await getUserCart();

    const updatedCartItems: CartItem[] = cart.cartItems.filter(
      (item) => item.productId !== cartItem.productId
    );

    const updatedCart: Cart = {
      ...cart,
      cartItems: updatedCartItems,
      ...calculatePrice([...updatedCartItems]),
    };

    const response = await fetch(`/api/cart/update-cart`, {
      method: "PATCH",
      body: JSON.stringify(updatedCart),
    });

    if (response) {
      return {
        success: true,
        message: `${cartItem.name}`,
      };
    }

    return {
      success: false,
      message: `Something went wrong`,
    };
  } catch (error) {
    return {
      success: false,
      message: `${error}`,
    };
  }
};

export const updateCartItemQuantity = async (
  type: string,
  productId: string
) => {
  try {
    const cart = await getUserCart();

    if (cart) {
      const cartItem = cart.cartItems.find(
        (item) => item.productId === productId
      );

      let updatedCart: Cart | null = null;

      if (cartItem) {
        if (type === "decrease") {
          if (cartItem?.quantity === 1) {
            //Remove item from cart

            const newCartItems: CartItem[] = cart.cartItems.filter(
              (item) => item.productId !== productId
            );

            updatedCart = {
              ...cart,
              cartItems: [...newCartItems],
              ...calculatePrice([...newCartItems]),
            };
          } else {
            //Decrease item quantity by 1
            cart.cartItems.find(
              (item) => item.productId === productId
            )!.quantity = cartItem.quantity - 1;

            updatedCart = {
              ...cart,
              ...calculatePrice([...cart.cartItems]),
            };
          }
        } else {
          //Increase item quantity by 1
          cart.cartItems.find(
            (item) => item.productId === productId
          )!.quantity = cartItem.quantity + 1;

          updatedCart = {
            ...cart,
            ...calculatePrice([...cart.cartItems]),
          };
        }

        //Update database
        const response = await fetch("api/cart/update-cart", {
          method: "PATCH",
          body: JSON.stringify(updatedCart),
        });

        if (response) {
          return {
            success: true,
            message: "Your cart has been updated",
          };
        }
      }
    }
  } catch (error) {}
};
