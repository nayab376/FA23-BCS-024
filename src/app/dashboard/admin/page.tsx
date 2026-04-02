import { DashboardShell } from "@/components/dashboard-shell";
import { dashboardMetrics } from "@/lib/mock-data";

export default function AdminDashboardPage() {
  return (
    <DashboardShell
      eyebrow="Admin Dashboard"
      title="Payment verification, publishing control, and analytics snapshot"
      description="Admin panel mein payment queue, publishing actions, expiry monitoring, aur business metrics ka starter version diya gaya hai."
      metrics={dashboardMetrics.admin}
    >
      <section className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        <article className="glass-panel rounded-[28px] p-6">
          <h2 className="text-2xl font-semibold text-slate-950">Payment verification queue</h2>
          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-slate-700">
              TXN-98431 • Ramadan Food Bazaar Booth • Awaiting admin verification
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-slate-700">
              TXN-87352 • Wedding Hall Weekend Sponsorship • Screenshot URL attached
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 text-slate-700">
              TXN-44112 • Smart Office Space • Potential duplicate transaction ref
            </div>
          </div>
        </article>

        <article className="glass-panel rounded-[28px] p-6">
          <h2 className="text-2xl font-semibold text-slate-950">Operations board</h2>
          <div className="mt-4 space-y-3 text-slate-700">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              Cron: publish scheduled ads every hour
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              Cron: expire outdated ads daily
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              Health: insert DB heartbeat logs for monitoring
            </div>
          </div>
        </article>
      </section>
    </DashboardShell>
  );
}
