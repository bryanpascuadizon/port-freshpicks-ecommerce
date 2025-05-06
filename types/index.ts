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
  id?: string;
  userId?: string;
  cartItems: CartItem[];
  createdAt?: string;
  updatedAt?: string;
  subtotalPrice: number;
  totalPrice: number;
  shippingPrice: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  emailVerified: string;
  image: string;
  address: UserAddress[];
  role: string;
  gender: string;
};

export type UserAddress = {
  id: string;
  name: string;
  phoneNumber: string;
  postalCode: string;
  address: string;
  isDefault: string | null;
};

export type FormState = {
  success: boolean;
  message?: string;
};

export type Order = {
  id: string;
  userId: string;
  shippingAddress: ShippingAddress;
  paymentStatus: string;
  paymentMethod: string;
  subtotalPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date;
  isDelivered: boolean;
  orderItems: OrderItem[];
  referenceNumber: string;
  orderStage: string;
};

export type OrderItem = {
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

export type ShippingAddress = {
  id: string;
  name: string;
  phoneNumber: string;
  postalCode: string;
  address: string;
  isDefault: string | null;
};
