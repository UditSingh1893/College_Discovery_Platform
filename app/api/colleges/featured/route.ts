export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/colleges/featured
 *
 * Returns top colleges sorted by rating + placement, for homepage display.
 *
 * Query params:
 *   limit – number of colleges to return (default: 4, max: 10)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const limit = Math.min(10, Math.max(1, Number(searchParams.get("limit")) || 4));

    const colleges = await prisma.college.findMany({
      orderBy: [{ rating: "desc" }, { placementPercent: "desc" }],
      take: limit,
    });

    return Response.json({ data: colleges });
  } catch (error) {
    console.error("GET /api/colleges/featured error:", error);
    return Response.json(
      { error: "Failed to fetch featured colleges" },
      { status: 500 },
    );
  }
}
