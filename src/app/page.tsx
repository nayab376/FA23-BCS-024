import Link from "next/link";
import { featuredAds, kpiCards, packages, workflowStages } from "@/lib/mock-data";

const trustPillars = [
  "Role-based dashboards for client, moderator, admin, and super admin",
  "Supabase Postgres schema designed around workflow states, payments, and audit logs",
  "Vercel-ready architecture with API routes, cron endpoints, and deployment docs",
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8">
      <section className="hero-grid overflow-hidden rounded-[32px] border border-white/60 px-6 py-8 shadow-[0_30px_90px_rgba(24,44,35,0.14)] sm:px-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div className="space-y-6">
            <div className="inline-flex rounded-full border border-emerald-200/80 bg-white/80 px-4 py-2 text-sm font-semibold text-emerald-900 shadow-sm backdrop-blur">
              Advanced Midterm Starter • Next.js + Supabase + Vercel
            </div>
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-900/70">
                AdFlow Pro
              </p>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Sponsored listing marketplace with moderation, payment verification,
                analytics, and launch-ready database design.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-700">
                Yeh initial project submission is tarah banaya gaya hai ke GitHub par
                architecture clearly nazar aaye: public marketplace, internal workflow,
                sample dashboards, aur Supabase schema sab ek hi starter mein ready hain.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/explore" className="button-primary">
                Explore sample ads
              </Link>
              <Link href="/dashboard/admin" className="button-secondary">
                Open admin preview
              </Link>
            </div>
          </div>

          <div className="glass-panel space-y-5 rounded-[28px] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-900/60">
                  Launch Snapshot
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                  Week 1 submission ready
                </h2>
              </div>
              <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-900">
                Initial 10 marks
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {kpiCards.map((card) => (
                <div
                  key={card.label}
                  className="rounded-2xl border border-emerald-100 bg-white/80 p-4"
                >
                  <p className="text-sm text-slate-500">{card.label}</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-950">
                    {card.value}
                  </p>
                  <p className="mt-2 text-sm text-slate-600">{card.helper}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {trustPillars.map((item) => (
          <article key={item} className="glass-panel rounded-[28px] p-6">
            <p className="text-base leading-7 text-slate-700">{item}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="glass-panel rounded-[30px] p-6 sm:p-8">
          <div className="section-header">
            <span>Packages</span>
            <h2>Revenue model aur ranking engine dono ready</h2>
            <p>
              Project brief ke mutabiq package weight, duration, featured placement,
              aur visibility rules ko is starter mein document bhi kiya gaya hai aur
              UI level par bhi show kiya gaya hai.
            </p>
          </div>
          <div className="mt-6 grid gap-4">
            {packages.map((pkg) => (
              <article key={pkg.name} className="rounded-[24px] border border-slate-200 bg-white p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-950">{pkg.name}</h3>
                    <p className="mt-2 max-w-xl text-slate-600">{pkg.description}</p>
                  </div>
                  <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-right">
                    <p className="text-sm text-emerald-900/70">Suggested price</p>
                    <p className="text-2xl font-semibold text-emerald-950">{pkg.price}</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-700">
                  <span className="tag">{pkg.duration}</span>
                  <span className="tag">{pkg.visibility}</span>
                  <span className="tag">{pkg.refreshRule}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[30px] p-6 sm:p-8">
          <div className="section-header">
            <span>Workflow</span>
            <h2>Ad lifecycle simple CRUD se kaafi better dikh raha hai</h2>
            <p>
              Draft se publish aur expire tak har stage ke saath role ownership aur
              next transition clear hai, jo viva aur grading rubric dono mein help karega.
            </p>
          </div>
          <div className="mt-6 space-y-4">
            {workflowStages.map((stage, index) => (
              <article
                key={stage.name}
                className="rounded-[24px] border border-slate-200 bg-white p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-900/55">
                      Stage {index + 1}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-950">
                      {stage.name}
                    </h3>
                    <p className="mt-2 text-slate-600">{stage.description}</p>
                  </div>
                  <span className="tag">{stage.actor}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-panel rounded-[30px] p-6 sm:p-8">
        <div className="section-header">
          <span>Featured Listings</span>
          <h2>Sample marketplace cards public side ke liye ready</h2>
          <p>
            Yeh cards abhi mock data se aa rahi hain, lekin structure Supabase tables
            ke mutabiq rakha gaya hai taa ke baad mein real query attach karna easy ho.
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featuredAds.map((ad) => (
            <article key={ad.slug} className="overflow-hidden rounded-[26px] border border-slate-200 bg-white">
              <div className="h-44 bg-[radial-gradient(circle_at_top_left,#bbf7d0,transparent_48%),linear-gradient(120deg,#0f172a,#1d4d4f)] p-5 text-white">
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
                    {ad.packageName}
                  </span>
                  <span className="rounded-full border border-white/25 px-3 py-1 text-xs">
                    {ad.city}
                  </span>
                </div>
                <h3 className="mt-10 max-w-xs text-2xl font-semibold">{ad.title}</h3>
              </div>
              <div className="space-y-4 p-5">
                <p className="text-sm leading-7 text-slate-600">{ad.summary}</p>
                <div className="flex flex-wrap gap-3 text-sm text-slate-700">
                  <span className="tag">{ad.category}</span>
                  <span className="tag">Rank {ad.rankScore}</span>
                  <span className="tag">Expires {ad.expiresIn}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
