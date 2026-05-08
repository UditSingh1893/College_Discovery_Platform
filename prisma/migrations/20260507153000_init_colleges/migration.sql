CREATE TABLE "colleges" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "shortName" TEXT NOT NULL,
  "location" TEXT NOT NULL,
  "state" TEXT NOT NULL,
  "courses" TEXT[] NOT NULL,
  "fees" INTEGER NOT NULL,
  "rating" DOUBLE PRECISION NOT NULL,
  "placementPercent" INTEGER NOT NULL,
  "averagePackage" TEXT NOT NULL,
  "exams" TEXT[] NOT NULL,
  "closingRanks" JSONB NOT NULL,
  "type" TEXT NOT NULL,
  "established" INTEGER NOT NULL,
  "ownership" TEXT NOT NULL,
  "overview" TEXT NOT NULL,
  "highlights" TEXT[] NOT NULL,
  "topRecruiters" TEXT[] NOT NULL,
  "medianPackage" TEXT NOT NULL,
  "highestPackage" TEXT NOT NULL,

  CONSTRAINT "colleges_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "colleges_slug_key" ON "colleges"("slug");
CREATE INDEX "colleges_location_idx" ON "colleges"("location");
CREATE INDEX "colleges_type_idx" ON "colleges"("type");
