"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { College } from "@/types/college";
import { formatFees } from "@/types/college";

const pageSize = 6;

export function CollegeExplorer({ colleges }: { colleges: College[] }) {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("All");
  const [course, setCourse] = useState("All");
  const [page, setPage] = useState(1);

  const locations = useMemo(
    () => Array.from(new Set(colleges.map((college) => college.location))).sort(),
    [colleges],
  );
  const courses = useMemo(
    () => Array.from(new Set(colleges.flatMap((college) => college.courses))).sort(),
    [colleges],
  );

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return colleges.filter((college) => {
      const matchesName =
        !normalizedQuery ||
        college.name.toLowerCase().includes(normalizedQuery) ||
        college.shortName.toLowerCase().includes(normalizedQuery);
      const matchesLocation = location === "All" || college.location === location;
      const matchesCourse = course === "All" || college.courses.includes(course);

      return matchesName && matchesLocation && matchesCourse;
    });
  }, [colleges, course, location, query]);

  const maxPage = Math.max(1, Math.ceil(filtered.length / pageSize));
  const visible = filtered.slice(0, page * pageSize);

  function resetFilters() {
    setQuery("");
    setLocation("All");
    setCourse("All");
    setPage(1);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[1.4fr_0.8fr_0.8fr_auto]">
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Search</span>
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder="Search IIT, Delhi, BITS..."
            className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium outline-none transition focus:border-slate-950 focus:ring-4 focus:ring-slate-200"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Location</span>
          <select
            value={location}
            onChange={(event) => {
              setLocation(event.target.value);
              setPage(1);
            }}
            className="h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold outline-none transition focus:border-slate-950 focus:ring-4 focus:ring-slate-200"
          >
            <option>All</option>
            {locations.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Course</span>
          <select
            value={course}
            onChange={(event) => {
              setCourse(event.target.value);
              setPage(1);
            }}
            className="h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold outline-none transition focus:border-slate-950 focus:ring-4 focus:ring-slate-200"
          >
            <option>All</option>
            {courses.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={resetFilters}
          className="self-end rounded-lg border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
        >
          Reset
        </button>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-600">
          Showing {visible.length} of {filtered.length} colleges
        </p>
        <Link
          href="/compare"
          className="rounded-lg bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          Compare shortlisted colleges
        </Link>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {visible.map((college) => (
          <article
            key={college.slug}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-cyan-700">{college.type}</p>
                <h2 className="mt-2 text-xl font-black tracking-tight text-slate-950">{college.shortName}</h2>
                <p className="mt-1 text-sm font-medium text-slate-500">{college.name}</p>
              </div>
              <div className="rounded-lg bg-emerald-50 px-3 py-2 text-right">
                <p className="text-xs font-bold text-emerald-700">Rating</p>
                <p className="text-lg font-black text-emerald-900">{college.rating.toFixed(1)}</p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Metric label="Location" value={college.location} />
              <Metric label="Fees" value={formatFees(college.fees)} />
              <Metric label="Placement" value={`${college.placementPercent}%`} />
              <Metric label="Avg package" value={college.averagePackage} />
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {college.courses.slice(0, 4).map((item) => (
                <span key={item} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={`/colleges/${college.slug}`}
                className="rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                View details
              </Link>
              <Link
                href={`/compare?ids=${college.slug}`}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-slate-950 hover:text-slate-950"
              >
                Start compare
              </Link>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
          <h2 className="text-xl font-black">No colleges match these filters</h2>
          <p className="mt-2 text-sm font-medium text-slate-500">Try a broader course or location.</p>
        </div>
      ) : null}

      {page < maxPage ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setPage((currentPage) => currentPage + 1)}
            className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-slate-950"
          >
            Load more colleges
          </button>
        </div>
      ) : null}
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-black text-slate-950">{value}</p>
    </div>
  );
}
