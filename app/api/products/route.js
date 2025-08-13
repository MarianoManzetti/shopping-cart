import { NextResponse } from "next/server";
import { products } from "@/data/products";

/**
 * @route GET /api/products
 * @description Returns the static list of available products.
 * @access Public
 */
export async function GET() {
  if (!products) {
    return NextResponse.json({ error: "Products not found" }, { status: 404 });
  }

  return NextResponse.json(products);
}