"use client";

import { useMemo, useState } from "react";
import type { College } from "@/types/college";
import { formatFees } from "@/types/college";

const defaultSelection = ["iit-delhi", "bits-pilani"];

export function CompareTool({
  colleges,
  initialIds = defaultSelection,
}: {
  colleges: College[];
  initialIds?: string[];
}) {
  const normalizedInitialIds = initialIds.filter((id) => colleges.some((college) => college.slug === id)).slice(0, 3);
  const startingIds =
    normalizedInitialIds.length >= 2
      ? normalizedInitialIds
      : [
          ...normalizedInitialIds,
          ...defaultSelection.filter((id) => !normalizedInitialIds.includes(id)),
        ].slice(0, 2);
  const [selectedIds, setSelectedIds] = useState(startingIds);

  const selectedColleges = useMemo(
    () => selectedIds.map((id) => colleges.find((college) => college.slug === id)).filter(Boolean) as College[],
    [colleges, selectedIds],
  );

  function updateSelection(index: number, slug: string) {
    setSelectedIds((current) => {
      const next = [...current];
      next[index] = slug;
      return Array.from(new Set(next)).slice(0, 3);
    });
  }

  function addCollege() {
    const nextCollege = colleges.find((college) => !selectedIds.includes(college.slug));
    if (nextCollege) {
      setSelectedIds((current) => [...current, nextCollege.slug].slice(0, 3));
    }
  }

  function removeCollege(slug: string) {
    setSelectedIds((current) => current.filter((id) => id !== slug));
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Compare colleges</h1>
            <p className="mt-1 text-sm font-medium text-slate-500">Select 2 to 3 colleges and compare decision metrics.</p>
          </div>
          <button
            type="button"
            onClick={addCollege}
            disabled={selectedIds.length >= 3}
            className="rounded-lg bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Add college
          </button>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {selectedIds.map((slug, index) => (
            <div key={`${slug}-${index}`} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-500">
                College {index + 1}
              </label>
              <select
                value={slug}
                onChange={(event) => updateSelection(index, event.target.value)}
                className="mt-2 h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold outline-none transition focus:border-slate-950 focus:ring-4 focus:ring-slate-200"
              >
                {colleges.map((college) => (
                  <option key={college.slug} value={college.slug} disabled={selectedIds.includes(college.slug) && college.slug !== slug}>
                    {college.shortName}
                  </option>
                ))}
              </select>
              {selectedIds.length > 2 ? (
                <button
                  type="button"
                  onClick={() => removeCollege(slug)}
                  className="mt-3 text-sm font-bold text-rose-700 hover:text-rose-900"
                >
                  Remove
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="bg-slate-950 text-white">
                <th className="w-48 px-4 py-4 text-sm font-black">Metric</th>
                {selectedColleges.map((college) => (
                  <th key={college.slug} className="px-4 py-4 text-sm font-black">
                    {college.shortName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <CompareRow label="Fees" values={selectedColleges.map((college) => formatFees(college.fees))} />
              <CompareRow label="Placement %" values={selectedColleges.map((college) => `${college.placementPercent}%`)} />
              <CompareRow label="Rating" values={selectedColleges.map((college) => college.rating.toFixed(1))} />
              <CompareRow label="Location" values={selectedColleges.map((college) => college.location)} />
              <CompareRow label="Average package" values={selectedColleges.map((college) => college.averagePackage)} />
              <CompareRow label="Top exams" values={selectedColleges.map((college) => college.exams.slice(0, 3).join(", "))} />
              <CompareRow label="Courses" values={selectedColleges.map((college) => college.courses.slice(0, 4).join(", "))} />
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function CompareRow({ label, values }: { label: string; values: string[] }) {
  return (
    <tr>
      <th className="bg-slate-50 px-4 py-4 text-sm font-black text-slate-700">{label}</th>
      {values.map((value, index) => (
        <td key={`${label}-${index}`} className="px-4 py-4 text-sm font-semibold text-slate-900">
          {value}
        </td>
      ))}
    </tr>
  );
}
