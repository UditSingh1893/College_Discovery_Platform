import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // -----------------------------
    // Query Params
    // -----------------------------
    const search = searchParams.get("search")?.trim() || "";
    const location = searchParams.get("location")?.trim() || "";
    const course = searchParams.get("course")?.trim() || "";
    const exam = searchParams.get("exam")?.trim() || "";
    const type = searchParams.get("type")?.trim() || "";

    const sort = searchParams.get("sort") || "rating";

    const order: Prisma.SortOrder =
      searchParams.get("order") === "asc" ? "asc" : "desc";

    const page = Math.max(
      1,
      parseInt(searchParams.get("page") || "1")
    );

    const limit = Math.min(
      50,
      Math.max(1, parseInt(searchParams.get("limit") || "20"))
    );

    // -----------------------------
    // WHERE FILTERS
    // -----------------------------
    const where: Prisma.CollegeWhereInput = {};

    // Search by name OR shortName
    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          shortName: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    // Location filter
    if (location) {
      where.location = {
        equals: location,
        mode: "insensitive",
      };
    }

    // PostgreSQL array filter
    if (course) {
      where.courses = {
        has: course,
      };
    }

    // PostgreSQL array filter
    if (exam) {
      where.exams = {
        has: exam,
      };
    }

    // Type filter
    if (type) {
      where.type = {
        equals: type,
        mode: "insensitive",
      };
    }

    // -----------------------------
    // SORTING
    // -----------------------------
    let orderBy: Prisma.CollegeOrderByWithRelationInput;

    switch (sort) {
      case "fees":
        orderBy = { fees: order };
        break;

      case "placement":
        orderBy = { placementPercent: order };
        break;

      case "name":
        orderBy = { name: order };
        break;

      case "rating":
      default:
        orderBy = { rating: order };
        break;
    }

    // -----------------------------
    // DATABASE QUERIES
    // -----------------------------
    const [total, colleges] = await Promise.all([
      prisma.college.count({
        where,
      }),

      prisma.college.findMany({
        where,
        orderBy,

        skip: (page - 1) * limit,
        take: limit,

        select: {
          id: true,
          slug: true,
          name: true,
          shortName: true,
          location: true,
          state: true,
          courses: true,
          fees: true,
          rating: true,
          placementPercent: true,
          averagePackage: true,
          exams: true,
          type: true,
          ownership: true,
          established: true,
        },
      }),
    ]);

    // -----------------------------
    // RESPONSE
    // -----------------------------
    return NextResponse.json({
      success: true,

      data: colleges,

      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("GET /api/colleges error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch colleges",
      },
      {
        status: 500,
      }
    );
  }
}