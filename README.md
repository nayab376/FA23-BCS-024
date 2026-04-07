# AdFlow Pro

A premium classifieds marketplace platform built with React + FastAPI. Browse, search, and post ads across categories like Electronics, Vehicles, Property, Furniture, and Services.

**Built by Nayab Zaman**

## Live Demo

- **Frontend**: [AdFlow Pro App](https://first-session-app-wlh5y1es.devinapps.com)
- **Backend API**: [API](https://app-aiqfabdf.fly.dev)

## Features

- Dark-themed modern UI
- Search ads by title, description, or location
- Filter by category (Electronics, Vehicles, Property, Furniture, Services)
- Sort by newest, price low/high, or featured
- Post new ads
- 15 pre-loaded Pakistani marketplace ads
- Responsive design

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Lucide Icons
- **Backend**: FastAPI, Python, SQLite (aiosqlite)
- **Deployment**: Vercel (frontend), Fly.io (backend)

## Getting Started

### Backend

```bash
cd adflow-backend
poetry install
poetry run fastapi dev app/main.py
```

### Frontend

```bash
cd adflow-frontend
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:5173 in your browser.

## API Endpoints

- `GET /api/ads` — List ads (supports `search`, `category`, `sort` params)
- `POST /api/ads` — Create a new ad
- `GET /api/categories` — List categories with counts
- `GET /api/stats` — Platform statistics
