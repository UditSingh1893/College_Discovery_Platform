import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

// Optional caching
export const revalidate = 3600;

export async function GET() {
  try {
    // -----------------------------------
    // FETCH ONLY REQUIRED FIELDS
    // -----------------------------------
    const colleges = await prisma.college.findMany({
      select: {
        location: true,
        courses: true,
        exams: true,
        type: true,
        ownership: true,
      },
    });

    // -----------------------------------
    // SETS FOR UNIQUE VALUES
    // -----------------------------------
    const locationsSet = new Set<string>();

    const coursesSet = new Set<string>();

    const examsSet = new Set<string>();

    const typesSet = new Set<string>();

    const ownershipsSet = new Set<string>();

    // -----------------------------------
    // PROCESS DATA
    // -----------------------------------
    for (const college of colleges) {
      // Location
      if (college.location?.trim()) {
        locationsSet.add(college.location.trim());
      }

      // Type
      if (college.type?.trim()) {
        typesSet.add(college.type.trim());
      }

      // Ownership
      if (college.ownership?.trim()) {
        ownershipsSet.add(college.ownership.trim());
      }

      // Courses
      if (Array.isArray(college.courses)) {
        for (const course of college.courses) {
          if (course?.trim()) {
            coursesSet.add(course.trim());
          }
        }
      }

      // Exams
      if (Array.isArray(college.exams)) {
        for (const exam of college.exams) {
          if (exam?.trim()) {
            examsSet.add(exam.trim().toUpperCase());
          }
        }
      }
    }

    // -----------------------------------
    // SORTED ARRAYS
    // -----------------------------------
    const locations =
      Array.from(locationsSet).sort();

    const courses =
      Array.from(coursesSet).sort();

    const exams =
      Array.from(examsSet).sort();

    const types =
      Array.from(typesSet).sort();

    const ownerships =
      Array.from(ownershipsSet).sort();

    // -----------------------------------
    // RESPONSE
    // -----------------------------------
    return NextResponse.json({
      success: true,

      data: {
        locations,
        courses,
        exams,
        types,
        ownerships,
      },
    });
  } catch (error) {
    console.error(
      "GET /api/colleges/filters error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch filter options",
      },
      {
        status: 500,
      }
    );
  }
}