import { useState } from 'react';
import { Search, Bell, MessageSquare, Plus, Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar({ searchQuery, setSearchQuery, onPostAd }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(8,9,10,0.85)', backdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 16, height: 64 }}>
        {/* Logo */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, var(--accent), #c2410c)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, fontWeight: 800, fontFamily: 'var(--font-display)',
            boxShadow: '0 0 20px rgba(249,115,22,0.4)',
          }}>A</div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, letterSpacing: '-0.5px' }}>
            Ad<span style={{ color: 'var(--accent)' }}>Market</span>
          </span>
        </a>

        {/* Search */}
        <div style={{ flex: 1, maxWidth: 520, position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={16} style={{ position: 'absolute', left: 14, color: 'var(--text3)', pointerEvents: 'none' }} />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search ads, products, locations..."
            style={{
              width: '100%', height: 40, paddingLeft: 40, paddingRight: 16,
              background: 'var(--bg3)', border: '1px solid var(--border)',
              borderRadius: 999, color: 'var(--text)', fontSize: 14,
              transition: 'var(--transition)',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
        </div>

        {/* Nav Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
          <button style={{ width: 36, height: 36, borderRadius: 999, background: 'var(--bg3)', display: 'grid', placeItems: 'center', border: '1px solid var(--border)', color: 'var(--text2)' }}>
            <Bell size={16} />
          </button>
          <button style={{ width: 36, height: 36, borderRadius: 999, background: 'var(--bg3)', display: 'grid', placeItems: 'center', border: '1px solid var(--border)', color: 'var(--text2)' }}>
            <MessageSquare size={16} />
          </button>
          <button
            onClick={onPostAd}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '0 16px', height: 36, borderRadius: 999,
              background: 'var(--accent)', color: 'white',
              fontWeight: 600, fontSize: 14,
              boxShadow: '0 0 20px rgba(249,115,22,0.3)',
              transition: 'var(--transition)',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--accent2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--accent)'}
          >
            <Plus size={15} /> Post Ad
          </button>
        </div>
      </div>
    </nav>
  );
}
