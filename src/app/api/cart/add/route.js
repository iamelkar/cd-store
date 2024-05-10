import prisma from "@/utils/prisma/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const req = await request.json();
  const productId = req.productId;
  try {
    // const cartItem = await prisma.cart.upsert({
    //   where: { productId: productId },
    //   update: { quantity: { increment: 1 } },
    //   create: { productId: productId },
    // });

    const data = await prisma.cart.findMany({
      where: {
        productId: productId,
      },
    });

    if (data.length > 0) {
      const cartItem = await prisma.cart.updateMany({
        where: {
          productId: productId,
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });
      return NextResponse.json(cartItem);
    } else {
      const cartItem = await prisma.cart.create({
        data: {
          productId: productId,
          quantity: 1,
        },
      });
      return NextResponse.json(cartItem);
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to add product to cart" });
  }
}
