import { auth } from "@/auth";
import prisma from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ stage: string }>;
  }
) => {
  try {
    const { stage } = await params;

    const session = await auth();
    const user = session?.user;

    if (user) {
      const orders = await prisma.order.findMany({
        where: { orderStage: stage, userId: user.id },
      });

      if (orders) {
        return new NextResponse(JSON.stringify(orders), { status: 200 });
      }
    }
    return new NextResponse("Cannot get orders", { status: 500 });
  } catch (error) {
    return new NextResponse(`Cannot get orders - ${error}`, { status: 500 });
  }
};
