import { NextRequest, NextResponse } from "next/server";
import { searchProducts, searchCategories } from "@/lib/search";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get("q") || "";
  const limit = Math.min(parseInt(searchParams.get("limit") || "5", 10), 20);

  if (!query.trim() || query.length < 2) {
    return NextResponse.json({ products: [], categories: [] });
  }

  const [products, categories] = await Promise.all([
    searchProducts(query, limit).catch(() => []),
    searchCategories(query, 5).catch(() => []),
  ]);

  return NextResponse.json({ products, categories });
}
