import type { ReactNode } from "react";

type DashboardShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  metrics: { label: string; value: string }[];
  children: ReactNode;
};

export function DashboardShell({
  eyebrow,
  title,
  description,
  metrics,
  children,
}: DashboardShellProps) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <section className="glass-panel rounded-[30px] p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-900/55">
          {eyebrow}
        </p>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
              {title}
            </h1>
            <p className="mt-3 text-lg leading-8 text-slate-700">{description}</p>
          </div>
          <div className="rounded-3xl border border-emerald-100 bg-white px-5 py-4 text-sm text-slate-600">
            Supabase-ready • Sample workflow preview
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-[24px] border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">{metric.label}</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950">{metric.value}</p>
            </div>
          ))}
        </div>
      </section>

      {children}
    </main>
  );
}
