import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { fetchChats, fetchFavorites } from '../api';
import AdCard from '../components/AdCard';

export default function BuyerDashboardPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [favoriteAds, setFavoriteAds] = useState([]);
  const [chats, setChats] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([fetchFavorites(token), fetchChats(token)])
      .then(([favRes, chatRes]) => {
        setFavoriteAds(favRes.ads);
        setChats(chatRes.chats);
      })
      .catch((err) => setError(err.message));
  }, [token]);

  return (
    <div>
      <Navbar showSearch={false} />
      <div className="container" style={{ padding: '48px 24px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', marginBottom: 6 }}>Buyer Dashboard</h1>
        <p style={{ color: 'var(--text3)', marginBottom: 24 }}>Welcome {user.name}. Browsing aur deals yahan se manage karein.</p>
        {error && <div style={{ color: 'var(--red)', marginBottom: 12 }}>{error}</div>}
        <div style={{ marginBottom: 18 }}>
          <h3 style={{ marginBottom: 10 }}>My Chats ({chats.length})</h3>
          <div style={{ display: 'grid', gap: 8 }}>
            {chats.map((chat) => (
              <button key={chat.id} onClick={() => navigate(`/chats/${chat.id}`)} style={{ textAlign: 'left', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: 12, color: 'var(--text)' }}>
                {chat.ad_title} - Seller: {chat.seller_name}
              </button>
            ))}
            {!chats.length && <div style={{ color: 'var(--text3)' }}>No chats started yet.</div>}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
          {favoriteAds.map((ad) => (
            <AdCard key={ad.id} ad={ad} onClick={() => navigate(`/ads/${ad.id}`)} />
          ))}
          {!favoriteAds.length && (
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 14, padding: 18 }}>
              <h3 style={{ marginBottom: 8 }}>Saved Ads</h3>
              <p style={{ color: 'var(--text3)' }}>Favorite ads abhi empty hain.</p>
            </div>
          )}
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 14, padding: 18 }}>
            <h3 style={{ marginBottom: 8 }}>Explore Marketplace</h3>
            <button onClick={() => navigate('/')} style={{ marginTop: 8, height: 38, borderRadius: 8, padding: '0 14px', background: 'var(--accent)', color: 'white', fontWeight: 700 }}>
              Browse Ads
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
