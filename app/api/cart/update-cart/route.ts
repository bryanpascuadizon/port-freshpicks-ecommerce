import { auth } from "@/auth";
import prisma from "@/db/prisma";
import { Cart } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    const newUserCart = await request.json();

    const cart = await prisma.cart.create({
      data: {
        userId: userId,
        ...newUserCart,
      },
    });

    return new NextResponse(JSON.stringify(cart), { status: 200 });
  } catch (error) {
    return new NextResponse(`Cannot add item into cart - ${error}`, {
      status: 500,
    });
  }
};

export const PATCH = async (request: NextRequest) => {
  try {
    const cart: Cart = await request.json();

    const updatedCart = await prisma.cart.update({
      where: { id: cart.id },
      data: {
        cartItems: cart.cartItems,
        subtotalPrice: cart.subtotalPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      },
    });

    return new NextResponse(JSON.stringify(updatedCart), { status: 200 });
  } catch (error) {
    return new NextResponse(`Cannot add item to cart - ${error}`, {
      status: 500,
    });
  }
};
