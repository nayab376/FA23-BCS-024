require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const {
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
} = require("./db");

const app = express();
const port = Number(process.env.PORT || 5000);

app.use(cors());
app.use(express.json());
const jwtSecret = process.env.JWT_SECRET || "adflow-pro-dev-secret";

const getTokenFromHeader = (req) => {
  const raw = req.headers.authorization || "";
  if (!raw.startsWith("Bearer ")) return "";
  return raw.slice(7);
};

const requireAuth = async (req, res, next) => {
  const token = getTokenFromHeader(req);
  try {
    const payload = jwt.verify(token, jwtSecret);
    const user = await getUserById(payload.userId);
    if (!user) {
      res.status(401).json({ message: "Invalid session" });
      return;
    }
    req.user = user;
    next();
  } catch (_error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

const requireRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    res.status(403).json({ message: "Forbidden" });
    return;
  }
  next();
};

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "adflow-pro-api" });
});

app.get("/api/ads", async (req, res) => {
  try {
    const ads = await getAds({
      search: req.query.search || "",
      category: req.query.category || "all",
      sort: req.query.sort || "featured",
    });
    res.json({ ads });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch ads." });
  }
});

app.get("/api/ads/:id", async (req, res) => {
  try {
    const ad = await getAdById(Number(req.params.id));
    if (!ad) {
      res.status(404).json({ message: "Ad not found." });
      return;
    }
    res.json({ ad });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch ad." });
  }
});

app.get("/api/categories", async (_req, res) => {
  try {
    const categories = await getCategoryCounts();
    res.json({ categories });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories." });
  }
});

app.get("/api/stats", async (_req, res) => {
  try {
    const stats = await getDashboardStats();
    res.json({ stats });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stats." });
  }
});

app.post("/api/ads", async (req, res) => {
  const required = ["title", "category", "price", "location", "description", "phone"];
  const missing = required.filter((field) => !req.body[field]);
  if (missing.length) {
    res.status(400).json({ message: `Missing fields: ${missing.join(", ")}` });
    return;
  }

  try {
    const ad = await createAd(req.body);
    res.status(201).json({ ad });
  } catch (error) {
    res.status(500).json({ message: "Failed to create ad." });
  }
});

app.post("/api/auth/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    res.status(400).json({ message: "All fields are required." });
    return;
  }

  if (!["buyer", "seller"].includes(role)) {
    res.status(400).json({ message: "Role must be buyer or seller." });
    return;
  }

  try {
    const user = await createUser({ name, email, password, role });
    const token = jwt.sign({ userId: user.id, role: user.role }, jwtSecret, { expiresIn: "7d" });
    res.status(201).json({ token, user });
  } catch (error) {
    if (error.message.includes("exists")) {
      res.status(409).json({ message: "Email already exists." });
      return;
    }
    res.status(500).json({ message: "Failed to register user." });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Email and password required." });
    return;
  }
  try {
    const user = await loginUser({ email, password });
    if (!user) {
      res.status(401).json({ message: "Invalid email or password." });
      return;
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, jwtSecret, { expiresIn: "7d" });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Failed to login." });
  }
});

app.get("/api/auth/me", requireAuth, async (req, res) => {
  res.json({ user: req.user });
});

app.post("/api/auth/logout", requireAuth, (req, res) => {
  res.json({ ok: true });
});

app.get("/api/seller/ads", requireAuth, requireRole("seller"), async (req, res) => {
  try {
    const ads = await getAdsBySellerId(req.user.id);
    res.json({ ads });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch seller ads." });
  }
});

app.get("/api/favorites", requireAuth, async (req, res) => {
  try {
    const ads = await getFavoriteAds(req.user.id);
    res.json({ ads });
  } catch (_error) {
    res.status(500).json({ message: "Failed to fetch favorites." });
  }
});

app.post("/api/favorites/:adId", requireAuth, async (req, res) => {
  try {
    await addFavorite(req.user.id, Number(req.params.adId));
    res.json({ ok: true });
  } catch (_error) {
    res.status(500).json({ message: "Failed to add favorite." });
  }
});

app.delete("/api/favorites/:adId", requireAuth, async (req, res) => {
  try {
    await removeFavorite(req.user.id, Number(req.params.adId));
    res.json({ ok: true });
  } catch (_error) {
    res.status(500).json({ message: "Failed to remove favorite." });
  }
});

app.get("/api/chats", requireAuth, async (req, res) => {
  try {
    const chats = await getChatsForUser(req.user.id);
    res.json({ chats });
  } catch (_error) {
    res.status(500).json({ message: "Failed to fetch chats." });
  }
});

app.post("/api/chats/start", requireAuth, async (req, res) => {
  const { adId } = req.body;
  try {
    const ad = await getAdById(Number(adId));
    if (!ad) {
      res.status(404).json({ message: "Ad not found." });
      return;
    }
    if (!ad.sellerId) {
      res.status(400).json({ message: "This ad has no linked seller." });
      return;
    }
    if (ad.sellerId === req.user.id) {
      res.status(400).json({ message: "You cannot chat on your own ad." });
      return;
    }
    const buyerId = req.user.role === "buyer" ? req.user.id : ad.sellerId;
    const sellerId = ad.sellerId;
    const chat = await getOrCreateChat({ adId: ad.id, buyerId, sellerId });
    const messages = await getMessagesByChatId(chat.id);
    res.json({ chat, messages });
  } catch (_error) {
    res.status(500).json({ message: "Failed to start chat." });
  }
});

app.get("/api/chats/:chatId/messages", requireAuth, async (req, res) => {
  try {
    const messages = await getMessagesByChatId(Number(req.params.chatId));
    res.json({ messages });
  } catch (_error) {
    res.status(500).json({ message: "Failed to fetch messages." });
  }
});

app.post("/api/chats/:chatId/messages", requireAuth, async (req, res) => {
  if (!req.body.message) {
    res.status(400).json({ message: "Message is required." });
    return;
  }
  try {
    await addMessage({
      chatId: Number(req.params.chatId),
      senderId: req.user.id,
      message: req.body.message,
    });
    const messages = await getMessagesByChatId(Number(req.params.chatId));
    res.json({ messages });
  } catch (_error) {
    res.status(500).json({ message: "Failed to send message." });
  }
});

app.get("/api/admin/overview", requireAuth, requireRole("admin"), async (_req, res) => {
  try {
    const [users, ads] = await Promise.all([listUsers(), listAllAds()]);
    res.json({ users, ads });
  } catch (_error) {
    res.status(500).json({ message: "Failed to fetch admin overview." });
  }
});

app.delete("/api/admin/ads/:id", requireAuth, requireRole("admin"), async (req, res) => {
  try {
    await deleteAdById(Number(req.params.id));
    res.json({ ok: true });
  } catch (_error) {
    res.status(500).json({ message: "Failed to delete ad." });
  }
});

const start = async () => {
  try {
    await initDb();
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`AdFlow Pro API running on http://localhost:${port}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

start();
