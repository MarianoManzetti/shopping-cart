import { NextResponse } from "next/server";
import { products } from "@/data/products";

let cart = [];

/**
 * @route GET /api/cart
 * @description Returns the current contents of the cart.
 * @access Public
 * @returns {Array} List of products in the cart with their quantity (`cant`).
 */
export async function GET() {
  return NextResponse.json(cart);
}

/**
 * @route POST /api/cart
 * @description Add a product to your cart by its ID. If it already exists, increase the quantity.
 * @access Public
 * @body {number} id - Product ID to add.
 * @returns {Array} Updated cart status.
 * @returns {string} error - Error message if the product is not found.
 */
export async function POST(request) {
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "Product id is required" }, { status: 400 });
  }

  if (cart.find((p) => p.id === id)) {
    const newCart = cart.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          cant: p.cant + 1
        }
      }
      return p;
    });

    cart = newCart;
  } else {
    const product = products.find((p) => p.id === id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    cart.push({
      ...product,
      cant: 1
    });
  }

  return NextResponse.json(cart);
}