import prisma from "@/db/prisma";
import { Order, OrderItem } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const POST = async (request: NextRequest) => {
  try {
    const { order }: { order: Order } = await request.json();

    const user = await prisma.user.findFirst({
      where: { id: order.userId },
    });

    const referenceNumber = uuidv4();

    if (user) {
      const lineItems = order.orderItems.map((item: OrderItem) => {
        return {
          currency: "PHP",
          amount: Number((item.price * 100).toFixed(2)),
          name: item.name,
          description: item.description[0],
          quantity: item.quantity,
        };
      });

      lineItems.push({
        currency: "PHP",
        amount: Number((order.shippingPrice * 100).toFixed(0)),
        name: "Delivery Fee",
        description: "Delivery Fee",
        quantity: 1,
      });

      const responsePayMongo = await fetch(
        `https://api.paymongo.com/v1/checkout_sessions`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Basic ${Buffer.from(
              process.env.PAYMONGO_SECRET_KEY + ":"
            ).toString("base64")}`,
          },
          body: JSON.stringify({
            data: {
              attributes: {
                billing: {
                  name: user.name,
                  email: user.email,
                  phone: user.phone_number,
                },
                send_email_receipt: true,
                show_description: false,
                show_line_items: true,
                success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/orders`,
                cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/checkout`,
                line_items: [...lineItems],
                payment_method_types: ["card", "gcash", "paymaya"],
                reference_number: referenceNumber,
              },
            },
          }),
        }
      ).then((res) => res.json());

      if (responsePayMongo) {
        const responseOrder = await prisma.order.update({
          where: { id: order.id },
          data: { referenceNumber: referenceNumber },
        });

        if (responseOrder) {
          return new NextResponse(JSON.stringify(responsePayMongo), {
            status: 200,
          });
        }
      }
    }

    return new NextResponse("Something went wrong", { status: 500 });
  } catch (error) {
    return new NextResponse(`Something went wrong - ${error}`, { status: 500 });
  }
};
