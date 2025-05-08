import prisma from "@/db/prisma";
import { orderStage } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const rawBody = await request.text();
    const event = JSON.parse(rawBody);

    const eventType = event?.data?.attributes?.type;
    const eventData = event?.data?.attributes?.data;

    if (
      eventType === "checkout_session.payment.paid" ||
      eventType === "payment.paid"
    ) {
      const referenceNumber = eventData?.attributes?.reference_number;
      const paymentMethod = eventData?.attributes?.payment_method_used;
      const status = eventData?.attributes?.payments?.[0]?.attributes?.status;

      // Update Order
      if (referenceNumber && paymentMethod && status) {
        try {
          await prisma.order.update({
            where: { referenceNumber },
            data: {
              paymentMethod,
              paymentStatus: status,
              isPaid: true,
              paidAt: new Date(),
              orderStage: orderStage[1].stage,
            },
          });
        } catch (dbError) {
          console.error("Order update error:", dbError);
        }
      }
    }

    return new NextResponse(
      `Order has been updated with order reference number: ${eventData.attributes.reference_number}`,
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(`Webhook error - ${error}`, { status: 200 });
  }
};
