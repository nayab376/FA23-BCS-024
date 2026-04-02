import { exploreAds } from "@/lib/mock-data";

export default function ExplorePage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <section className="glass-panel rounded-[30px] p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-900/55">
          Explore Ads
        </p>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
              Public marketplace browsing with filters, packages, and ranking
            </h1>
            <p className="mt-3 text-lg leading-8 text-slate-700">
              Initial version mein yeh page category, city, package, aur active-only
              concept ko showcase karta hai. Real data baad mein Supabase query se ayegi.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-slate-700">
            <span className="tag">Active only</span>
            <span className="tag">Search-ready</span>
            <span className="tag">Ranked listings</span>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-4">
        <div className="glass-panel rounded-[28px] p-5 lg:col-span-1">
          <h2 className="text-xl font-semibold text-slate-950">Quick filters</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              Category: All categories
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              City: Pakistan cities
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              Sort: Rank score
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:col-span-3 md:grid-cols-2">
          {exploreAds.map((ad) => (
            <article key={ad.slug} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white">
              <div className="border-b border-slate-100 p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-900">
                    {ad.packageName}
                  </span>
                  <span className="text-sm text-slate-500">{ad.city}</span>
                </div>
                <h2 className="mt-4 text-2xl font-semibold text-slate-950">{ad.title}</h2>
              </div>
              <div className="space-y-4 p-5">
                <p className="text-sm leading-7 text-slate-600">{ad.summary}</p>
                <div className="flex flex-wrap gap-3 text-sm text-slate-700">
                  <span className="tag">{ad.category}</span>
                  <span className="tag">Rank {ad.rankScore}</span>
                  <span className="tag">Expiry {ad.expiresIn}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
