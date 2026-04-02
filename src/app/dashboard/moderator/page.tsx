import { DashboardShell } from "@/components/dashboard-shell";
import { dashboardMetrics } from "@/lib/mock-data";

export default function ModeratorDashboardPage() {
  return (
    <DashboardShell
      eyebrow="Moderator Panel"
      title="Content review queue with media checks and moderation notes"
      description="Moderator dashboard assignment ke workflow section ko directly reflect karta hai: review queue, suspicious media, rejection reasons, aur quality control."
      metrics={dashboardMetrics.moderator}
    >
      <section className="grid gap-4 lg:grid-cols-2">
        <article className="glass-panel rounded-[28px] p-6">
          <h2 className="text-2xl font-semibold text-slate-950">Review queue</h2>
          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-slate-700">
              Premium Ramadan Food Bazaar Booth • Needs policy fit review
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-slate-700">
              Family Hatchback • Duplicate content scan pending
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-slate-700">
              MacBook Pro Listing • Media URL normalization check
            </div>
          </div>
        </article>

        <article className="glass-panel rounded-[28px] p-6">
          <h2 className="text-2xl font-semibold text-slate-950">Moderator actions</h2>
          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-slate-700">
              Approve content and move to payment stage
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-slate-700">
              Reject ad with reason and internal note
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-slate-700">
              Flag suspicious media or duplicate listing
            </div>
          </div>
        </article>
      </section>
    </DashboardShell>
  );
}
