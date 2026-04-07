import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdCard from '../components/AdCard';
import { createSellerAd, fetchSellerAds } from '../api';
import { useAuth } from '../context/AuthContext';

export default function SellerDashboardPage() {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [myAds, setMyAds] = useState([]);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    category: 'electronics',
    price: '',
    location: '',
    description: '',
    condition: 'New',
    phone: '',
    image: '',
  });

  const loadMyAds = useCallback(async () => {
    const res = await fetchSellerAds(token);
    setMyAds(res.ads);
  }, [token]);

  useEffect(() => {
    loadMyAds().catch((err) => setError(err.message));
  }, [loadMyAds]);

  const postAd = async (e) => {
    e.preventDefault();
    try {
      await createSellerAd(token, {
        ...form,
        sellerName: user.name,
        sellerId: user.id,
      });
      setForm({ ...form, title: '', price: '', location: '', description: '', phone: '', image: '' });
      await loadMyAds();
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Navbar showSearch={false} />
      <div className="container" style={{ padding: '40px 24px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', marginBottom: 6 }}>Seller Dashboard</h1>
        <p style={{ color: 'var(--text3)', marginBottom: 24 }}>Welcome {user.name}. Yahan se ads manage karein.</p>

        <form onSubmit={postAd} style={{ display: 'grid', gap: 10, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 14, padding: 16, marginBottom: 28 }}>
          <h3 style={{ marginBottom: 8 }}>Post New Ad</h3>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" style={{ height: 42, padding: '0 12px', borderRadius: 8, border: '1px solid var(--border2)', background: 'var(--bg3)', color: 'var(--text)' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Price" style={{ height: 42, padding: '0 12px', borderRadius: 8, border: '1px solid var(--border2)', background: 'var(--bg3)', color: 'var(--text)' }} />
            <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Location" style={{ height: 42, padding: '0 12px', borderRadius: 8, border: '1px solid var(--border2)', background: 'var(--bg3)', color: 'var(--text)' }} />
          </div>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" style={{ minHeight: 96, padding: 12, borderRadius: 8, border: '1px solid var(--border2)', background: 'var(--bg3)', color: 'var(--text)' }} />
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" style={{ height: 42, padding: '0 12px', borderRadius: 8, border: '1px solid var(--border2)', background: 'var(--bg3)', color: 'var(--text)' }} />
          <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="Image URL optional" style={{ height: 42, padding: '0 12px', borderRadius: 8, border: '1px solid var(--border2)', background: 'var(--bg3)', color: 'var(--text)' }} />
          {error && <div style={{ color: 'var(--red)', fontSize: 13 }}>{error}</div>}
          <button type="submit" style={{ height: 42, borderRadius: 8, background: 'var(--accent)', color: 'white', fontWeight: 700 }}>Publish Ad</button>
        </form>

        <h3 style={{ marginBottom: 12 }}>My Ads ({myAds.length})</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18 }}>
          {myAds.map((ad) => (
            <AdCard key={ad.id} ad={ad} onClick={() => navigate(`/ads/${ad.id}`)} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
