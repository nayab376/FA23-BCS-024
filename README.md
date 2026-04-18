# AdFlow Pro

A premium classifieds marketplace platform for Pakistan. Browse, search, and post ads across 10 categories — Electronics, Mobiles, Cameras, Vehicles, Property, Home & Furniture, Fashion, Sports, Books and Services.

**Built by Nayab Zaman**

**Live:** https://midterms-nu.vercel.app/

## Features

- Role-based login — **Buyer, Seller, Admin, Super Admin** (demo login, saved locally)
- Auth-gated **Post Ad** flow (login required to create new ads)
- 10 rich categories with 30+ pre-loaded products you can browse by click
- Posted ads persist across reloads and show alongside seed data
- Search by title, description, location or category
- Sort by newest, price low/high, or featured
- Admin / Super Admin roles can delete any ad; Sellers can delete their own
- Responsive dark-themed modern UI
- Optional backend API (graceful fallback to local data when offline)

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons
- **State**: React Context (auth) + `localStorage` persistence
- **Backend API** *(optional)*: FastAPI + SQLite (deployed on Fly.io)

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Environment Variables

- `VITE_API_URL` — Backend API URL (default: https://app-aiqfabdf.fly.dev). The app works even when this is unreachable.
