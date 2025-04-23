// ✅ Step 3: Webhook Handler to Listen for Payment Status
// File: app/api/paymongo/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const rawBody = await req.text();
  const payload = JSON.parse(rawBody);

  console.log("Raw Body", rawBody);
  console.log("Payload", payload);

  if (payload.data.attributes.type === "checkout_session.payment.paid") {
    //const sessionId = payload.data.id;
    const billing = payload.data.attributes.billing;

    console.log("✅ Payment Success for:", billing.email);
  }
  return new NextResponse("Success", { status: 200 });
};
