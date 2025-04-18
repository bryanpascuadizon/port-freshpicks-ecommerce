import { auth } from "@/auth";
import prisma from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest, response: NextRequest) => {
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
