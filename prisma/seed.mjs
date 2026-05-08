import { readFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function loadCollegesFromSource() {
  const sourcePath = path.join(process.cwd(), "lib", "colleges.ts");
  const source = await readFile(sourcePath, "utf8");
  const match = source.match(/export const colleges: College\[\] = (\[[\s\S]*?\]);\s*\n\nexport const exams/);

  if (!match) {
    throw new Error("Could not locate the colleges array in lib/colleges.ts");
  }

  return vm.runInNewContext(match[1]);
}

async function main() {
  const colleges = await loadCollegesFromSource();

  for (const college of colleges) {
    await prisma.college.upsert({
      where: { slug: college.slug },
      create: {
        slug: college.slug,
        name: college.name,
        shortName: college.shortName,
        location: college.location,
        state: college.state,
        courses: college.courses,
        fees: college.fees,
        rating: college.rating,
        placementPercent: college.placementPercent,
        averagePackage: college.averagePackage,
        exams: college.exams,
        closingRanks: college.closingRanks,
        type: college.type,
        established: college.established,
        ownership: college.ownership,
        overview: college.overview,
        highlights: college.highlights,
        topRecruiters: college.placements.topRecruiters,
        medianPackage: college.placements.medianPackage,
        highestPackage: college.placements.highestPackage,
      },
      update: {
        name: college.name,
        shortName: college.shortName,
        location: college.location,
        state: college.state,
        courses: college.courses,
        fees: college.fees,
        rating: college.rating,
        placementPercent: college.placementPercent,
        averagePackage: college.averagePackage,
        exams: college.exams,
        closingRanks: college.closingRanks,
        type: college.type,
        established: college.established,
        ownership: college.ownership,
        overview: college.overview,
        highlights: college.highlights,
        topRecruiters: college.placements.topRecruiters,
        medianPackage: college.placements.medianPackage,
        highestPackage: college.placements.highestPackage,
      },
    });
  }

  console.log(`Seeded ${colleges.length} colleges into Supabase.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
