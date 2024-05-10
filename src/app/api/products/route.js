import prisma from "@/utils/prisma/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const res = await prisma.product.findMany();
  return NextResponse.json(res);
}
