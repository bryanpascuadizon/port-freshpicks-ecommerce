import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

/*
  Description: Get a Microgreen Product
  Handler directory: ProductActions > getMicrogreenProductBySlug
*/
export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) => {
  try {
    const { slug } = await params;

    const data = await prisma.product.findFirst({
      where: { slug },
    });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(`${error}`, { status: 500 });
  }
};
