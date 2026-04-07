import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid3X3, List, ChevronDown } from 'lucide-react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import AdCard from '../components/AdCard';
import PostAdModal from '../components/PostAdModal';
import Footer from '../components/Footer';
import { createAd, fetchAds, fetchCategories, fetchStats } from '../api';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [ads, setAds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showPostAd, setShowPostAd] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const listingsRef = useRef(null);

  const loadMeta = useCallback(async () => {
    const [categoryRes, statsRes] = await Promise.all([fetchCategories(), fetchStats()]);
    const normalizedCategories = categoryRes.categories.map((item) => ({
      id: item.category,
      label: item.category.charAt(0).toUpperCase() + item.category.slice(1),
      icon: '📦',
      count: item.count,
    }));
    setCategories(normalizedCategories);
    setStats(statsRes.stats);
  }, []);

  const loadAds = useCallback(async () => {
    const { ads: responseAds } = await fetchAds({
      search: searchQuery,
      category: activeCategory,
      sort: sortBy,
    });
    setAds(responseAds);
  }, [searchQuery, activeCategory, sortBy]);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError('');
        await Promise.all([loadMeta(), loadAds()]);
      } catch (_err) {
        setError('Could not connect with AdFlow Pro backend. Please start server.');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [loadAds, loadMeta]);

  useEffect(() => {
    loadAds().catch(() => setError('Failed to refresh listings.'));
  }, [loadAds]);

  const handleCreateAd = async (payload) => {
    const sellerPayload = {
      ...payload,
      sellerId: user?.role === 'seller' ? user.id : null,
    };
    await createAd(sellerPayload);
    await Promise.all([loadAds(), loadMeta()]);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onPostAd={() => setShowPostAd(true)} />
      <Hero
        onExplore={() => listingsRef.current?.scrollIntoView({ behavior: 'smooth' })}
        onPostAd={() => (isAuthenticated ? setShowPostAd(true) : navigate('/login'))}
        stats={stats}
      />
      <Categories activeCategory={activeCategory} setActiveCategory={setActiveCategory} categories={categories} />

      <main ref={listingsRef} style={{ flex: 1, padding: '40px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22 }}>
              {ads.length} <span style={{ color: 'var(--text3)', fontWeight: 500 }}>listings found</span>
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ position: 'relative' }}>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  style={{ padding: '8px 36px 8px 14px', borderRadius: 10, background: 'var(--bg3)', border: '1px solid var(--border2)', color: 'var(--text)', fontSize: 13, cursor: 'pointer', appearance: 'none' }}
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                  <option value="views">Most Viewed</option>
                </select>
                <ChevronDown size={14} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text3)' }} />
              </div>
              <div style={{ display: 'flex', gap: 4, background: 'var(--bg3)', borderRadius: 10, padding: 4, border: '1px solid var(--border)' }}>
                {[['grid', Grid3X3], ['list', List]].map(([mode, Icon]) => (
                  <button key={mode} onClick={() => setViewMode(mode)} style={{ width: 32, height: 32, borderRadius: 7, background: viewMode === mode ? 'var(--bg2)' : 'transparent', display: 'grid', placeItems: 'center', border: viewMode === mode ? '1px solid var(--border2)' : 'none', color: viewMode === mode ? 'var(--text)' : 'var(--text3)' }}>
                    <Icon size={15} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text3)' }}>Loading marketplace...</div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--red)' }}>{error}</div>
          ) : ads.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, marginBottom: 8 }}>No results found</div>
              <div style={{ color: 'var(--text3)' }}>Try adjusting your search or category filter.</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(280px, 1fr))' : '1fr', gap: 20 }}>
              {ads.map(ad => (
                <AdCard key={ad.id} ad={ad} onClick={() => navigate(`/ads/${ad.id}`)} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {showPostAd && (
        <PostAdModal
          onClose={() => setShowPostAd(false)}
          categories={categories}
          onSubmit={handleCreateAd}
        />
      )}
    </div>
  );
}
