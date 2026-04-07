const jsonHeaders = { "Content-Type": "application/json" };

const request = async (url, options = {}) => {
  const response = await fetch(url, options);
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
    // CRA/dev-server can return HTML when backend is down or route is wrong.
    throw new Error(
      "API response is not JSON. Ensure backend is running on port 5000 and API route is correct."
    );
  }

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

export const fetchAds = ({ search = "", category = "all", sort = "featured" }) => {
  const query = new URLSearchParams({
    search,
    category,
    sort,
  });
  return request(`/api/ads?${query.toString()}`);
};

export const fetchCategories = () => request("/api/categories");

export const fetchStats = () => request("/api/stats");

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

export const fetchAdById = (id) => request(`/api/ads/${id}`);

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
