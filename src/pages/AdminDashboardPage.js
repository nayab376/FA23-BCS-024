import { useCallback, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { deleteAdminAd, fetchAdminOverview } from '../api';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboardPage() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [ads, setAds] = useState([]);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    const res = await fetchAdminOverview(token);
    setUsers(res.users);
    setAds(res.ads);
  }, [token]);

  useEffect(() => {
    load().catch((err) => setError(err.message));
  }, [load]);

  const onDeleteAd = async (adId) => {
    try {
      await deleteAdminAd(token, adId);
      await load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Navbar showSearch={false} />
      <div className="container" style={{ padding: '34px 24px 48px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', marginBottom: 8 }}>Admin Dashboard</h1>
        {error && <div style={{ color: 'var(--red)', marginBottom: 12 }}>{error}</div>}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 14, padding: 14 }}>
            <h3 style={{ marginBottom: 8 }}>Users ({users.length})</h3>
            {users.map((u) => (
              <div key={u.id} style={{ borderTop: '1px solid var(--border)', padding: '8px 0', color: 'var(--text2)' }}>
                {u.name} - {u.email} ({u.role})
              </div>
            ))}
          </div>
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 14, padding: 14 }}>
            <h3 style={{ marginBottom: 8 }}>Ads ({ads.length})</h3>
            {ads.map((ad) => (
              <div key={ad.id} style={{ borderTop: '1px solid var(--border)', padding: '8px 0', color: 'var(--text2)', display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <span>{ad.title}</span>
                <button onClick={() => onDeleteAd(ad.id)} style={{ height: 30, padding: '0 8px', borderRadius: 6, background: 'var(--red)', color: 'white' }}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
