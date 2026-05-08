"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { College } from "@/types/college";
import { formatFees } from "@/types/college";

export function PredictorTool({ colleges }: { colleges: College[] }) {
  const [exam, setExam] = useState("JEE");
  const [rank, setRank] = useState("5000");

  const parsedRank = Number(rank);
  const isValidRank = Number.isFinite(parsedRank) && parsedRank > 0;
  const exams = useMemo(
    () => Array.from(new Set(colleges.flatMap((college) => college.exams))).sort(),
    [colleges],
  );

  const predicted = useMemo(() => {
    if (!isValidRank) {
      return [];
    }

    return colleges
      .filter((college) => college.closingRanks[exam] && parsedRank <= college.closingRanks[exam])
      .sort((a, b) => a.closingRanks[exam] - b.closingRanks[exam]);
  }, [colleges, exam, isValidRank, parsedRank]);

  const fallback = useMemo(
    () =>
      colleges
        .filter((college) => college.exams.includes(exam))
        .sort((a, b) => (a.closingRanks[exam] ?? 999999) - (b.closingRanks[exam] ?? 999999))
        .slice(0, 4),
    [colleges, exam],
  );

  const results = predicted.length > 0 ? predicted : fallback;

  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-wide text-cyan-700">Predictor</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight">Find colleges by exam rank</h1>
        <p className="mt-3 text-sm font-medium leading-6 text-slate-600">
          Enter an exam and rank to get colleges where your rank is within the indicative closing range.
        </p>

        <div className="mt-6 grid gap-4">
          <label>
            <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Exam</span>
            <select
              value={exam}
              onChange={(event) => setExam(event.target.value)}
              className="h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold outline-none transition focus:border-slate-950 focus:ring-4 focus:ring-slate-200"
            >
              {exams.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Rank or percentile</span>
            <input
              value={rank}
              onChange={(event) => setRank(event.target.value)}
              inputMode="numeric"
              placeholder="Example: 5000"
              className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium outline-none transition focus:border-slate-950 focus:ring-4 focus:ring-slate-200"
            />
          </label>
        </div>

        <div className="mt-6 rounded-lg bg-amber-50 p-4 text-sm font-medium leading-6 text-amber-950">
          This MVP uses sample cutoffs for product flow validation. Production data should be refreshed from official counselling and college sources.
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Results</p>
            <h2 className="mt-1 text-2xl font-black tracking-tight">
              {predicted.length > 0 ? "Likely matches" : "Closest colleges"}
            </h2>
          </div>
          <span className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-black text-slate-700">
            {results.length} found
          </span>
        </div>

        {!isValidRank ? (
          <p className="mt-5 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm font-bold text-rose-800">
            Enter a positive rank to run the predictor.
          </p>
        ) : null}

        <div className="mt-5 grid gap-3">
          {results.map((college) => (
            <Link
              key={college.slug}
              href={`/colleges/${college.slug}`}
              className="rounded-lg border border-slate-200 p-4 transition hover:border-slate-950 hover:bg-slate-50"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-black text-slate-950">{college.shortName}</h3>
                  <p className="mt-1 text-sm font-medium text-slate-500">{college.location}</p>
                </div>
                <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-black text-emerald-800">
                  Closing {college.closingRanks[exam] ?? "N/A"}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                <span className="font-bold text-slate-600">Fees {formatFees(college.fees)}</span>
                <span className="font-bold text-slate-600">Rating {college.rating.toFixed(1)}</span>
                <span className="font-bold text-slate-600">Place {college.placementPercent}%</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
