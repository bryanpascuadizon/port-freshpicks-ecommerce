import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const rawBody = await request.text();

    console.log("RAWBODY: ", rawBody);
    const event = JSON.parse(rawBody);

    const eventType = event?.data?.attributes?.type;
    const eventData = event?.data?.attributes?.data;

    switch (eventType) {
      case "checkout_session.payment.paid":
        console.log("✅ Payment received for Checkout Session:", eventData?.id);
        // TODO: update order status in DB
        break;

      case "payment.paid":
        console.log("✅ Direct payment completed:", eventData?.id);
        // TODO: mark standalone payment as paid
        break;

      default:
        console.log("⚠️ Unhandled event type:", eventType);
    }

    return new NextResponse("Webhook received", { status: 200 });
  } catch (error) {
    return new NextResponse(`Webhook error - ${error}`, { status: 500 });
  }
};
