import {
  ads as fallbackAds,
  categories as fallbackCategories,
  stats as fallbackStats,
} from "./data/ads";

const jsonHeaders = { "Content-Type": "application/json" };

const request = async (url, options = {}) => {
  let response;
  try {
    response = await fetch(url, options);
  } catch (_error) {
    throw new Error("NETWORK_OR_BACKEND_DOWN");
  }

  const contentType = response.headers.get("content-type") || "";
  const rawText = await response.text();
  let data = null;

  if (contentType.includes("application/json")) {
    try {
      data = JSON.parse(rawText);
    } catch (_error) {
      throw new Error("Server returned invalid JSON.");
    }
  } else {
    throw new Error("NON_JSON_RESPONSE");
  }

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

const getFallbackAds = ({ search = "", category = "all", sort = "featured" }) => {
  let items = [...fallbackAds];

  if (category !== "all") {
    items = items.filter((ad) => ad.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    items = items.filter(
      (ad) =>
        ad.title.toLowerCase().includes(q) ||
        ad.location.toLowerCase().includes(q) ||
        ad.category.toLowerCase().includes(q)
    );
  }

  if (sort === "featured") items.sort((a, b) => Number(b.featured) - Number(a.featured));
  if (sort === "price-low") items.sort((a, b) => a.price - b.price);
  if (sort === "price-high") items.sort((a, b) => b.price - a.price);
  if (sort === "newest") items.sort((a, b) => b.id - a.id);
  if (sort === "views") items.sort((a, b) => b.views - a.views);

  return items;
};

export const fetchAds = ({ search = "", category = "all", sort = "featured" }) => {
  const query = new URLSearchParams({
    search,
    category,
    sort,
  });
  return request(`/api/ads?${query.toString()}`).catch((error) => {
    if (error.message === "NON_JSON_RESPONSE" || error.message === "NETWORK_OR_BACKEND_DOWN") {
      return { ads: getFallbackAds({ search, category, sort }), fallback: true };
    }
    throw error;
  });
};

export const fetchCategories = () =>
  request("/api/categories").catch((error) => {
    if (error.message === "NON_JSON_RESPONSE" || error.message === "NETWORK_OR_BACKEND_DOWN") {
      return {
        categories: fallbackCategories.map((item) => ({ category: item.id, count: item.count })),
        fallback: true,
      };
    }
    throw error;
  });

export const fetchStats = () =>
  request("/api/stats").catch((error) => {
    if (error.message === "NON_JSON_RESPONSE" || error.message === "NETWORK_OR_BACKEND_DOWN") {
      return { stats: fallbackStats, fallback: true };
    }
    throw error;
  });

export const createAd = (payload) =>
  request("/api/ads", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(payload),
  });

const authHeaders = (token) => ({
  ...jsonHeaders,
  Authorization: `Bearer ${token}`,
});

export const fetchAdById = (id) =>
  request(`/api/ads/${id}`).catch((error) => {
    if (error.message === "NON_JSON_RESPONSE" || error.message === "NETWORK_OR_BACKEND_DOWN") {
      const ad = fallbackAds.find((item) => String(item.id) === String(id));
      if (!ad) throw new Error("Ad not found.");
      return { ad, fallback: true };
    }
    throw error;
  });

export const registerUser = (payload) =>
  request("/api/auth/register", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(payload),
  });

export const loginUser = (payload) =>
  request("/api/auth/login", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(payload),
  });

export const fetchCurrentUser = (token) =>
  request("/api/auth/me", {
    headers: authHeaders(token),
  });

export const logoutUser = (token) =>
  request("/api/auth/logout", {
    method: "POST",
    headers: authHeaders(token),
  });

export const fetchSellerAds = (token) =>
  request("/api/seller/ads", {
    headers: authHeaders(token),
  });

export const createSellerAd = (token, payload) =>
  request("/api/ads", {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify(payload),
  });

export const fetchFavorites = (token) =>
  request("/api/favorites", {
    headers: authHeaders(token),
  });

export const addFavorite = (token, adId) =>
  request(`/api/favorites/${adId}`, {
    method: "POST",
    headers: authHeaders(token),
  });

export const removeFavorite = (token, adId) =>
  request(`/api/favorites/${adId}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });

export const fetchChats = (token) =>
  request("/api/chats", {
    headers: authHeaders(token),
  });

export const startChat = (token, adId) =>
  request("/api/chats/start", {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({ adId }),
  });

export const fetchChatMessages = (token, chatId) =>
  request(`/api/chats/${chatId}/messages`, {
    headers: authHeaders(token),
  });

export const sendChatMessage = (token, chatId, message) =>
  request(`/api/chats/${chatId}/messages`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({ message }),
  });

export const fetchAdminOverview = (token) =>
  request("/api/admin/overview", {
    headers: authHeaders(token),
  });

export const deleteAdminAd = (token, adId) =>
  request(`/api/admin/ads/${adId}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
