import prisma from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) => {
  try {
    const { userId } = await params;

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (user) {
      return new NextResponse(JSON.stringify(user), { status: 200 });
    }

    return new NextResponse("Cannot get user profile", { status: 500 });
  } catch (error) {
    return new NextResponse(`Cannot get user profile - ${error}`, {
      status: 500,
    });
  }
};

export const PATCH = async (
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) => {
  try {
    const userForUpdate = await request.json();

    const { userId } = await params;

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (user) {
      const response = await prisma.user.update({
        where: { id: user.id },
        data: {
          name: userForUpdate.name,
          email: userForUpdate.email,
          phone_number: userForUpdate.phoneNumber,
          gender: userForUpdate.gender,
        },
      });

      if (response) {
        return new NextResponse(JSON.stringify(response), { status: 200 });
      }
    }

    return new NextResponse("Cannot update user profile", { status: 500 });
  } catch (error) {
    return new NextResponse(`Cannot update user profile - ${error}`, {
      status: 500,
    });
  }
};
