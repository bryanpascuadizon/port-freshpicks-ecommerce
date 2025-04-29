import { auth } from "@/auth";
import prisma from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const session = await auth();
    const userSession = session?.user;

    const user = await prisma.user.findFirst({
      where: {
        id: userSession?.id,
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

export const PATCH = async (request: NextRequest) => {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    const userForUpdate = await request.json();

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
