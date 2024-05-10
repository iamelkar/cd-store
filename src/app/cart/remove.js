import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { productId } = req.body;

  try {
    const cartItem = await prisma.cart.findUnique({
      where: { productId: productId },
    });

    if (cartItem.quantity > 1) {
      await prisma.cart.update({
        where: { productId: productId },
        data: { quantity: { decrement: 1 } },
      });
    } else {
      await prisma.cart.delete({
        where: { productId: productId },
      });
    }

    res.status(200).json({ message: "Product removed from cart" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove product from cart" });
  } finally {
    await prisma.$disconnect();
  }
}
