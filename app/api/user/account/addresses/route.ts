import prisma from "@/db/prisma";
import { User } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (request: NextRequest) => {
  try {
    const newUser: User = await request.json();

    const response = await prisma.user.update({
      where: { id: newUser.id },
      data: {
        address: newUser.address,
      },
    });

    if (response) {
      return new NextResponse(JSON.stringify(response.address), {
        status: 200,
      });
    }
    return new NextResponse(`Cannot add user address`, { status: 500 });
  } catch (error) {
    return new NextResponse(`Cannot add user address - ${error}`, {
      status: 500,
    });
  }
};
