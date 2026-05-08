export const dynamic = "force-dynamic";
import { AppShell } from "@/app/components/app-shell";
import { CompareTool } from "@/app/components/compare-tool";
import { getColleges } from "@/lib/college-service";

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ ids?: string | string[] }>;
}) {
  const params = await searchParams;
  const idsParam = Array.isArray(params.ids) ? params.ids[0] : params.ids;
  const initialIds = idsParam ? idsParam.split(",").filter(Boolean) : undefined;
  const colleges = await getColleges();

  return (
    <AppShell>
      <main>
        <CompareTool colleges={colleges} initialIds={initialIds} />
      </main>
    </AppShell>
  );
}
