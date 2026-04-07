import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import AdCard from './components/AdCard';
import AdModal from './components/AdModal';
import PostAdModal from './components/PostAdModal';
import Footer from './components/Footer';
import { ArrowDownAZ, ArrowUpAZ, Clock, Star } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface Ad {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  image_url: string | null;
  contact: string | null;
  created_at: string;
  featured: boolean;
}

interface Category {
  name: string;
  count: number;
}

interface Stats {
  total_ads: number;
  total_categories: number;
  total_locations: number;
  featured_ads: number;
}

function App() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
  const [showPostAd, setShowPostAd] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchAds = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedCategory !== 'All') params.set('category', selectedCategory);
    params.set('sort', sortBy);

    try {
      const res = await fetch(`${API_URL}/api/ads?${params}`);
      const data = await res.json();
      setAds(data);
    } catch (err) {
      console.error('Failed to fetch ads:', err);
    }
    setLoading(false);
  }, [searchQuery, selectedCategory, sortBy]);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/api/categories`);
      setCategories(await res.json());
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_URL}/api/stats`);
      setStats(await res.json());
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchStats();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => fetchAds(), 300);
    return () => clearTimeout(timer);
  }, [fetchAds]);

  const handlePostAd = async (ad: {
    title: string;
    description: string;
    price: number;
    category: string;
    location: string;
    image_url: string;
    contact: string;
  }) => {
    try {
      await fetch(`${API_URL}/api/ads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ad),
      });
      setShowPostAd(false);
      fetchAds();
      fetchCategories();
      fetchStats();
    } catch (err) {
      console.error('Failed to post ad:', err);
    }
  };

  const sortOptions = [
    { value: 'newest', label: 'Newest', icon: Clock },
    { value: 'price_low', label: 'Price Low', icon: ArrowDownAZ },
    { value: 'price_high', label: 'Price High', icon: ArrowUpAZ },
    { value: 'featured', label: 'Featured', icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onPostAdClick={() => setShowPostAd(true)}
      />

      <Hero stats={stats} />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-6 w-full">
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

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : ads.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No ads found.</p>
            <p className="text-gray-600 text-sm mt-1">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {ads.map((ad) => (
              <AdCard key={ad.id} ad={ad} onClick={setSelectedAd} />
            ))}
          </div>
        )}
      </main>

      <Footer />

      {selectedAd && <AdModal ad={selectedAd} onClose={() => setSelectedAd(null)} />}
      {showPostAd && <PostAdModal onClose={() => setShowPostAd(false)} onSubmit={handlePostAd} />}
    </div>
  );
}

export default App;
