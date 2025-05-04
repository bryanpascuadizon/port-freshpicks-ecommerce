import prisma from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{referenceNumber: string}> }
) => {
  try {
    const { referenceNumber } = await params;

    const order = await prisma.order.findFirst({
      where: { referenceNumber: referenceNumber },
    });

    if (order) {
      console.log(order);
      return new NextResponse(JSON.stringify(order), { status: 200 });
    }

    return new NextResponse("Cannot get order", { status: 500 });
  } catch (error) {
    return new NextResponse(`Cannot get order - ${error}`, { status: 500 });
  }
};
