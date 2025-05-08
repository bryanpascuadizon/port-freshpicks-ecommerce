import prisma from "@/db/prisma";
import { orderStage, roles } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ stage: string; userId: string }>;
  }
) => {
  try {
    const { stage, userId } = await params;

    let orders = null;
    const sortOrder = stage === orderStage[3].stage ? "desc" : "asc";

    //Get User Role
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });

    if (user) {
      if (user.role === roles.User) {
        orders = await prisma.order.findMany({
          where: { orderStage: stage, userId: userId },
          orderBy:
            stage === orderStage[3].stage
              ? {
                  deliveredAt: sortOrder,
                }
              : {
                  paidAt: sortOrder,
                },
        });
      } else {
        orders = await prisma.order.findMany({
          where: {
            orderStage: stage,
          },
          orderBy:
            stage === orderStage[3].stage
              ? {
                  deliveredAt: sortOrder,
                }
              : {
                  paidAt: sortOrder,
                },
        });
      }
    }

    if (orders) {
      return new NextResponse(JSON.stringify(orders), { status: 200 });
    }

    return new NextResponse("Cannot get orders", { status: 500 });
  } catch (error) {
    return new NextResponse(`Cannot get orders - ${error}`, { status: 500 });
  }
};
