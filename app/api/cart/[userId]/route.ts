import prisma from "@/db/prisma";
import { calculatePrice } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

/*
  Description: Get User Cart
  Handler directory: CartActions > getUserCart
*/
export const GET = async (
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ userId: string }>;
  }
) => {
  try {
    const { userId } = await params;

    const userCart = await prisma.cart.findFirst({
      where: { userId: userId },
    });

    if (userCart) {
      return new NextResponse(JSON.stringify(userCart), { status: 200 });
    }

    return new NextResponse(JSON.stringify(userCart), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(`Error fetching user cart - ${error}`, {
      status: 500,
    });
  }
};

/*
  Description: Add new cart for new user
  Handler directory: CartActions > getUserCart
*/
export const POST = async (
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ userId: string }>;
  }
) => {
  try {
    const { userId } = await params;

    const newUserCart = await prisma.cart.create({
      data: {
        userId: userId,
        cartItems: [],
        ...calculatePrice([]),
      },
    });

    return new NextResponse(JSON.stringify(newUserCart), { status: 200 });
  } catch (error) {
    return new NextResponse(`Error creating a user cart  - ${error}`, {
      status: 500,
    });
  }
};
