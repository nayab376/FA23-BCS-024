const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const { seedAds } = require("./seedAds");

const dataDir = path.join(__dirname, "data");
const dbPath = path.join(dataDir, "adflowpro.db");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath);

const run = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this);
    });
  });

const all = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });

const get = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(row);
    });
  });

const mapRowToAd = (row) => ({
  id: row.id,
  title: row.title,
  category: row.category,
  price: row.price,
  location: row.location,
  image: row.image,
  featured: Boolean(row.featured),
  verified: Boolean(row.verified),
  postedAt: row.posted_at,
  views: row.views,
  seller: {
    name: row.seller_name,
    rating: row.seller_rating,
    deals: row.seller_deals,
  },
  condition: row.condition,
  description: row.description,
  phone: row.phone,
  sellerId: row.seller_id || null,
});

const mapRowToUser = (row) => ({
  id: row.id,
  name: row.name,
  email: row.email,
  role: row.role,
});

const createTables = async () => {
  await run(`
    CREATE TABLE IF NOT EXISTS ads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      price INTEGER NOT NULL,
      location TEXT NOT NULL,
      image TEXT NOT NULL,
      featured INTEGER DEFAULT 0,
      verified INTEGER DEFAULT 0,
      posted_at TEXT NOT NULL,
      views INTEGER DEFAULT 0,
      seller_name TEXT NOT NULL,
      seller_rating REAL DEFAULT 4.5,
      seller_deals INTEGER DEFAULT 0,
      condition TEXT DEFAULT 'N/A',
      description TEXT NOT NULL,
      phone TEXT,
      seller_id INTEGER
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('buyer', 'seller', 'admin')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      ad_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, ad_id)
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS chats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ad_id INTEGER NOT NULL,
      buyer_id INTEGER NOT NULL,
      seller_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(ad_id, buyer_id, seller_id)
    )
  `);

  await run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chat_id INTEGER NOT NULL,
      sender_id INTEGER NOT NULL,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

const ensureColumns = async () => {
  const rows = await all("PRAGMA table_info(ads)");
  const hasSellerId = rows.some((row) => row.name === "seller_id");
  if (!hasSellerId) {
    await run("ALTER TABLE ads ADD COLUMN seller_id INTEGER");
  }
};

const seedIfEmpty = async () => {
  const countRow = await get("SELECT COUNT(*) AS count FROM ads");
  if (countRow.count > 0) return;

  const insertSql = `
    INSERT INTO ads (
      title, category, price, location, image, featured, verified, posted_at, views,
      seller_name, seller_rating, seller_deals, condition, description, phone
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  for (const ad of seedAds) {
    await run(insertSql, [
      ad.title,
      ad.category,
      ad.price,
      ad.location,
      ad.image,
      ad.featured,
      ad.verified,
      ad.posted_at,
      ad.views,
      ad.seller_name,
      ad.seller_rating,
      ad.seller_deals,
      ad.condition,
      ad.description,
      "+92-300-0000000",
    ]);
  }

  const admin = await get("SELECT id FROM users WHERE email = ?", ["admin@adflowpro.pk"]);
  if (!admin) {
    const hash = await bcrypt.hash("admin123", 10);
    await run(
      "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
      ["System Admin", "admin@adflowpro.pk", hash, "admin"]
    );
  }
};

const getAds = async ({ search = "", category = "all", sort = "featured" }) => {
  const where = [];
  const params = [];

  if (category && category !== "all") {
    where.push("category = ?");
    params.push(category);
  }

  if (search) {
    where.push("(LOWER(title) LIKE ? OR LOWER(location) LIKE ? OR LOWER(category) LIKE ?)");
    const term = `%${search.toLowerCase()}%`;
    params.push(term, term, term);
  }

  let orderBy = "featured DESC, id DESC";
  if (sort === "price-low") orderBy = "price ASC";
  if (sort === "price-high") orderBy = "price DESC";
  if (sort === "newest") orderBy = "id DESC";
  if (sort === "views") orderBy = "views DESC";

  const sql = `
    SELECT * FROM ads
    ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
    ORDER BY ${orderBy}
  `;
  const rows = await all(sql, params);
  return rows.map(mapRowToAd);
};

const createAd = async (payload) => {
  const insertSql = `
    INSERT INTO ads (
      title, category, price, location, image, featured, verified, posted_at, views,
      seller_name, seller_rating, seller_deals, condition, description, phone, seller_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const result = await run(insertSql, [
    payload.title,
    payload.category,
    Number(payload.price),
    payload.location,
    payload.image || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
    payload.featured ? 1 : 0,
    payload.verified ? 1 : 0,
    "Just now",
    0,
    payload.sellerName || "AdFlow Seller",
    4.5,
    0,
    payload.condition || "N/A",
    payload.description,
    payload.phone || "",
    payload.sellerId || null,
  ]);

  const row = await get("SELECT * FROM ads WHERE id = ?", [result.lastID]);
  return mapRowToAd(row);
};

const getAdById = async (id) => {
  const row = await get("SELECT * FROM ads WHERE id = ?", [id]);
  if (!row) return null;
  return mapRowToAd(row);
};

const getAdsBySellerId = async (sellerId) => {
  const rows = await all("SELECT * FROM ads WHERE seller_id = ? ORDER BY id DESC", [sellerId]);
  return rows.map(mapRowToAd);
};

const createUser = async ({ name, email, password, role }) => {
  const existing = await get("SELECT * FROM users WHERE email = ?", [email.toLowerCase()]);
  if (existing) {
    throw new Error("Email already exists");
  }

  const hash = await bcrypt.hash(password, 10);
  const result = await run(
    "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
    [name, email.toLowerCase(), hash, role]
  );
  const row = await get("SELECT id, name, email, role FROM users WHERE id = ?", [result.lastID]);
  return mapRowToUser(row);
};

const loginUser = async ({ email, password }) => {
  const row = await get("SELECT * FROM users WHERE email = ?", [email.toLowerCase()]);
  if (!row) return null;
  const isValid = await bcrypt.compare(password, row.password_hash);
  if (!isValid) return null;
  return mapRowToUser(row);
};

const getUserById = async (id) => {
  const row = await get("SELECT id, name, email, role FROM users WHERE id = ?", [id]);
  if (!row) return null;
  return mapRowToUser(row);
};

const listUsers = async () => {
  const rows = await all("SELECT id, name, email, role FROM users ORDER BY id DESC");
  return rows.map(mapRowToUser);
};

const listAllAds = async () => {
  const rows = await all("SELECT * FROM ads ORDER BY id DESC");
  return rows.map(mapRowToAd);
};

const deleteAdById = async (id) => {
  await run("DELETE FROM ads WHERE id = ?", [id]);
};

const addFavorite = async (userId, adId) => {
  await run("INSERT OR IGNORE INTO favorites (user_id, ad_id) VALUES (?, ?)", [userId, adId]);
};

const removeFavorite = async (userId, adId) => {
  await run("DELETE FROM favorites WHERE user_id = ? AND ad_id = ?", [userId, adId]);
};

const getFavoriteAds = async (userId) => {
  const rows = await all(
    `SELECT a.* FROM ads a
     INNER JOIN favorites f ON f.ad_id = a.id
     WHERE f.user_id = ?
     ORDER BY f.id DESC`,
    [userId]
  );
  return rows.map(mapRowToAd);
};

const getOrCreateChat = async ({ adId, buyerId, sellerId }) => {
  await run(
    "INSERT OR IGNORE INTO chats (ad_id, buyer_id, seller_id) VALUES (?, ?, ?)",
    [adId, buyerId, sellerId]
  );
  return get(
    "SELECT * FROM chats WHERE ad_id = ? AND buyer_id = ? AND seller_id = ?",
    [adId, buyerId, sellerId]
  );
};

const getChatsForUser = async (userId) => {
  return all(
    `SELECT c.*, a.title AS ad_title, a.image AS ad_image,
            bu.name AS buyer_name, su.name AS seller_name
     FROM chats c
     INNER JOIN ads a ON a.id = c.ad_id
     INNER JOIN users bu ON bu.id = c.buyer_id
     INNER JOIN users su ON su.id = c.seller_id
     WHERE c.buyer_id = ? OR c.seller_id = ?
     ORDER BY c.id DESC`,
    [userId, userId]
  );
};

const getMessagesByChatId = async (chatId) => {
  return all(
    "SELECT id, chat_id, sender_id, message, created_at FROM messages WHERE chat_id = ? ORDER BY id ASC",
    [chatId]
  );
};

const addMessage = async ({ chatId, senderId, message }) => {
  await run("INSERT INTO messages (chat_id, sender_id, message) VALUES (?, ?, ?)", [
    chatId,
    senderId,
    message,
  ]);
};

const getCategoryCounts = async () => {
  const rows = await all(
    "SELECT category, COUNT(*) AS count FROM ads GROUP BY category ORDER BY count DESC"
  );
  return rows;
};

const getDashboardStats = async () => {
  const totalRow = await get("SELECT COUNT(*) AS total FROM ads");
  const verifiedRow = await get("SELECT COUNT(*) AS total FROM ads WHERE verified = 1");
  const citiesRow = await get("SELECT COUNT(DISTINCT location) AS total FROM ads");
  const viewsRow = await get("SELECT COALESCE(SUM(views), 0) AS total FROM ads");

  return [
    { label: "Active Listings", value: `${totalRow.total}+` },
    { label: "Verified Sellers", value: `${verifiedRow.total}+` },
    { label: "Cities Covered", value: `${citiesRow.total}+` },
    { label: "Total Views", value: `${Math.max(1, Math.round(viewsRow.total / 1000))}K+` },
  ];
};

const initDb = async () => {
  await createTables();
  await ensureColumns();
  await seedIfEmpty();
};

module.exports = {
  initDb,
  getAds,
  createAd,
  getCategoryCounts,
  getDashboardStats,
  getAdById,
  getAdsBySellerId,
  createUser,
  loginUser,
  getUserById,
  listUsers,
  listAllAds,
  deleteAdById,
  addFavorite,
  removeFavorite,
  getFavoriteAds,
  getOrCreateChat,
  getChatsForUser,
  getMessagesByChatId,
  addMessage,
};
