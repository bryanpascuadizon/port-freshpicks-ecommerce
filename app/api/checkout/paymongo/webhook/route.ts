import prisma from "@/db/prisma";
import { orderStage } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const rawBody = await request.text();

    const event = JSON.parse(rawBody);

    if (event) {
      const eventType = event.data.attributes.type;
      const eventData = event.data.attributes.data;

      if (
        eventType === "checkout_session.payment.paid" ||
        eventType === "payment.paid"
      ) {
        // Update Order
        const order = await prisma.order.update({
          where: { referenceNumber: eventData.attributes.reference_number },
          data: {
            paymentMethod: eventData.attributes.payment_method_used,
            paymentStatus: eventData.attributes.payments[0].attributes.status,
            isPaid: true,
            paidAt: new Date(),
            orderStage: orderStage[1].stage,
          },
        });

        if (order) {
          return new NextResponse(
            `Order has been updated with order reference number: ${eventData.attributes.reference_number}`,
            { status: 200 }
          );
        }
      }
    }

    return new NextResponse(`Webhook error`, { status: 500 });
  } catch (error) {
    return new NextResponse(`Webhook error - ${error}`, { status: 500 });
  }
};
