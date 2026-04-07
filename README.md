# AdFlow Pro

Full-stack classifieds platform with modern frontend, Express backend, and SQLite database.

## Features

- Live listings from database (no static mock flow)
- Search, category filter, and sorting via backend API
- Create new ads from UI and store directly in DB
- Dynamic category counts and marketplace stats
- Responsive premium dark UI

## Tech Stack

- React 18 (frontend)
- Express + Node.js (backend API)
- SQLite (local database)
- Lucide Icons + custom CSS design system

## Run Locally

```bash
npm install
npm start
```

`npm start` runs both frontend and backend together.

## API Endpoints

- `GET /api/health`
- `GET /api/ads?search=&category=&sort=`
- `POST /api/ads`
- `GET /api/categories`
- `GET /api/stats`

## Database

SQLite database file is auto-created at:

- `server/data/adflowpro.db`

On first run, starter ads are seeded automatically.
