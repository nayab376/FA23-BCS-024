import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(form);
      navigate(user.role === 'seller' ? '/seller/dashboard' : '/buyer/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Navbar showSearch={false} />
      <div className="container" style={{ maxWidth: 480, padding: '48px 24px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', marginBottom: 8 }}>Login</h1>
        <p style={{ color: 'var(--text3)', marginBottom: 24 }}>Buyer ya seller account mein login karein.</p>
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
          <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ height: 44, padding: '0 12px', borderRadius: 10, border: '1px solid var(--border2)', background: 'var(--bg3)', color: 'var(--text)' }} />
          <input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} style={{ height: 44, padding: '0 12px', borderRadius: 10, border: '1px solid var(--border2)', background: 'var(--bg3)', color: 'var(--text)' }} />
          {error && <div style={{ color: 'var(--red)', fontSize: 13 }}>{error}</div>}
          <button type="submit" style={{ height: 44, borderRadius: 10, background: 'var(--accent)', color: 'white', fontWeight: 700 }}>Login</button>
        </form>
        <p style={{ marginTop: 14, color: 'var(--text2)' }}>Account nahi hai? <Link to="/signup" style={{ color: 'var(--accent)' }}>Signup</Link></p>
      </div>
    </div>
  );
}
