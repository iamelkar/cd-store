import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { productId } = req.body;

  try {
    const cartItem = await prisma.cart.upsert({
      where: { productId: productId },
      update: { quantity: { increment: 1 } },
      create: { productId: productId },
    });
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to add product to cart" });
  } finally {
    await prisma.$disconnect();
  }
}
