import { Cart, CartItem, Microgreen } from "@/types";
import { calculatePrice } from "../utils";
import { getUserCart, updateUserCart } from "../handlers/cartHandlers";
import { getUserAuthentication } from "./UserActions";

export const getCartForUser = async () => {
  try {
    const user = await getUserAuthentication();

    if (user) {
      const cart = await getUserCart(user.id!);

      if (cart) {
        return {
          success: true,
          cart,
        };
      }
    }
  } catch (error) {
    return {
      success: false,
      message: `${error}`,
    };
  }
};
//Add items to user cart
export const addToCart = async (item: Microgreen, quantity: number) => {
  try {
    const user = await getUserAuthentication();

    if (user) {
      //Check user's cart
      const cart = await getUserCart(user.id!);
      let updatedCart: Cart | null = null;
      let selectedCartItems: CartItem[] | null = null;

      if (cart) {
        //Find productId in cart
        const isProductExist = cart.cartItems.find(
          (cartItem) => cartItem.productId === item.id
        );

        //If product exist in cart
        if (isProductExist) {
          //Increase Item quantity by 1
          cart.cartItems.find(
            (cartItem) => cartItem.productId === item.id
          )!.quantity = isProductExist.quantity + quantity;

          selectedCartItems = cart.cartItems.filter((item) => item.isSelected);

          //Update cart
          updatedCart = {
            ...cart,
            ...calculatePrice([...selectedCartItems]),
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
            isSelected: false,
            quantity: quantity,
          };

          selectedCartItems = [newCartItem, ...cart.cartItems].filter(
            (item) => item.isSelected
          );

          //Update cart
          updatedCart = {
            ...cart,
            cartItems: [newCartItem, ...cart.cartItems],
            ...calculatePrice([...selectedCartItems]),
          };
        }

        const response = await updateUserCart(updatedCart, user.id!);

        if (response) {
          return {
            success: true,
            message: `Added ${item.name} to your cart`,
          };
        }
      }
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

//Buy now and put current item directly to cart
export const buyNowToCart = async (item: Microgreen, quantity: number) => {
  try {
    const user = await getUserAuthentication();

    if (user) {
      //Check user cart
      const cart = await getUserCart(user.id!);
      let updatedCart: Cart | null = null;
      let selectedCartItems: CartItem[] | null = null;

      if (cart) {
        // if product is existing, get the cart item and just add the quantity
        const existingCartItem = cart.cartItems.find(
          (cartItem) => cartItem.productId === item.id
        );

        if (existingCartItem) {
          existingCartItem!.quantity = existingCartItem.quantity + quantity;
          existingCartItem!.isSelected = true;

          selectedCartItems = cart.cartItems.filter((item) => item.isSelected);

          updatedCart = {
            ...cart,
            ...calculatePrice([...selectedCartItems]),
          };
        } else {
          const newCartItem: CartItem = {
            productId: item.id,
            name: item.name,
            slug: item.slug,
            category: item.category,
            images: item.images,
            description: item.description,
            price: item.price,
            isSelected: true,
            quantity: quantity,
          };

          selectedCartItems = cart.cartItems.filter((item) => item.isSelected);

          updatedCart = {
            ...cart,
            cartItems: [newCartItem, ...cart.cartItems],
            ...calculatePrice([...selectedCartItems, newCartItem]),
          };
        }

        const response = await updateUserCart(updatedCart, user.id!);

        if (response) {
          return {
            success: true,
            message: `Added ${item.name} (x${quantity}) to your cart`,
          };
        }
      }
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

//Updates the user cart
export const updateCartItemQuantity = async (
  type: string,
  productId: string
) => {
  try {
    const user = await getUserAuthentication();

    if (user) {
      const cart = await getUserCart(user.id!);
      let selectedCartItems: CartItem[] | null = null;

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

              selectedCartItems = newCartItems.filter(
                (item) => item.isSelected
              );

              updatedCart = {
                ...cart,
                cartItems: [...newCartItems],
                ...calculatePrice([...selectedCartItems]),
              };
            } else {
              //Decrease item quantity by 1
              cart.cartItems.find(
                (item) => item.productId === productId
              )!.quantity = cartItem.quantity - 1;

              selectedCartItems = cart.cartItems.filter(
                (item) => item.isSelected
              );

              updatedCart = {
                ...cart,
                ...calculatePrice([...selectedCartItems]),
              };
            }
          } else {
            //Increase item quantity by 1
            cart.cartItems.find(
              (item) => item.productId === productId
            )!.quantity = cartItem.quantity + 1;

            selectedCartItems = cart.cartItems.filter(
              (item) => item.isSelected
            );

            updatedCart = {
              ...cart,
              ...calculatePrice([...selectedCartItems]),
            };
          }

          const response = await updateUserCart(updatedCart, user.id!);

          if (response) {
            return {
              success: true,
              message: "Your cart has been updated",
            };
          }
        }
      }
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

//Select an item from the cart to remove
export const removeItemToCart = async (cartItem: CartItem) => {
  try {
    const user = await getUserAuthentication();

    if (user) {
      const cart = await getUserCart(user.id!);
      let selectedCartItems: CartItem[] | null = null;

      const updatedCartItems: CartItem[] = cart.cartItems.filter(
        (item) => item.productId !== cartItem.productId
      );

      selectedCartItems = updatedCartItems.filter((item) => item.isSelected);

      const updatedCart: Cart = {
        ...cart,
        cartItems: updatedCartItems,
        ...calculatePrice([...selectedCartItems]),
      };

      const response = await updateUserCart(updatedCart, user.id!);

      if (response) {
        return {
          success: true,
          message: `${cartItem.name}`,
        };
      }
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

//Deletes all selected cart items
export const removeCartItems = async () => {
  try {
    const user = await getUserAuthentication();

    if (user) {
      const cart = await getUserCart(user.id!);

      if (cart) {
        const unSelectedCartItems = cart.cartItems.filter(
          (item) => !item.isSelected
        );

        const updatedCart: Cart = {
          ...cart,
          cartItems: [...unSelectedCartItems],
          ...calculatePrice([...unSelectedCartItems]),
        };

        //Update database
        const response = await updateUserCart(updatedCart, user.id!);

        if (response) {
          return {
            success: true,
            message: "Cart items have been deleted",
          };
        }
      }
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

//Selects a cart item to be placed as order
export const includeItemFromCart = async (productId: string) => {
  try {
    const user = await getUserAuthentication();

    if (user) {
      const cart = await getUserCart(user.id!);
      let selectedCartItems: CartItem[] | null = null;

      const cartItem = cart.cartItems.find(
        (item) => item.productId === productId
      );

      cart.cartItems.find((item) => item.productId === productId)!.isSelected =
        !cartItem?.isSelected;

      selectedCartItems = cart.cartItems.filter((item) => item.isSelected);

      const updatedCart: Cart = {
        ...cart,
        ...calculatePrice([...selectedCartItems]),
      };

      //Update database
      const response = await updateUserCart(updatedCart, user.id!);

      if (response) {
        return {
          success: true,
          message: "Your cart has been updated",
        };
      }
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

//Selects all cart items to be placed as order
export const includeAllCartItems = async (isSelectedAll: boolean) => {
  try {
    const user = await getUserAuthentication();

    if (user) {
      const cart = await getUserCart(user.id!);

      if (cart) {
        const updateAllCart: CartItem[] = cart.cartItems.map((item) => ({
          ...item,
          isSelected: isSelectedAll ? false : true,
        }));

        const selectedCartItems: CartItem[] = updateAllCart.filter(
          (item) => item.isSelected
        );

        const updatedCart = {
          ...cart,
          cartItems: updateAllCart,
          ...calculatePrice([...selectedCartItems]),
        };

        //Update database
        const response = await updateUserCart(updatedCart, user.id!);

        if (response) {
          return {
            success: true,
            message: "Your cart has been updated",
          };
        }
      }
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

//Count the items from the user cart
export const countCartItems = async () => {
  try {
    const user = await getUserAuthentication();

    if (user) {
      const cart = await getUserCart(user.id!);

      if (cart) {
        const cartItemCount = cart.cartItems.reduce(
          (acc, item) => acc + item.quantity,
          0
        );

        return cartItemCount;
      } else {
        return 0;
      }
    }
  } catch (error) {
    throw new Error(`Something went wrong - ${error}`);
  }
};

//Get cart list for checkout
export const getCartListForCheckout = async () => {
  try {
    const user = await getUserAuthentication();

    if (user) {
      const cart = await getUserCart(user.id!);

      if (cart) {
        const selectedCartItems = cart.cartItems.filter(
          (item) => item.isSelected
        );

        const newCart: Cart = {
          ...cart,
          cartItems: selectedCartItems,
          ...calculatePrice([...selectedCartItems]),
        };

        return newCart;
      }
    }

    throw new Error("Something went wrong");
  } catch (error) {
    throw new Error(`Something went wrong - ${error}`);
  }
};
