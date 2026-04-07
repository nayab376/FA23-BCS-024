import { useState, useMemo, useRef } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import AdCard from './components/AdCard';
import AdModal from './components/AdModal';
import PostAdModal from './components/PostAdModal';
import Footer from './components/Footer';
import { ads } from './data/ads';
import { SlidersHorizontal, Grid3X3, List, ChevronDown } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedAd, setSelectedAd] = useState(null);
  const [showPostAd, setShowPostAd] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const listingsRef = useRef(null);

  const filtered = useMemo(() => {
    let list = [...ads];
    if (activeCategory !== 'all') list = list.filter(a => a.category === activeCategory);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(a => a.title.toLowerCase().includes(q) || a.location.toLowerCase().includes(q) || a.category.includes(q));
    }
    if (sortBy === 'featured') list.sort((a, b) => b.featured - a.featured);
    else if (sortBy === 'price-low') list.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') list.sort((a, b) => b.price - a.price);
    else if (sortBy === 'newest') list.sort((a, b) => a.id - b.id);
    else if (sortBy === 'views') list.sort((a, b) => b.views - a.views);
    return list;
  }, [searchQuery, activeCategory, sortBy]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onPostAd={() => setShowPostAd(true)} />
      <Hero onExplore={() => listingsRef.current?.scrollIntoView({ behavior: 'smooth' })} />
      <Categories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

      {/* Listings Section */}
      <main ref={listingsRef} style={{ flex: 1, padding: '40px 0' }}>
        <div className="container">
          {/* Toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22 }}>
                {filtered.length} <span style={{ color: 'var(--text3)', fontWeight: 500 }}>listings found</span>
              </h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {/* Sort */}
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
              {/* View toggle */}
              <div style={{ display: 'flex', gap: 4, background: 'var(--bg3)', borderRadius: 10, padding: 4, border: '1px solid var(--border)' }}>
                {[['grid', Grid3X3], ['list', List]].map(([mode, Icon]) => (
                  <button key={mode} onClick={() => setViewMode(mode)} style={{ width: 32, height: 32, borderRadius: 7, background: viewMode === mode ? 'var(--bg2)' : 'transparent', display: 'grid', placeItems: 'center', border: viewMode === mode ? '1px solid var(--border2)' : 'none', color: viewMode === mode ? 'var(--text)' : 'var(--text3)', transition: 'var(--transition)' }}>
                    <Icon size={15} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, marginBottom: 8 }}>No results found</div>
              <div style={{ color: 'var(--text3)' }}>Try adjusting your search or category filter.</div>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(280px, 1fr))' : '1fr',
              gap: 20,
            }}>
              {filtered.map(ad => (
                <AdCard key={ad.id} ad={ad} onClick={setSelectedAd} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* CTA Banner */}
      <section style={{ margin: '0 0 0', padding: '64px 0', background: 'linear-gradient(135deg, rgba(249,115,22,0.12) 0%, rgba(194,65,12,0.06) 100%)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px,5vw,48px)', marginBottom: 14, letterSpacing: '-1px' }}>
            Ready to Sell Something?
          </h2>
          <p style={{ color: 'var(--text2)', fontSize: 17, marginBottom: 32 }}>Post your ad in 2 minutes — it's completely free.</p>
          <button onClick={() => setShowPostAd(true)} style={{ padding: '16px 40px', borderRadius: 999, background: 'var(--accent)', color: 'white', fontWeight: 700, fontSize: 17, boxShadow: '0 0 40px rgba(249,115,22,0.4)', transition: 'var(--transition)' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            🚀 Post Free Ad Now
          </button>
        </div>
      </section>

      <Footer />

      {/* Modals */}
      {selectedAd && <AdModal ad={selectedAd} onClose={() => setSelectedAd(null)} />}
      {showPostAd && <PostAdModal onClose={() => setShowPostAd(false)} />}
    </div>
  );
}
