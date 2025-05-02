import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async () => {
  try {
    // const chunks: Uint8Array[] = [];
    // for await (const chunk of request) {
    //   chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    // }
    // const rawBody = Buffer.concat(chunks).toString("utf8");
    // const event = JSON.parse(rawBody);

    // // TODO: Verify signature here if you want extra security

    // // Log or handle different event types
    // switch (event.data.attributes.type) {
    //   case "checkout_session.payment_paid":
    //     const sessionId = event.data.attributes.data.id;
    //     console.log("Checkout session paid:", sessionId);
    //     // Update your database: mark payment as completed, fulfill order, etc.
    //     break;
    //   case "payment.paid":
    //     const paymentId = event.data.attributes.data.id;
    //     console.log("Direct payment paid:", paymentId);
    //     break;
    //   default:
    //     console.log("Unhandled event type:", event.data.attributes.type);
    // }

    return new NextResponse("Webhook received", { status: 200 });
  } catch (error) {
    return new NextResponse(`Webhook error - ${error}`, { status: 500 });
  }
};
