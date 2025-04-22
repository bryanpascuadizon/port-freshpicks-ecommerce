import { auth } from "@/auth";
import { Cart, CartItem } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const { cart }: { cart: Cart } = await request.json();

    const lineItems = cart.cartItems
      .filter((item: CartItem) => item.isSelected)
      .map((item: CartItem) => {
        return {
          currency: "PHP",
          amount: Number((item.price * 100).toFixed(2)),
          name: item.name,
          description: item.description[0],
          quantity: item.quantity,
        };
      });

    //Add Shipping Fee
    lineItems.push({
      currency: "PHP",
      amount: Number((cart.shippingPrice * 100).toFixed(0)),
      name: "Delivery Fee",
      description: "Delivery Fee",
      quantity: 1,
    });

    const session = await auth();
    const user = session?.user;

    const response = await fetch(
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
                name: user?.name,
                email: user?.email,
                phone: user?.phone_number,
              },
              send_email_receipt: true,
              show_description: false,
              show_line_items: true,
              success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/orders`,
              cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/checkout`,
              line_items: [...lineItems],
              payment_method_types: ["card", "gcash", "paymaya"],
            },
          },
        }),
      }
    ).then((res) => res.json());

    if (response) {
      return new NextResponse(JSON.stringify(response), { status: 200 });
    }

    return new NextResponse("Something went wrong", { status: 500 });
  } catch (error) {
    return new NextResponse(`Something went wrong - ${error}`, { status: 500 });
  }
};
