import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { addFavorite, fetchAdById, removeFavorite, startChat } from '../api';
import { useAuth } from '../context/AuthContext';

export default function AdDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, token, user } = useAuth();
  const [ad, setAd] = useState(null);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAdById(id)
      .then((res) => setAd(res.ad))
      .catch((err) => setError(err.message));
  }, [id]);

  const handleFavorite = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      if (saved) {
        await removeFavorite(token, ad.id);
        setSaved(false);
      } else {
        await addFavorite(token, ad.id);
        setSaved(true);
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleStartChat = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try {
      const res = await startChat(token, ad.id);
      navigate(`/chats/${res.chat.id}`);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div>
      <Navbar showSearch={false} />
      {error ? (
        <div className="container" style={{ padding: '50px 24px', color: 'var(--red)' }}>{error}</div>
      ) : !ad ? (
        <div className="container" style={{ padding: '50px 24px', color: 'var(--text3)' }}>Loading ad details...</div>
      ) : (
        <div className="container" style={{ padding: '36px 24px 48px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
            <img src={ad.image} alt={ad.title} style={{ width: '100%', height: '100%', minHeight: 360, objectFit: 'cover' }} />
            <div style={{ padding: 24 }}>
              <h1 style={{ fontFamily: 'var(--font-display)', marginBottom: 12 }}>{ad.title}</h1>
              <div style={{ color: 'var(--accent)', fontSize: 32, fontWeight: 800, marginBottom: 12 }}>Rs. {ad.price.toLocaleString()}</div>
              <p style={{ color: 'var(--text2)', marginBottom: 10 }}>{ad.description}</p>
              <div style={{ color: 'var(--text3)', marginBottom: 4 }}>Location: {ad.location}</div>
              <div style={{ color: 'var(--text3)', marginBottom: 16 }}>Seller: {ad.seller.name}</div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={handleFavorite} style={{ height: 42, padding: '0 16px', borderRadius: 10, background: saved ? 'var(--bg3)' : 'var(--accent)', border: '1px solid var(--border2)', color: 'white', fontWeight: 700 }}>
                  {saved ? 'Remove Favorite' : 'Save Favorite'}
                </button>
                {user?.id !== ad.sellerId && (
                  <button onClick={handleStartChat} style={{ height: 42, padding: '0 16px', borderRadius: 10, background: 'var(--bg3)', border: '1px solid var(--border2)', color: 'var(--text)', fontWeight: 700 }}>
                    Chat with Seller
                  </button>
                )}
              </div>
              {message && <div style={{ marginTop: 12, color: 'var(--text3)', fontSize: 13 }}>{message}</div>}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
