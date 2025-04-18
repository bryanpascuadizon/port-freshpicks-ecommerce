import { auth } from "@/auth";
import prisma from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

/*
  Description: Get User Cart
  Handler directory: CartActions > getUserCart
*/
export const GET = async () => {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    const userCart = await prisma.cart.findFirst({
      where: { userId: userId },
    });

    if (userCart) {
      return new NextResponse(JSON.stringify(userCart), { status: 200 });
    }

    return new NextResponse(JSON.stringify(userCart), {
      status: 404,
    });
  } catch (error) {
    return new NextResponse(`Error fetching user cart - ${error}`, {
      status: 500,
    });
  }
};
