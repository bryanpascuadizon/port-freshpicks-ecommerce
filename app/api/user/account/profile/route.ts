import { auth } from "@/auth";
import prisma from "@/db/prisma";
import { NextResponse } from "next/server";

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
