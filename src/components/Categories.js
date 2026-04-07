import { categories } from '../data/ads';

export default function Categories({ activeCategory, setActiveCategory }) {
  return (
    <section style={{ padding: '32px 0', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
          <button
            onClick={() => setActiveCategory('all')}
            style={{
              flexShrink: 0, padding: '8px 18px', borderRadius: 999, fontSize: 14, fontWeight: 600,
              background: activeCategory === 'all' ? 'var(--accent)' : 'var(--bg3)',
              color: activeCategory === 'all' ? 'white' : 'var(--text2)',
              border: `1px solid ${activeCategory === 'all' ? 'transparent' : 'var(--border)'}`,
              transition: 'var(--transition)',
            }}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                flexShrink: 0, display: 'flex', alignItems: 'center', gap: 7,
                padding: '8px 18px', borderRadius: 999, fontSize: 14, fontWeight: 500,
                background: activeCategory === cat.id ? 'var(--accent-glow)' : 'var(--bg3)',
                color: activeCategory === cat.id ? 'var(--accent)' : 'var(--text2)',
                border: `1px solid ${activeCategory === cat.id ? 'var(--accent)' : 'var(--border)'}`,
                transition: 'var(--transition)',
              }}
            >
              <span>{cat.icon}</span>
              {cat.label}
              <span style={{
                fontSize: 11, padding: '1px 7px', borderRadius: 999,
                background: 'var(--bg)', color: 'var(--text3)',
              }}>{cat.count.toLocaleString()}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
