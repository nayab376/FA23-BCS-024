import { useState, useEffect, useCallback, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories, { CATEGORY_ICONS } from './components/Categories';
import CategoryGrid from './components/CategoryGrid';
import AdCard from './components/AdCard';
import AdModal from './components/AdModal';
import PostAdModal from './components/PostAdModal';
import LoginModal from './components/LoginModal';
import Footer from './components/Footer';
import { ArrowDownAZ, ArrowUpAZ, Clock, Star, ArrowLeft, Trash2 } from 'lucide-react';
import { SEED_ADS, CATEGORY_NAMES, type Ad } from './data/seedProducts';
import { useAuth } from './context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const LOCAL_ADS_KEY = 'adflow.ads.local.v1';

function loadLocalAds(): Ad[] {
  try {
    const raw = localStorage.getItem(LOCAL_ADS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as Ad[];
    return [];
  } catch {
    return [];
  }
}

function saveLocalAds(ads: Ad[]) {
  localStorage.setItem(LOCAL_ADS_KEY, JSON.stringify(ads));
}

function App() {
  const { user, requireAuth, authPrompt, setAuthPrompt } = useAuth();

  const [remoteAds, setRemoteAds] = useState<Ad[]>([]);
  const [localAds, setLocalAds] = useState<Ad[]>(() => loadLocalAds());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'newest' | 'price_low' | 'price_high' | 'featured'>('newest');
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
  const [showPostAd, setShowPostAd] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    saveLocalAds(localAds);
  }, [localAds]);

  useEffect(() => {
    if (authPrompt && !user) {
      setShowLogin(true);
    }
  }, [authPrompt, user]);

  const fetchRemoteAds = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/ads`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data)) setRemoteAds(data as Ad[]);
    } catch (err) {
      // API is optional - we fall back to seed + local ads so the app always works.
      console.warn('Remote ads unavailable, using local data:', err);
      setRemoteAds([]);
    }
  }, []);

  useEffect(() => {
    fetchRemoteAds();
  }, [fetchRemoteAds]);

  // Combine seed + remote + user-posted. De-dupe by id (user + seed first, so
  // locally-posted ads show on top even if the API returns something similar).
  const allAds = useMemo<Ad[]>(() => {
    const seen = new Set<string>();
    const combined: Ad[] = [];
    for (const ad of [...localAds, ...SEED_ADS, ...remoteAds]) {
      const key = String(ad.id);
      if (seen.has(key)) continue;
      seen.add(key);
      combined.push(ad);
    }
    return combined;
  }, [localAds, remoteAds]);

  const visibleAds = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let list = allAds.filter((ad) => {
      if (selectedCategory !== 'All' && ad.category !== selectedCategory) return false;
      if (!q) return true;
      return (
        ad.title.toLowerCase().includes(q) ||
        ad.description.toLowerCase().includes(q) ||
        ad.location.toLowerCase().includes(q) ||
        ad.category.toLowerCase().includes(q)
      );
    });

    list = [...list].sort((a, b) => {
      switch (sortBy) {
        case 'price_low':
          return a.price - b.price;
        case 'price_high':
          return b.price - a.price;
        case 'featured':
          return Number(b.featured) - Number(a.featured);
        case 'newest':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });
    return list;
  }, [allAds, searchQuery, selectedCategory, sortBy]);

  const categoryCounts = useMemo<Record<string, number>>(() => {
    const counts: Record<string, number> = {};
    for (const ad of allAds) counts[ad.category] = (counts[ad.category] ?? 0) + 1;
    return counts;
  }, [allAds]);

  const categories = useMemo(
    () => CATEGORY_NAMES.map((name) => ({ name, count: categoryCounts[name] ?? 0 })),
    [categoryCounts],
  );

  const stats = useMemo(() => {
    const uniqueLocations = new Set(allAds.map((a) => a.location));
    return {
      total_ads: allAds.length,
      total_categories: CATEGORY_NAMES.length,
      total_locations: uniqueLocations.size,
      featured_ads: allAds.filter((a) => a.featured).length,
    };
  }, [allAds]);

  const canDeleteAd = (ad: Ad) => {
    if (!user) return false;
    if (user.role === 'admin' || user.role === 'super') return true;
    return ad.seller_email === user.email;
  };

  const handleOpenPostAd = () => {
    if (!requireAuth('post a new ad')) return;
    setShowPostAd(true);
  };

  const handlePostAd = async (ad: {
    title: string;
    description: string;
    price: number;
    category: string;
    location: string;
    image_url: string;
    contact: string;
  }) => {
    if (!user) {
      requireAuth('post a new ad');
      return;
    }

    const newAd: Ad = {
      id: `local-${Date.now()}`,
      ...ad,
      image_url: ad.image_url || null,
      contact: ad.contact || null,
      created_at: new Date().toISOString(),
      featured: false,
      seller_email: user.email,
      seller_role: user.role,
    };

    // Optimistically add locally so it shows immediately and survives reloads.
    setLocalAds((prev) => [newAd, ...prev]);
    setShowPostAd(false);
    setSelectedCategory(ad.category);

    // Also try to persist to remote API; don't block UX if it's down.
    try {
      const res = await fetch(`${API_URL}/api/ads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ad),
      });
      if (res.ok) fetchRemoteAds();
    } catch (err) {
      console.warn('Failed to post ad to remote API, kept locally:', err);
    }
  };

  const handleDeleteAd = (ad: Ad) => {
    if (!canDeleteAd(ad)) return;
    setLocalAds((prev) => prev.filter((a) => String(a.id) !== String(ad.id)));
    setSelectedAd(null);
  };

  const handleLogoClick = () => {
    setSelectedCategory('All');
    setSearchQuery('');
  };

  const sortOptions: { value: typeof sortBy; label: string; icon: typeof Clock }[] = [
    { value: 'newest', label: 'Newest', icon: Clock },
    { value: 'price_low', label: 'Price Low', icon: ArrowDownAZ },
    { value: 'price_high', label: 'Price High', icon: ArrowUpAZ },
    { value: 'featured', label: 'Featured', icon: Star },
  ];

  const showingCategoryView = selectedCategory !== 'All';
  const HeaderIcon = showingCategoryView ? CATEGORY_ICONS[selectedCategory] : null;

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onPostAdClick={handleOpenPostAd}
        onLoginClick={() => setShowLogin(true)}
        onLogoClick={handleLogoClick}
      />

      {!showingCategoryView && (
        <Hero
          stats={stats}
          onLoginClick={() => setShowLogin(true)}
          onPostAdClick={handleOpenPostAd}
        />
      )}

      {!showingCategoryView && (
        <CategoryGrid counts={categoryCounts} onSelect={setSelectedCategory} />
      )}

      <main className="flex-1 max-w-7xl mx-auto px-4 py-6 w-full">
        {showingCategoryView && (
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedCategory('All')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-200 rounded-lg text-xs transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                All Categories
              </button>
              <div className="flex items-center gap-2">
                {HeaderIcon && (
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                    <HeaderIcon className="w-4.5 h-4.5 text-emerald-400" />
                  </div>
                )}
                <div>
                  <h2 className="text-lg font-bold text-white">{selectedCategory}</h2>
                  <p className="text-xs text-gray-500">
                    {categoryCounts[selectedCategory] ?? 0} related products
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <Categories
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          <div className="flex gap-1 bg-gray-800 rounded-lg p-1 shrink-0">
            {sortOptions.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setSortBy(value)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  sortBy === value
                    ? 'bg-emerald-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-3 h-3" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {visibleAds.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No ads found.</p>
            <p className="text-gray-600 text-sm mt-1">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {visibleAds.map((ad) => (
              <div key={ad.id} className="relative">
                <AdCard ad={ad} onClick={setSelectedAd} />
                {canDeleteAd(ad) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAd(ad);
                    }}
                    title="Delete ad"
                    className="absolute bottom-2 right-2 p-1.5 bg-red-500/90 hover:bg-red-600 text-white rounded-md text-xs"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />

      {selectedAd && <AdModal ad={selectedAd} onClose={() => setSelectedAd(null)} />}
      {showPostAd && (
        <PostAdModal
          onClose={() => setShowPostAd(false)}
          onSubmit={handlePostAd}
          defaultCategory={selectedCategory !== 'All' ? selectedCategory : undefined}
        />
      )}
      {showLogin && (
        <LoginModal
          onClose={() => {
            setShowLogin(false);
            setAuthPrompt(null);
          }}
          message={authPrompt ? `Please login to ${authPrompt}.` : null}
        />
      )}
    </div>
  );
}

export default App;
