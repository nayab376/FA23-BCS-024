# AdFlow Pro

AdFlow Pro ek advanced midterm starter project hai jo sponsored listing marketplace ko model karta hai. Is initial version mein:

- Next.js App Router based public marketplace UI
- Client, moderator, aur admin dashboard previews
- Supabase-ready database schema aur seed SQL
- API routes for random learning question aur DB health check
- Vercel deployment ke liye clean starter structure

## Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- Supabase Postgres
- Vercel deployment target

## Local Setup

```bash
npm install
npm run dev
```

App open karein: [http://localhost:3000](http://localhost:3000)

## Supabase Setup

1. Supabase par naya project create karein.
2. `.env.example` ko copy karke `.env.local` banayein.
3. `NEXT_PUBLIC_SUPABASE_URL` aur `NEXT_PUBLIC_SUPABASE_ANON_KEY` fill karein.
4. Supabase SQL editor mein pehle `supabase/schema.sql` run karein.
5. Us ke baad `supabase/seed.sql` run karein.

## Important Routes

- `/` landing page
- `/explore` public marketplace preview
- `/dashboard/client`
- `/dashboard/moderator`
- `/dashboard/admin`
- `/api/questions/random`
- `/api/health/db`

## GitHub Submission Tips

- Is folder `adflow-pro` ko hi apne new `nayab376/MIDTERM` repo mein push karein.
- README, schema, aur initial dashboards marks lene ke liye strong first submission denge.
- Next step mein auth, forms, real Supabase queries, aur cron endpoints add kiye ja sakte hain.

## Vercel Deploy

1. GitHub repo ko Vercel se import karein.
2. Root directory `adflow-pro` set karein agar repo root par aur files bhi hon.
3. Same Supabase env vars Vercel project settings mein add karein.
4. Deploy karein.
