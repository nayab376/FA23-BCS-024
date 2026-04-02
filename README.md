# AdFlow Pro

AdFlow Pro ek advanced midterm starter project hai jo sponsored listing marketplace ko model karta hai. Is repo mein planning material aur working Next.js starter dono preserve kiye gaye hain.

## Team Members

| Name | Role |
|------|------|
| Nayab | Full Stack |
| Sana | Full Stack |
| Noor Fatima | Full Stack |

## Initial Submission Includes

- Next.js App Router based public marketplace UI
- Client, moderator, aur admin dashboard previews
- Supabase-ready database schema aur seed SQL
- API routes for random learning question aur DB health check
- Vercel deployment ke liye clean starter structure
- Existing planning files from the original repository kept for reference

## Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- Supabase Postgres
- Vercel deployment target

## Project Overview

- Clients paid listings submit karte hain
- Moderators content review karte hain
- Admin payments verify karta hai
- Only approved ads limited package duration ke liye live jati hain

## Ad Lifecycle

Draft -> Submitted -> Under Review -> Payment Pending -> Payment Submitted -> Payment Verified -> Scheduled -> Published -> Expired

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

## Legacy Material

- `client/`, `server/`, and `Midproject/` folders remote repo se preserve kiye gaye hain.
- Current working Next.js starter top level par available hai.

## Vercel Deploy

1. GitHub repo ko Vercel se import karein.
2. Root directory `.` rakhain kyun ke Next.js app top level par hai.
3. Same Supabase env vars Vercel project settings mein add karein.
4. Deploy karein.
