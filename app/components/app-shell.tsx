import Link from "next/link";

const navItems = [
  { href: "/colleges", label: "Colleges" },
  { href: "/compare", label: "Compare" },
  { href: "/predictor", label: "Predictor" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f6f7f9] text-slate-950">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-slate-950 text-sm font-black text-white">
              CD
            </span>
            <span>
              <span className="block text-base font-bold leading-5">CollegeDecision</span>
              <span className="block text-xs font-medium text-slate-500">Find. Compare. Decide.</span>
            </span>
          </Link>
          <nav className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white hover:text-slate-950"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
