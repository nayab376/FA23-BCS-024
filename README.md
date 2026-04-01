
# AdFlow Pro 🚀
### Sponsored Listing Marketplace with Moderation, Scheduling, Payment Verification, Analytics, and External Media Normalization

> Advanced Mid-Term Project — MERN / Next.js + Vercel + Supabase



## 📋 Project Overview

AdFlow Pro is a production-style moderated ads marketplace where:
- **Clients** submit paid listings
- **Moderators** review content
- **Admins** verify payments
- **Only approved ads** go live for a limited package-based duration

---

## 👥 Team Members

| Name | Role |
|------|------|
| Nayab | Full Stack |
| Sana | Full Stack |
| Noor Fatima | Full Stack |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js + Tailwind CSS |
| Backend | Node.js + Express |
| Database | Supabase (PostgreSQL) |
| Auth | JWT / Supabase Auth |
| Deployment | Vercel |
| Validation | Zod |

---

## 🔐 User Roles

| Role | Responsibility |
|------|----------------|
| Client | Submit and manage own ads |
| Moderator | Review content quality |
| Admin | Verify payments and publish ads |
| Super Admin | Full system control |

---

## 📦 Ad Lifecycle

Draft → Submitted → Under Review → Payment Pending → Payment Submitted → Payment Verified → Scheduled → Published → Expired

---

## 📁 Folder Structure

adflow-pro/ ├── client/
│   └── src/ │       ├── app/
│       ├── components/
│       ├── features/
│       ├── hooks/
│       └── utils/
│ ├── server/
│   └── src/ │       ├── routes/
│       ├── controllers/
│       ├── services/
│       ├── middlewares/
│       ├── validators/
│       ├── cron/
│       └── db/
│ └── shared/
├── constants/
├── schemas/
└── types/

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn
- Supabase account
- Vercel account (for deployment)

### Installation


# 1. Clone the repository
git clone https://github.com/FA23-BCS-024/adflow-pro.git
cd adflow-pro

# 2. Install server dependencies
cd server
npm install

# 3. Install client dependencies
cd ../client
npm install

Environment Variables

Server — create server/.env:

PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
JWT_SECRET=your_jwt_secret

Client — create client/.env.local:

NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

Run Locally

# Run backend
cd server
npm run dev

# Run frontend (new terminal)
cd client
npm run dev




🗄️ Database Schema

Core tables: users, seller_profiles, packages, categories, cities, ads, ad_media, payments, notifications, audit_logs, ad_status_history, learning_questions, system_health_logs

> Full SQL schema: see server/src/db/schema.sql





📡 Key API Endpoints

Method	Endpoint	Access

POST	/api/auth/register	Public
POST	/api/auth/login	Public
GET	/api/ads	Public
POST	/api/client/ads	Client
PATCH	/api/moderator/ads/:id/review	Moderator
PATCH	/api/admin/payments/:id/verify	Admin
GET	/api/admin/analytics/summary	Admin




⏰ Scheduled Jobs

Every hour — Publish scheduled ads

Daily — Expire outdated ads

48h before expiry — Send expiring-soon notifications

Periodic — DB heartbeat logs





📊 Analytics Dashboard

Total / Active / Pending / Expired ads

Revenue by package

Moderation approval rate

Ads by category and city

System health status




📅 Milestone Plan

Week	Goal

1	Planning, ERD, folder structure, README
2	Auth, RBAC, dashboards
3	Ads workflow, packages, payments, analytics, deployment



📄 License

This project is built for academic purposes — Advanced MERN Stack Course Mid-Term.



