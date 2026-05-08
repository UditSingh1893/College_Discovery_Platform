import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

type ClosingRanks = Record<string, number>;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    // -----------------------------------
    // QUERY PARAMS
    // -----------------------------------
    const exam =
      searchParams.get("exam")?.trim().toUpperCase() || "";

    const rankStr =
      searchParams.get("rank")?.trim() || "";

    // -----------------------------------
    // VALIDATION
    // -----------------------------------
    if (!exam) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required query param: exam",
        },
        {
          status: 400,
        }
      );
    }

    const rank = Number(rankStr);

    if (!Number.isFinite(rank) || rank <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "rank must be a positive number",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------------
    // FETCH COLLEGES
    // -----------------------------------
    const colleges = await prisma.college.findMany({
      where: {
        exams: {
          has: exam,
        },
      },

      select: {
        id: true,
        slug: true,
        name: true,
        shortName: true,
        location: true,
        state: true,

        rating: true,
        fees: true,

        placementPercent: true,
        averagePackage: true,

        type: true,
        ownership: true,

        closingRanks: true,
      },

      orderBy: [
        {
          rating: "desc",
        },
        {
          placementPercent: "desc",
        },
      ],
    });

    // -----------------------------------
    // FILTER PREDICTIONS
    // -----------------------------------
    const predicted = colleges
      .filter((college) => {
        if (
          !college.closingRanks ||
          typeof college.closingRanks !== "object" ||
          Array.isArray(college.closingRanks)
        ) {
          return false;
        }

        const ranks =
          college.closingRanks as ClosingRanks;

        const cutoff = ranks[exam];

        return (
          typeof cutoff === "number" &&
          rank <= cutoff
        );
      })

      .map((college) => {
        const ranks =
          college.closingRanks as ClosingRanks;

        return {
          ...college,
          cutoffRank: ranks[exam],
        };
      })

      .sort((a, b) => a.cutoffRank - b.cutoffRank);

    // -----------------------------------
    // FALLBACK RESULTS
    // -----------------------------------
    let fallback: typeof predicted = [];

    if (predicted.length === 0) {
      fallback = colleges
        .filter((college) => {
          if (
            !college.closingRanks ||
            typeof college.closingRanks !== "object" ||
            Array.isArray(college.closingRanks)
          ) {
            return false;
          }

          const ranks =
            college.closingRanks as ClosingRanks;

          return typeof ranks[exam] === "number";
        })

        .map((college) => {
          const ranks =
            college.closingRanks as ClosingRanks;

          return {
            ...college,
            cutoffRank: ranks[exam],
          };
        })

        .sort((a, b) => a.cutoffRank - b.cutoffRank)

        .slice(0, 5);
    }

    // -----------------------------------
    // RESPONSE
    // -----------------------------------
    return NextResponse.json({
      success: true,

      data: {
        exam,
        rank,

        totalMatches: predicted.length,

        predicted,

        fallback,
      },
    });
  } catch (error) {
    console.error(
      "GET /api/colleges/predict error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to run prediction",
      },
      {
        status: 500,
      }
    );
  }
}