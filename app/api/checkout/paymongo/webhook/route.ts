import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    return new NextResponse("Success Webhook", { status: 200 });
  } catch (error) {
    return new NextResponse(`Failed Webhook - ${error}`, { status: 500 });
  }
};
