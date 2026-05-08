export interface College {
  slug: string;

  name: string;

  shortName: string;

  location: string;

  state: string;

  courses: string[];

  fees: number;

  rating: number;

  placementPercent: number;

  averagePackage: string;

  exams: string[];

  closingRanks: Record<string, number>;

  type: string;

  established: number;

  ownership: string;

  overview: string;

  highlights: string[];

  placements: {
    topRecruiters: string[];

    medianPackage: string;

    highestPackage: string;
  };
}

export function formatFees(fees: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(fees);
}