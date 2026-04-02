import { DashboardShell } from "@/components/dashboard-shell";
import { dashboardMetrics } from "@/lib/mock-data";

export default function ClientDashboardPage() {
  return (
    <DashboardShell
      eyebrow="Client Dashboard"
      title="Submit ads, track status, and manage packages"
      description="Client ko apni listings, payment proof, notifications, aur status transitions ek jagah dikhaye ja rahe hain."
      metrics={dashboardMetrics.client}
    >
      <section className="grid gap-4 lg:grid-cols-2">
        <article className="glass-panel rounded-[28px] p-6">
          <h2 className="text-2xl font-semibold text-slate-950">Recent listings</h2>
          <div className="mt-4 space-y-3 text-slate-700">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              Draft • Boutique Launch Promotion
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              Under review • Gulberg Office Space
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              Payment submitted • Ramadan Food Bazaar Booth
            </div>
          </div>
        </article>

        <article className="glass-panel rounded-[28px] p-6">
          <h2 className="text-2xl font-semibold text-slate-950">Action checklist</h2>
          <div className="mt-4 space-y-3 text-slate-700">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              1. Create ad draft with category, city, and media URL
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              2. Select package and submit transaction reference
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              3. Watch status updates until publish confirmation
            </div>
          </div>
        </article>
      </section>
    </DashboardShell>
  );
}
