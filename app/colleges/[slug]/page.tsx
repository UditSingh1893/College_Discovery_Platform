import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/app/components/app-shell";
import { formatFees } from "@/types/college";
import { getCollegeBySlug } from "@/lib/college-service";

export default async function CollegeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const college = await getCollegeBySlug(slug);

  if (!college) {
    notFound();
  }

  return (
    <AppShell>
      <main>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <Link href="/colleges" className="text-sm font-bold text-cyan-700 hover:text-cyan-900">
              Back to colleges
            </Link>
            <div className="mt-5 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="text-sm font-black uppercase tracking-wide text-cyan-700">{college.type}</p>
                <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
                  {college.name}
                </h1>
                <p className="mt-4 max-w-3xl text-base font-medium leading-7 text-slate-600">{college.overview}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Stat label="Fees" value={formatFees(college.fees)} />
                <Stat label="Rating" value={college.rating.toFixed(1)} />
                <Stat label="Placement" value={`${college.placementPercent}%`} />
                <Stat label="Location" value={college.location} />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <aside className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-black">Basic info</h2>
              <dl className="mt-4 grid gap-3 text-sm">
                <Info label="Established" value={String(college.established)} />
                <Info label="Ownership" value={college.ownership} />
                <Info label="Accepted exams" value={college.exams.join(", ")} />
                <Info label="Average package" value={college.averagePackage} />
              </dl>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-black">Highlights</h2>
              <ul className="mt-4 space-y-3">
                {college.highlights.map((item) => (
                  <li key={item} className="rounded-lg bg-slate-50 p-3 text-sm font-bold text-slate-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="space-y-6">
            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-2xl font-black tracking-tight">Courses offered</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {college.courses.map((course) => (
                  <div key={course} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <h3 className="font-black">{course}</h3>
                    <p className="mt-2 text-sm font-medium text-slate-600">
                      Indicative total fees: {formatFees(college.fees)}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-2xl font-black tracking-tight">Placements</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <Stat label="Placement rate" value={`${college.placementPercent}%`} />
                <Stat label="Median package" value={college.placements.medianPackage} />
                <Stat label="Highest package" value={college.placements.highestPackage} />
              </div>
              <h3 className="mt-6 text-sm font-black uppercase tracking-wide text-slate-500">Top recruiters</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {college.placements.topRecruiters.map((recruiter) => (
                  <span key={recruiter} className="rounded-md bg-cyan-50 px-3 py-2 text-sm font-bold text-cyan-900">
                    {recruiter}
                  </span>
                ))}
              </div>
            </section>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/compare?ids=${college.slug}`}
                className="rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                Compare this college
              </Link>
              <Link
                href="/predictor"
                className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-slate-950"
              >
                Try predictor
              </Link>
            </div>
          </div>
        </section>
      </main>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-black text-slate-950">{value}</p>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
      <dt className="font-bold text-slate-500">{label}</dt>
      <dd className="text-right font-black text-slate-900">{value}</dd>
    </div>
  );
}
