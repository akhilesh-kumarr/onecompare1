import { NextResponse } from "next/server";
import { localRecommendation } from "@/lib/backend-api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  return NextResponse.json(localRecommendation(id));
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const response = await fetch(`${API_BASE_URL}/api/v1/recommendations/best-deal`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store"
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Recommendation service failed" }, { status: response.status });
    }

    return NextResponse.json(await response.json());
  } catch {
    return NextResponse.json({ error: "Unable to generate recommendation" }, { status: 500 });
  }
}
