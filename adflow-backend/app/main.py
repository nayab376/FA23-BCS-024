from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import aiosqlite
import os

app = FastAPI()

# Disable CORS. Do not remove this for full-stack development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

DB_PATH = "/data/app.db" if os.path.exists("/data") else "app.db"


class AdCreate(BaseModel):
    title: str
    description: str
    price: float
    category: str
    location: str
    image_url: Optional[str] = None
    contact: Optional[str] = None


async def get_db():
    db = await aiosqlite.connect(DB_PATH)
    db.row_factory = aiosqlite.Row
    return db


async def init_db():
    db = await get_db()
    await db.execute("""
        CREATE TABLE IF NOT EXISTS ads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            price REAL NOT NULL,
            category TEXT NOT NULL,
            location TEXT NOT NULL,
            image_url TEXT,
            contact TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            featured INTEGER DEFAULT 0
        )
    """)
    await db.commit()
    cursor = await db.execute("SELECT COUNT(*) FROM ads")
    row = await cursor.fetchone()
    if row[0] == 0:
        await seed_ads(db)
    await db.close()


async def seed_ads(db):
    seed_data = [
        ("iPhone 15 Pro Max - Like New", "Barely used iPhone 15 Pro Max, 256GB, Natural Titanium. Comes with original box and accessories. Battery health 98%.", 185000, "Electronics", "Lahore", "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400", "0300-1234567", 1),
        ("Toyota Corolla 2022 - Automatic", "Well maintained Toyota Corolla GLI 2022. Automatic transmission, white color. Only 25,000 km driven.", 5200000, "Vehicles", "Islamabad", "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=400", "0321-9876543", 1),
        ("3 Bedroom Apartment - DHA Phase 5", "Spacious 3 bedroom apartment in DHA Phase 5. Fully furnished with modern kitchen. 1800 sq ft.", 95000, "Property", "Karachi", "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400", "0333-4567890", 1),
        ("MacBook Air M2 - 2023", "MacBook Air M2 chip, 8GB RAM, 256GB SSD. Space Gray. Perfect condition with charger.", 220000, "Electronics", "Lahore", "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400", "0312-3456789", 0),
        ("Honda Civic 2023 - Oriel", "Honda Civic Oriel 2023 model. Black color, sunroof, leather seats. 15,000 km.", 7500000, "Vehicles", "Rawalpindi", "https://images.unsplash.com/photo-1606611013016-969c19ba27ae?w=400", "0345-6789012", 1),
        ("Samsung Galaxy S24 Ultra", "Brand new Samsung Galaxy S24 Ultra, 512GB, Titanium Gray. Sealed box with warranty.", 280000, "Electronics", "Faisalabad", "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400", "0300-5678901", 0),
        ("Office Desk + Chair Combo", "Executive office desk (5x3 ft) with ergonomic chair. Barely used, excellent condition.", 35000, "Furniture", "Lahore", "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400", "0321-2345678", 0),
        ("Yamaha YBR 125G - 2024", "Brand new Yamaha YBR 125G, red color. Only 2,000 km driven. First owner.", 350000, "Vehicles", "Multan", "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400", "0333-8901234", 0),
        ("Gaming PC - RTX 4070 Setup", "Custom built gaming PC. RTX 4070, i7 13th Gen, 32GB RAM, 1TB SSD. Includes 27 inch monitor.", 450000, "Electronics", "Islamabad", "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400", "0345-1234567", 1),
        ("King Size Bed with Mattress", "Solid wood king size bed with premium foam mattress. Modern design, walnut finish.", 85000, "Furniture", "Karachi", "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400", "0312-8901234", 0),
        ("Plot for Sale - Bahria Town", "10 Marla residential plot in Bahria Town Phase 8. Corner plot, developed area.", 8500000, "Property", "Rawalpindi", "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400", "0300-9012345", 1),
        ("Freelance Web Development Services", "Professional web development services. React, Node.js, Python. Portfolio available.", 50000, "Services", "Remote", "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400", "0321-0123456", 0),
        ("Sofa Set - 7 Seater", "Premium 7 seater sofa set. Velvet upholstery, modern L-shape design. 6 months old.", 120000, "Furniture", "Lahore", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400", "0333-5678901", 0),
        ("Canon EOS R6 Mark II", "Canon EOS R6 Mark II mirrorless camera with RF 24-105mm lens. Shutter count under 5000.", 550000, "Electronics", "Islamabad", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400", "0345-2345678", 0),
        ("House for Rent - Gulberg", "5 bedroom house for rent in Gulberg III. Double storey, 1 kanal. Ideal for family.", 250000, "Property", "Lahore", "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400", "0312-5678901", 0),
    ]
    await db.executemany(
        "INSERT INTO ads (title, description, price, category, location, image_url, contact, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        seed_data
    )
    await db.commit()


@app.on_event("startup")
async def startup():
    await init_db()


@app.get("/healthz")
async def healthz():
    return {"status": "ok"}


@app.get("/api/health")
async def health():
    return {"status": "ok"}


@app.get("/api/ads")
async def get_ads(
    search: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    sort: Optional[str] = Query("newest"),
):
    db = await get_db()
    query = "SELECT * FROM ads WHERE 1=1"
    params = []
    if search:
        query += " AND (title LIKE ? OR description LIKE ? OR location LIKE ?)"
        params.extend([f"%{search}%", f"%{search}%", f"%{search}%"])
    if category and category != "All":
        query += " AND category = ?"
        params.append(category)
    if sort == "newest":
        query += " ORDER BY created_at DESC"
    elif sort == "price_low":
        query += " ORDER BY price ASC"
    elif sort == "price_high":
        query += " ORDER BY price DESC"
    elif sort == "featured":
        query += " ORDER BY featured DESC, created_at DESC"
    cursor = await db.execute(query, params)
    rows = await cursor.fetchall()
    await db.close()
    ads = []
    for row in rows:
        ads.append({
            "id": row[0], "title": row[1], "description": row[2],
            "price": row[3], "category": row[4], "location": row[5],
            "image_url": row[6], "contact": row[7], "created_at": row[8],
            "featured": bool(row[9]),
        })
    return ads


@app.post("/api/ads")
async def create_ad(ad: AdCreate):
    db = await get_db()
    cursor = await db.execute(
        "INSERT INTO ads (title, description, price, category, location, image_url, contact) VALUES (?, ?, ?, ?, ?, ?, ?)",
        (ad.title, ad.description, ad.price, ad.category, ad.location, ad.image_url, ad.contact)
    )
    await db.commit()
    ad_id = cursor.lastrowid
    await db.close()
    return {"id": ad_id, "message": "Ad created successfully"}


@app.get("/api/categories")
async def get_categories():
    db = await get_db()
    cursor = await db.execute("SELECT category, COUNT(*) as count FROM ads GROUP BY category ORDER BY count DESC")
    rows = await cursor.fetchall()
    await db.close()
    return [{"name": row[0], "count": row[1]} for row in rows]


@app.get("/api/stats")
async def get_stats():
    db = await get_db()
    cursor = await db.execute("SELECT COUNT(*) FROM ads")
    total_ads = (await cursor.fetchone())[0]
    cursor = await db.execute("SELECT COUNT(DISTINCT category) FROM ads")
    total_categories = (await cursor.fetchone())[0]
    cursor = await db.execute("SELECT COUNT(DISTINCT location) FROM ads")
    total_locations = (await cursor.fetchone())[0]
    cursor = await db.execute("SELECT COUNT(*) FROM ads WHERE featured = 1")
    featured_ads = (await cursor.fetchone())[0]
    await db.close()
    return {
        "total_ads": total_ads, "total_categories": total_categories,
        "total_locations": total_locations, "featured_ads": featured_ads,
    }
