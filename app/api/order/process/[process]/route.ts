import prisma from "@/db/prisma";
import { orderStage } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ process: string }> }
) => {
  try {
    const { order } = await req.json();
    const { process } = await params;
    let processOrder = null;

    if (process === orderStage[3].stage) {
      processOrder = await prisma.order.update({
        where: { id: order.id },
        data: {
          orderStage: process,
          isDelivered: true,
          deliveredAt: new Date(),
        },
      });
    } else {
      processOrder = await prisma.order.update({
        where: { id: order.id },
        data: {
          orderStage: process,
        },
      });
    }

    if (processOrder) {
      return new NextResponse(JSON.stringify(processOrder), { status: 200 });
    }

    return new NextResponse(`Cannot process order`, { status: 500 });
  } catch (error) {
    return new NextResponse(`Cannot process order - ${error}`, { status: 500 });
  }
};
