import { AppShell } from "@/app/components/app-shell";
import { CollegeExplorer } from "@/app/components/college-explorer";
import { getColleges } from "@/lib/college-service";

export default async function CollegesPage() {
  const colleges = await getColleges();

  return (
    <AppShell>
      <main>
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <p className="text-sm font-black uppercase tracking-wide text-cyan-700">College listing</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Search colleges by name, location, and course
            </h1>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-slate-600">
              Browse decision-ready cards with fees, ratings, placement outcomes, and direct links to details.
            </p>
          </div>
        </section>
        <CollegeExplorer colleges={colleges} />
      </main>
    </AppShell>
  );
}
