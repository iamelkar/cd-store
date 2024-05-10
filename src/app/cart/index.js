import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const cartItems = await prisma.cart.findMany({
      include: { product: true },
    });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart items" });
  } finally {
    await prisma.$disconnect();
  }
}
