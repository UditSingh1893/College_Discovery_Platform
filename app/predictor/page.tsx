import { AppShell } from "@/app/components/app-shell";
import { PredictorTool } from "@/app/components/predictor-tool";
import { getColleges } from "@/lib/college-service";

export default async function PredictorPage() {
  const colleges = await getColleges();

  return (
    <AppShell>
      <main>
        <PredictorTool colleges={colleges} />
      </main>
    </AppShell>
  );
}
