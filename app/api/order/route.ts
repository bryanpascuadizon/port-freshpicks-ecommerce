import prisma from "@/db/prisma";
import { orderStage } from "@/lib/constants";
import { calculatePrice } from "@/lib/utils";
import { Cart } from "@/types";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

export const POST = async (request: NextRequest) => {
  try {
    const { cart, cartItemsNotForShipping, defaultAddress } =
      await request.json();

    const orderForShipping: Cart = cart;

    //Excude items for shipping in the original cart
    const cartResponse = await prisma.cart.update({
      where: { id: orderForShipping.id },
      data: {
        cartItems: cartItemsNotForShipping,
        ...calculatePrice(cartItemsNotForShipping),
      },
    });

    const orderReferenceNumber = nanoid(12);

    if (cartResponse) {
      //Create order
      const order = await prisma.order.create({
        data: {
          userId: orderForShipping.userId!,
          shippingAddress: defaultAddress,
          paymentStatus: "awaiting_payment_method",
          subtotalPrice: orderForShipping.subtotalPrice,
          shippingPrice: orderForShipping.shippingPrice,
          totalPrice: orderForShipping.totalPrice,
          orderItems: cart.cartItems,
          orderStage: orderStage[0].stage,
          referenceNumber: orderReferenceNumber,
        },
      });

      if (order) {
        return new NextResponse(JSON.stringify(order), { status: 200 });
      }
    }

    return new NextResponse("Cannot create order", { status: 500 });
  } catch (error) {
    return new NextResponse(`Cannot create order - ${error}`, { status: 500 });
  }
};
