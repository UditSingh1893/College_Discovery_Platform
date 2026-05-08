import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/colleges/:slug
 *
 * Fetch a single college by its unique slug.
 */
export async function GET(
  _request: NextRequest,
  ctx: RouteContext<"/api/colleges/[slug]">,
) {
  try {
    const { slug } = await ctx.params;

    const college = await prisma.college.findUnique({
      where: { slug },
    });

    if (!college) {
      return Response.json(
        { error: "College not found" },
        { status: 404 },
      );
    }

    return Response.json({ data: college });
  } catch (error) {
    console.error("GET /api/colleges/[slug] error:", error);
    return Response.json(
      { error: "Failed to fetch college" },
      { status: 500 },
    );
  }
}
