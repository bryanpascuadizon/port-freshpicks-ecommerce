//import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import sampleData from "@/db/sample-seed-data";

/*
  Description: Get all Microgreen Products
  Handler directory: ProductActions > getMicrogreenProducts
*/
export const GET = async () => {
  try {
    // const prisma = new PrismaClient();
    // const data = await prisma.product.findMany({
    //   where: { category: "microgreens" },
    // });

    const data = sampleData.products.microgreens;

    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(`Error fetching microgreen products - ${error}`, {
      status: 500,
    });
  }
};
