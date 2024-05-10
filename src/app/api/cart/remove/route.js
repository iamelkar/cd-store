import prisma from "@/utils/prisma/db";
import { NextResponse } from "next/server";

export async function POST(request) {
  const req = await request.json();
  const productId = req.productId;
  console.log(productId);
  try {
    const data = await prisma.cart.findFirst({
      where: {
        productId: productId,
      },
    });

    if (data.quantity > 1) {
      const cartItem = await prisma.cart.updateMany({
        where: {
          productId: productId,
        },
        data: {
          quantity: {
            decrement: 1,
          },
        },
      });

      return NextResponse.json({ message: "Product removed from cart" });
    } else {
      const cartItem = await prisma.cart.deleteMany({
        where: {
          productId: productId,
        },
      });

      return NextResponse.json({ message: "Product removed from cart" });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to remove product from cart" });
  }
}
