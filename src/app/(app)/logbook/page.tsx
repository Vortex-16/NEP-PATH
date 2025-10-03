import { ReportGenerator } from "@/components/report-generator";

export default function LogbookPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Internship Logbook & Report Generator</h1>
        <p className="text-muted-foreground">
          Maintain a real-time log of your internship activities and automatically generate your report.
        </p>
      </div>

      <ReportGenerator />
    </div>
  );
}
