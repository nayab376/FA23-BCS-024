import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export default function SignupPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'buyer' });
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await register(form);
      navigate(user.role === 'seller' ? '/seller/dashboard' : '/buyer/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Navbar showSearch={false} />
      <div className="container" style={{ maxWidth: 520, padding: '48px 24px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', marginBottom: 8 }}>Create Account</h1>
        <p style={{ color: 'var(--text3)', marginBottom: 24 }}>Buyer ya seller as signup karein.</p>
        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
          <input placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={{ height: 44, padding: '0 12px', borderRadius: 10, border: '1px solid var(--border2)', background: 'var(--bg3)', color: 'var(--text)' }} />
          <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ height: 44, padding: '0 12px', borderRadius: 10, border: '1px solid var(--border2)', background: 'var(--bg3)', color: 'var(--text)' }} />
          <input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} style={{ height: 44, padding: '0 12px', borderRadius: 10, border: '1px solid var(--border2)', background: 'var(--bg3)', color: 'var(--text)' }} />
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} style={{ height: 44, padding: '0 12px', borderRadius: 10, border: '1px solid var(--border2)', background: 'var(--bg3)', color: 'var(--text)' }}>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
          {error && <div style={{ color: 'var(--red)', fontSize: 13 }}>{error}</div>}
          <button type="submit" style={{ height: 44, borderRadius: 10, background: 'var(--accent)', color: 'white', fontWeight: 700 }}>Signup</button>
        </form>
        <p style={{ marginTop: 14, color: 'var(--text2)' }}>Already account hai? <Link to="/login" style={{ color: 'var(--accent)' }}>Login</Link></p>
      </div>
    </div>
  );
}
