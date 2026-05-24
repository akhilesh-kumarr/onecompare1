import { NextResponse } from "next/server";
import { searchBackendComparisons } from "@/lib/backend-api";
import type { Category, SortKey } from "@/lib/comparison-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";
  const category = (searchParams.get("category") ?? "all") as Category | "all";
  const sort = (searchParams.get("sort") ?? "best") as SortKey;
  const pickup = searchParams.get("pickup") ?? undefined;
  const drop = searchParams.get("drop") ?? undefined;
  const maxPriceParam = searchParams.get("maxPrice");
  const maxPrice = maxPriceParam ? Number(maxPriceParam) : undefined;

  try {
    const { source, results } = await searchBackendComparisons({
      query,
      category,
      sort,
      pickup,
      drop,
      maxPrice
    });

    return NextResponse.json({
      query,
      category,
      sort,
      source,
      results
    });
  } catch {
    return NextResponse.json({ error: "Unable to search comparisons" }, { status: 500 });
  }
}
