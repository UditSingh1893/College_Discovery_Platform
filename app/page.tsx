import Link from "next/link";
import { AppShell } from "@/app/components/app-shell";
import { formatFees } from "@/types/college";
import { getFeaturedColleges } from "@/lib/college-service";

export default async function Home() {
  const featured = await getFeaturedColleges(4);

  return (
    <AppShell>
      <main>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-14">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-cyan-700">Production MVP</p>
              <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                Discover colleges with the data that actually changes decisions.
              </h1>
              <p className="mt-5 max-w-2xl text-base font-medium leading-7 text-slate-600">
                Search by name, narrow by city and course, compare 2 to 3 options, and estimate choices from exam rank.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/colleges"
                  className="rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                >
                  Explore colleges
                </Link>
                <Link
                  href="/compare"
                  className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-slate-950"
                >
                  Compare now
                </Link>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {featured.map((college) => (
                <Link
                  key={college.slug}
                  href={`/colleges/${college.slug}`}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:border-slate-950 hover:bg-white"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-lg font-black text-slate-950">{college.shortName}</h2>
                    <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-black text-emerald-800">
                      {college.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-slate-500">{college.location}</p>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-bold text-slate-600">
                    <span>{formatFees(college.fees)}</span>
                    <span>{college.placementPercent}% placed</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            ["Search", "Fast college listing with live name search and practical filters."],
            ["Compare", "Side-by-side fees, placement, rating, and location for 2 to 3 colleges."],
            ["Predict", "Exam rank based college suggestions with clear cutoff context."],
          ].map(([title, copy]) => (
            <div key={title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-black">{title}</h2>
              <p className="mt-2 text-sm font-medium leading-6 text-slate-600">{copy}</p>
            </div>
          ))}
        </section>
      </main>
    </AppShell>
  );
}
