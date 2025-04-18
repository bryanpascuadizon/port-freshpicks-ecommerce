export type Microgreen = {
  id: string;
  name: string;
  slug: string;
  category: string;
  images: string[];
  description: string[];
  stock: number;
  price: number;
  rating: number;
  numberOfReviews: number;
};

export type CartItem = {
  productId: string;
  name: string;
  slug: string;
  category: string;
  images: string[];
  description: string[];
  price: number;
  isSelected: boolean;
  quantity: number;
};

export type Cart = {
  id: string;
  userId: string;
  cartItems: CartItem[];
  createdAt: string;
  updatedAt: string;
  subtotalPrice: number;
  totalPrice: number;
  shippingPrice: number;
};
