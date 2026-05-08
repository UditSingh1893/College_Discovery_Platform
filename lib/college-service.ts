import type { College } from "@/types/college";

import { prisma } from "@/lib/prisma";

type CollegeRecord =
  Awaited<
    ReturnType<typeof prisma.college.findFirst>
  >;

function toRankMap(
  value: unknown
): Record<string, number> {
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value).filter(
      (
        entry
      ): entry is [string, number] =>
        typeof entry[1] === "number"
    )
  );
}

function mapCollege(
  record: NonNullable<CollegeRecord>
): College {
  return {
    slug: record.slug,

    name: record.name,

    shortName: record.shortName,

    location: record.location,

    state: record.state,

    courses: record.courses,

    fees: record.fees,

    rating: record.rating,

    placementPercent:
      record.placementPercent,

    averagePackage:
      record.averagePackage,

    exams: record.exams,

    closingRanks: toRankMap(
      record.closingRanks
    ),

    type: record.type,

    established: record.established,

    ownership: record.ownership,

    overview: record.overview,

    highlights: record.highlights,

    placements: {
      topRecruiters:
        record.topRecruiters,

      medianPackage:
        record.medianPackage,

      highestPackage:
        record.highestPackage,
    },
  };
}

export async function getColleges() {
  const records =
    await prisma.college.findMany({
      orderBy: [
        { rating: "desc" },
        {
          placementPercent: "desc",
        },
        { name: "asc" },
      ],
    });

  return records.map(mapCollege);
}

export async function getFeaturedColleges(
  limit = 4
) {
  const records =
    await prisma.college.findMany({
      orderBy: [
        { rating: "desc" },
        {
          placementPercent: "desc",
        },
      ],

      take: limit,
    });

  return records.map(mapCollege);
}

export async function getCollegeBySlug(
  slug: string
) {
  const record =
    await prisma.college.findUnique({
      where: { slug },
    });

  return record
    ? mapCollege(record)
    : null;
}