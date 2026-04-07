export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', marginTop: 64, padding: '48px 0 32px', background: 'var(--bg2)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, marginBottom: 12 }}>
              Ad<span style={{ color: 'var(--accent)' }}>Market</span>
            </div>
            <p style={{ color: 'var(--text3)', fontSize: 14, lineHeight: 1.7 }}>
              Pakistan's most trusted classifieds platform. Buy and sell with confidence.
            </p>
          </div>
          {[
            { title: 'Categories', links: ['Electronics', 'Vehicles', 'Property', 'Fashion', 'Jobs'] },
            { title: 'Company', links: ['About Us', 'Careers', 'Press', 'Blog', 'Contact'] },
            { title: 'Support', links: ['Help Center', 'Safety Tips', 'Report Ad', 'Privacy Policy', 'Terms'] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14, color: 'var(--text)' }}>{col.title}</div>
              {col.links.map(link => (
                <div key={link} style={{ fontSize: 14, color: 'var(--text3)', marginBottom: 8, cursor: 'pointer', transition: 'var(--transition)' }}
                  onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text3)'}
                >{link}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ color: 'var(--text3)', fontSize: 13 }}>© 2026 AdMarket. Made with ❤️ for Pakistan.</div>
          <div style={{ color: 'var(--text3)', fontSize: 13 }}>🇵🇰 Serving 150+ cities across Pakistan</div>
        </div>
      </div>
    </footer>
  );
}
